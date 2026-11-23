// The portrait as a WebGL plane: full-colour photo with a slice-in reveal and a
// liquid ripple that follows the pointer. The <img> underneath stays as fallback.
import { WebGLRenderer, Scene, OrthographicCamera, PlaneGeometry, ShaderMaterial, Mesh, TextureLoader, LinearFilter } from 'three'

const VERT = /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`
const FRAG = /* glsl */ `
precision mediump float;
uniform sampler2D uTex;
uniform float uTime, uHover, uReveal;
uniform vec2 uMouse;
varying vec2 vUv;
float hash(float n){ return fract(sin(n * 91.345) * 47453.5453); }
void main(){
  vec2 uv = vUv;
  vec2 d = uv - uMouse;
  float r = length(d);
  float ripple = sin(r * 26.0 - uTime * 5.0) * exp(-r * 5.0) * uHover;
  uv += normalize(d + 1e-5) * ripple * 0.012;
  uv.x += sin(uv.y * 9.0 + uTime * 0.9) * 0.0014;
  float n = hash(floor(vUv.y * 36.0));
  float rv = smoothstep(0.0, 1.0, uReveal * 1.7 - n * 0.7);
  uv.x += (1.0 - rv) * (n - 0.5) * 0.6;
  float ca = ripple * 0.006 + (1.0 - rv) * 0.03;
  vec3 col = vec3(texture2D(uTex, uv + vec2(ca, 0.0)).r, texture2D(uTex, uv).g, texture2D(uTex, uv - vec2(ca, 0.0)).b);
  col += vec3(1.0, 0.75, 0.5) * 0.07 * exp(-r * r * 14.0) * uHover;
  gl_FragColor = vec4(col, rv);
}`

/** @returns {(() => void) | null} dispose function, or null when WebGL is unavailable */
export function createPortrait(canvas, src, onReady) {
  let renderer
  try { renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, premultipliedAlpha: false }) } catch (e) { return null }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  const scene = new Scene(), camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const u = { uTex: { value: null }, uTime: { value: 0 }, uHover: { value: 0 }, uReveal: { value: 0 }, uMouse: { value: { x: 0.5, y: 0.5 } } }
  const mat = new ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: u, transparent: true })
  scene.add(new Mesh(new PlaneGeometry(2, 2), mat))

  let visible = true, hover = 0, raf = 0, last = 0, ready = false, disposed = false
  const size = () => { const r = canvas.getBoundingClientRect(); if (r.width) renderer.setSize(r.width, r.height, false) }
  const ro = new ResizeObserver(size); ro.observe(canvas)
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick() }); io.observe(canvas)

  function frame(now) {
    raf = 0
    const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000 || 0.016)); last = now
    u.uTime.value += dt
    u.uReveal.value = Math.min(1, u.uReveal.value + dt / 1.5)
    u.uHover.value += (hover - u.uHover.value) * Math.min(1, dt * 4)
    renderer.render(scene, camera)
    kick()
  }
  function kick() { if (!raf && ready && visible && !document.hidden && !disposed) { last = performance.now(); raf = requestAnimationFrame(frame) } }
  const parent = canvas.parentElement
  const move = (e) => { const r = canvas.getBoundingClientRect(); u.uMouse.value.x = (e.clientX - r.left) / r.width; u.uMouse.value.y = 1 - (e.clientY - r.top) / r.height; hover = 1 }
  const leave = () => { hover = 0 }
  parent.addEventListener('pointermove', move); parent.addEventListener('pointerleave', leave)
  document.addEventListener('visibilitychange', kick)

  new TextureLoader().load(src, (tex) => {
    if (disposed) return
    tex.minFilter = LinearFilter; tex.generateMipmaps = false
    u.uTex.value = tex; ready = true; size(); onReady && onReady(); kick()
  })

  return () => {
    disposed = true; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect()
    parent.removeEventListener('pointermove', move); parent.removeEventListener('pointerleave', leave)
    document.removeEventListener('visibilitychange', kick)
    u.uTex.value && u.uTex.value.dispose(); mat.dispose(); renderer.dispose()
  }
}
