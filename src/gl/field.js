// The site's single WebGL scene: one particle field that re-forms into a
// different structure for every section, driven by scroll position.
import {
  WebGLRenderer, Scene, PerspectiveCamera, BufferGeometry, BufferAttribute,
  ShaderMaterial, Points, AdditiveBlending, Vector3,
} from 'three'
import { STAGES } from './shapes'

const VERT = /* glsl */ `
attribute vec4 aFrom;
attribute vec4 aTo;
attribute vec4 aRand;
uniform float uMix, uTime, uSize, uAlpha;
uniform vec2 uMouse;
varying float vGlow;
varying vec3 vCol;
void main() {
  float m = uMix;
  vec3 p = mix(aFrom.xyz, aTo.xyz, m);
  // scatter while travelling between shapes
  float mid = sin(3.14159 * m);
  p += (aRand.xyz - 0.5) * mid * 1.6;
  p += 0.035 * vec3(sin(uTime * 0.7 + aRand.x * 40.0), cos(uTime * 0.6 + aRand.y * 40.0), sin(uTime * 0.5 + aRand.z * 40.0));
  float flow = mix(aFrom.w, aTo.w, m);
  float pulse = pow(0.5 + 0.5 * sin(6.28318 * (flow * 3.0 - uTime * 0.22)), 18.0);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  // pointer pushes particles aside
  vec2 ndc = gl_Position.xy / gl_Position.w;
  vec2 d = ndc - uMouse;
  float f = exp(-dot(d, d) * 14.0);
  gl_Position.xy += normalize(d + 1e-5) * f * 0.09 * gl_Position.w;

  float c = fract(aRand.w * 0.45 + flow * 0.55 + uTime * 0.015);
  vec3 c1 = vec3(0.34, 0.36, 1.0), c2 = vec3(1.0, 0.30, 0.62), c3 = vec3(1.0, 0.72, 0.30);
  vCol = c < 0.5 ? mix(c1, c2, c * 2.0) : mix(c2, c3, (c - 0.5) * 2.0);
  vCol = mix(vCol, vec3(1.0, 0.9, 0.75), pulse * 0.45);
  vGlow = (0.42 + 0.5 * aRand.w + pulse * 0.55) * uAlpha;
  gl_PointSize = uSize * (0.5 + aRand.w * 0.9 + pulse * 0.8 + f * 1.2) / -mv.z;
}`

const FRAG = /* glsl */ `
precision mediump float;
varying float vGlow;
varying vec3 vCol;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.05, d);
  gl_FragColor = vec4(vCol, a * a * vGlow * 0.72);
}`

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{ reduced: boolean, labelLayer: HTMLElement, labels: Record<number, {pos:number[], html:string}[]> }} opts
 * @returns {{ dispose(): void, stats(): object } | null} null when WebGL is unavailable
 */
export function createField(canvas, opts) {
  let renderer
  try {
    renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' })
  } catch (e) {
    return null
  }
  const mobile = Math.min(window.innerWidth, window.innerHeight) < 720
  const COUNT = mobile ? 7000 : 18000
  let pr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2)
  renderer.setPixelRatio(pr)
  renderer.setClearColor(0x000000, 0)

  const scene = new Scene()
  const camera = new PerspectiveCamera(45, 1, 0.1, 50)
  camera.position.z = 7

  const shapes = STAGES.map((s) => s.make(COUNT))
  const geo = new BufferGeometry()
  const from = new BufferAttribute(new Float32Array(COUNT * 4), 4)
  const to = new BufferAttribute(new Float32Array(COUNT * 4), 4)
  const rand = new Float32Array(COUNT * 4)
  for (let i = 0; i < rand.length; i++) rand[i] = Math.random()
  geo.setAttribute('position', new BufferAttribute(new Float32Array(COUNT * 3), 3))
  geo.setAttribute('aFrom', from)
  geo.setAttribute('aTo', to)
  geo.setAttribute('aRand', new BufferAttribute(rand, 4))
  const mat = new ShaderMaterial({
    vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthTest: false, depthWrite: false,
    blending: AdditiveBlending,
    uniforms: { uMix: { value: 0 }, uTime: { value: 0 }, uSize: { value: 1 }, uAlpha: { value: 1 }, uMouse: { value: { x: 9, y: 9 } } },
  })
  const points = new Points(geo, mat)
  points.frustumCulled = false
  scene.add(points)

  // projected DOM labels for the nodes of some shapes
  const labels = []
  for (const [idx, list] of Object.entries(opts.labels || {})) {
    for (const l of list) {
      const el = document.createElement('div')
      el.className = 'gl-label'
      el.innerHTML = l.html
      opts.labelLayer.appendChild(el)
      labels.push({ el, idx: +idx, pos: new Vector3(...l.pos), shown: false })
    }
  }

  let W = 0, H = 0, aspect = 1, wide = true
  function resize() {
    W = window.innerWidth; H = window.innerHeight
    aspect = W / H; wide = W >= 960
    renderer.setPixelRatio(pr)
    renderer.setSize(W, H, false)
    camera.aspect = aspect
    camera.updateProjectionMatrix()
    mat.uniforms.uSize.value = H * pr * 0.021
    measure()
  }

  // scroll → stage index. Each [data-scene] element owns one shape.
  let anchors = []
  function measure() {
    anchors = [...document.querySelectorAll('[data-scene]')].map((el) => {
      const r = el.getBoundingClientRect()
      return { i: +el.dataset.scene, top: r.top + window.scrollY }
    }).sort((a, b) => a.i - b.i)
  }
  function targetT() {
    if (!anchors.length) return 0
    const y = window.scrollY + H * 0.5
    for (let k = 0; k < anchors.length - 1; k++) {
      const a = anchors[k], b = anchors[k + 1]
      if (y < b.top + H * 0.15) {
        // hold shape a while inside its section, morph across the boundary
        return a.i + smooth(b.top - H * 0.55, b.top + H * 0.15, y) * (b.i - a.i)
      }
    }
    return anchors[anchors.length - 1].i
  }

  let loaded = -1
  function load(i) {
    if (i === loaded) return
    from.array.set(shapes[i]); to.array.set(shapes[Math.min(i + 1, shapes.length - 1)])
    from.needsUpdate = true; to.needsUpdate = true
    loaded = i
  }

  const mouse = { x: 9, y: 9, sx: 0, sy: 0 }
  function onMove(e) {
    mouse.x = (e.clientX / W) * 2 - 1; mouse.y = -(e.clientY / H) * 2 + 1
  }
  function onLeave() { mouse.x = 9; mouse.y = 9 }

  let t = 0, time = 0, last = 0, raf = 0, running = false
  let acc = 0, frames = 0, fps = 60
  const v = new Vector3()

  function frame(now) {
    const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000 || 0.016)) // rAF time can precede performance.now()
    last = now
    const tt = targetT()
    if (opts.reduced) { t = Math.round(tt) } else { t += (tt - t) * Math.min(1, dt * 5); time += dt }
    t = Math.min(shapes.length - 1, Math.max(0, t))
    const i = Math.min(Math.floor(t), shapes.length - 1)
    load(i)
    const m = t - i
    const A = STAGES[i], B = STAGES[Math.min(i + 1, STAGES.length - 1)]
    const mix = (k) => A[k] + (B[k] - A[k]) * m
    const narrow = wide ? 1 : Math.max(0.5, aspect * 0.95)
    const halfW = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z * aspect

    mat.uniforms.uMix.value = m
    mat.uniforms.uTime.value = time
    mat.uniforms.uAlpha.value = mix('a') * (wide ? 1 : 0.42)
    const mx = mouse.x > 2 ? 0 : mouse.x, my = mouse.y > 2 ? 0 : mouse.y
    mouse.sx += (mx - mouse.sx) * 0.05; mouse.sy += (my - mouse.sy) * 0.05
    mat.uniforms.uMouse.value.x = mouse.x; mat.uniforms.uMouse.value.y = mouse.y

    const spin = mix('spin')
    points.position.x = wide ? mix('x') * halfW : 0
    points.scale.setScalar(mix('s') * narrow)
    points.rotation.y = Math.sin(time * 0.16) * 0.22 * Math.min(spin, 1) + time * 0.06 * Math.max(0, spin - 1) + mouse.sx * 0.25
    points.rotation.x = -mouse.sy * 0.12
    points.updateMatrixWorld()
    renderer.render(scene, camera)

    for (const l of labels) {
      const w = wide ? Math.max(0, 1 - Math.abs(t - l.idx) * 3) : 0
      if (w <= 0.01) { if (l.shown) { l.el.style.opacity = 0; l.shown = false } continue }
      v.copy(l.pos).applyMatrix4(points.matrixWorld).project(camera)
      l.el.style.opacity = w
      l.el.style.transform = `translate3d(${((v.x + 1) / 2) * W}px, ${((1 - v.y) / 2) * H}px, 0)`
      l.shown = true
    }

    // adaptive quality: drop pixel ratio if the device can't keep up
    acc += dt; frames++
    if (frames >= 90) {
      fps = frames / acc; acc = 0; frames = 0
      if (fps < 42 && pr > 1) { pr = Math.max(1, pr - 0.5); resize() }
    }
    if (running) raf = requestAnimationFrame(frame)
  }

  function start() {
    if (running || opts.reduced || document.hidden) return
    running = true; last = performance.now(); raf = requestAnimationFrame(frame)
  }
  function stop() { running = false; cancelAnimationFrame(raf) }
  function onVis() { document.hidden ? stop() : start() }
  let still = 0
  function renderStill() { cancelAnimationFrame(still); still = requestAnimationFrame(frame) }

  const ro = new ResizeObserver(() => { measure(); if (opts.reduced) renderStill() })
  ro.observe(document.body)
  window.addEventListener('resize', resize)
  document.addEventListener('visibilitychange', onVis)
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); stop() })
  canvas.addEventListener('webglcontextrestored', () => { loaded = -1; start() })
  if (opts.reduced) {
    window.addEventListener('scroll', renderStill, { passive: true })
  } else {
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
  }
  resize()
  if (opts.reduced) renderStill(); else start()

  return {
    stats: () => ({ fps: Math.round(fps), pixelRatio: pr, particles: COUNT, t }),
    dispose() {
      stop(); cancelAnimationFrame(still); ro.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', renderStill)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
      labels.forEach((l) => l.el.remove())
      geo.dispose(); mat.dispose(); renderer.dispose()
    },
  }
}
