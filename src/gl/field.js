// The site's WebGL stage. One particle field draws the diagram of the active story
// scene (node outlines + edges), re-forming whenever the reader reaches a new step;
// a second point cloud carries the packets that the scene script moves around.
// Node labels and the caption are real DOM text projected onto the scene.
import {
  WebGLRenderer, Scene, PerspectiveCamera, BufferGeometry, BufferAttribute,
  ShaderMaterial, Points, AdditiveBlending, Vector3, Vector4, Group, DynamicDrawUsage,
} from 'three'
import { SCENES } from './scenes'

const MAXG = 32, AMBIENT = 31, MAXP = 96
const TONES = { ok: 1, bad: 2, hot: 3 }
const TONE_RGB = [[1, 0.86, 0.9], [0.45, 1, 0.72], [1, 0.32, 0.4], [1, 0.78, 0.36]]
// design box every scene fits in (scene units); the caption sits at y = -2.3
const BOX = { w: 5.7, h: 5.0, cy: -0.3 }

const TONE_GLSL = /* glsl */ `
vec3 toneColor(float tone, vec3 base) {
  if (tone < 0.5) return base;
  if (tone < 1.5) return vec3(0.45, 1.0, 0.72);
  if (tone < 2.5) return vec3(1.0, 0.32, 0.40);
  return vec3(1.0, 0.78, 0.36);
}`

const VERT = /* glsl */ `
attribute vec4 aFrom;
attribute vec4 aTo;
attribute vec2 aGrp;
attribute vec4 aRand;
uniform float uMix, uTime, uSize, uAlpha;
uniform vec2 uMouse;
uniform vec4 uSA[${MAXG}];
uniform vec4 uSB[${MAXG}];
varying float vGlow;
varying vec3 vCol;
${TONE_GLSL}
void main() {
  float m = uMix;
  vec3 p = mix(aFrom.xyz, aTo.xyz, m);
  float mid = sin(3.14159 * m);
  p += (aRand.xyz - 0.5) * mid * 1.3;                       // scatter while re-forming
  p += 0.014 * vec3(sin(uTime * 0.7 + aRand.x * 40.0), cos(uTime * 0.6 + aRand.y * 40.0), 0.0);
  float flow = mix(aFrom.w, aTo.w, m);
  float pulse = pow(0.5 + 0.5 * sin(6.28318 * (flow * 2.0 - uTime * 0.3)), 18.0);

  vec4 sa = uSA[int(aGrp.x + 0.5)];
  vec4 sb = uSB[int(aGrp.y + 0.5)];
  float alpha = mix(sa.y, sb.y, m);
  float tone = m < 0.5 ? sa.x : sb.x;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  vec2 ndc = gl_Position.xy / gl_Position.w;
  vec2 d = ndc - uMouse;
  float f = exp(-dot(d, d) * 30.0);
  gl_Position.xy += normalize(d + 1e-5) * f * 0.03 * gl_Position.w;  // pointer nudges particles

  float c = fract(aRand.w * 0.45 + flow * 0.55 + uTime * 0.015);
  vec3 c1 = vec3(0.40, 0.42, 1.0), c2 = vec3(1.0, 0.30, 0.62), c3 = vec3(1.0, 0.72, 0.30);
  vec3 base = c < 0.5 ? mix(c1, c2, c * 2.0) : mix(c2, c3, (c - 0.5) * 2.0);
  vCol = mix(toneColor(tone, base), vec3(1.0, 0.92, 0.8), pulse * 0.35);
  vGlow = (0.45 + 0.5 * aRand.w + pulse * 0.5) * uAlpha * alpha;
  gl_PointSize = uSize * (0.5 + aRand.w * 0.8 + pulse * 0.6 + f * 0.8) / -mv.z;
}`

const FRAG = /* glsl */ `
precision mediump float;
varying float vGlow;
varying vec3 vCol;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.05, d);
  gl_FragColor = vec4(vCol, a * a * vGlow * 0.75);
}`

const PVERT = /* glsl */ `
attribute vec3 aCol;
attribute float aSize;
uniform float uSize;
varying vec3 vCol;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  vCol = aCol;
  gl_PointSize = uSize * aSize / -mv.z;
}`
const PFRAG = /* glsl */ `
precision mediump float;
varying vec3 vCol;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float core = smoothstep(0.22, 0.05, d), halo = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vCol * (0.55 * halo * halo + core), halo);
}`

const smooth = (x) => { const t = Math.min(1, Math.max(0, x)); return t * t * (3 - 2 * t) }

function rng(seed) {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ── geometry of a scene ────────────────────────────────────────────────
function clip(n, tx, ty) { // point on node n's outline towards (tx, ty)
  const dx = tx - n.x, dy = ty - n.y, len = Math.hypot(dx, dy) || 1
  if (n.kind === 'note') return [n.x, n.y]
  if (n.kind === 'circle') return [n.x + (dx / len) * n.r, n.y + (dy / len) * n.r]
  const k = Math.min(n.w / 2 / Math.abs(dx || 1e-6), n.h / 2 / Math.abs(dy || 1e-6))
  return [n.x + dx * k, n.y + dy * k]
}
function curve(A, B, bend) { // quadratic bezier between node outlines
  const [x0, y0] = clip(A, B.x, B.y), [x2, y2] = clip(B, A.x, A.y)
  const dx = x2 - x0, dy = y2 - y0, len = Math.hypot(dx, dy) || 1
  return { x0, y0, x2, y2, cx: (x0 + x2) / 2 - (dy / len) * bend, cy: (y0 + y2) / 2 + (dx / len) * bend, len: len * (1 + Math.abs(bend) * 0.25) }
}
function at(c, t, out) {
  const u = 1 - t
  out[0] = u * u * c.x0 + 2 * u * t * c.cx + t * t * c.x2
  out[1] = u * u * c.y0 + 2 * u * t * c.cy + t * t * c.y2
  return out
}
function rowOf(n, i) {
  const top = n.y + n.h / 2 - 0.62, bottom = n.y - n.h / 2 + 0.22
  return [n.x - n.w / 2 + 0.22, n.x + n.w / 2 - 0.22, top + ((bottom - top) * i) / (n.grid - 1)]
}

function compile(key) {
  const def = SCENES[key]
  const nodes = def.nodes, byId = {}
  nodes.forEach((n, i) => { byId[n.id] = n; n.g = i })
  const edges = def.edges.map(([a, b, bend = 0], j) => ({ a, b, g: nodes.length + j, c: curve(byId[a], byId[b], bend) }))
  const edgeMap = {}
  edges.forEach((e) => { edgeMap[e.a + '>' + e.b] = e })
  return { key, def, nodes, byId, edges, edgeMap, shape: null }
}

function buildShape(sc, N, density) {
  const r = rng(sc.key.length * 97 + sc.nodes.length * 13 + 5)
  const g = () => (r() + r() + r() + r() - 2) / 2
  const segs = []
  for (const n of sc.nodes) {
    if (n.kind === 'note') continue
    const per = n.kind === 'circle' ? Math.PI * 2 * n.r : 2 * (n.w + n.h)
    segs.push({ n, len: per * (n.dashed ? 0.6 : 1), type: 'outline', per })
    if (n.grid) segs.push({ n, len: n.grid * (n.w - 0.44) * 0.55, type: 'rows' })
  }
  for (const e of sc.edges) segs.push({ e, len: e.c.len * 0.55, type: 'edge' })
  const total = segs.reduce((s, x) => s + x.len, 0)
  const used = Math.min(N * 0.86, total * density)
  const pos = new Float32Array(N * 4), grp = new Float32Array(N)
  const p = [0, 0]
  let i = 0
  for (const s of segs) {
    const count = Math.round((s.len / (total || 1)) * used)
    for (let k = 0; k < count && i < N; k++, i++) {
      let x, y, flow
      if (s.type === 'edge') {
        flow = r(); at(s.e.c, flow, p); x = p[0] + g() * 0.012; y = p[1] + g() * 0.012; grp[i] = s.e.g
      } else if (s.type === 'rows') {
        const [x1, x2, ry] = rowOf(s.n, Math.floor(r() * s.n.grid))
        flow = r(); x = x1 + (x2 - x1) * flow; y = ry + g() * 0.01; grp[i] = s.n.g
      } else if (s.n.kind === 'circle') {
        flow = r(); const a = flow * Math.PI * 2, rad = s.n.r + g() * 0.012
        x = s.n.x + Math.cos(a) * rad; y = s.n.y + Math.sin(a) * rad; grp[i] = s.n.g
      } else {
        const n = s.n
        let d = r() * s.per
        if (n.dashed && Math.floor(d / 0.11) % 2) d = (d + 0.11) % s.per
        flow = d / s.per
        if (d < n.w) { x = n.x - n.w / 2 + d; y = n.y + n.h / 2 }
        else if (d < n.w + n.h) { x = n.x + n.w / 2; y = n.y + n.h / 2 - (d - n.w) }
        else if (d < 2 * n.w + n.h) { x = n.x + n.w / 2 - (d - n.w - n.h); y = n.y - n.h / 2 }
        else { x = n.x - n.w / 2; y = n.y - n.h / 2 + (d - 2 * n.w - n.h) }
        x += g() * 0.01; y += g() * 0.01; grp[i] = n.g
      }
      pos[i * 4] = x; pos[i * 4 + 1] = y; pos[i * 4 + 2] = g() * 0.02; pos[i * 4 + 3] = flow
    }
  }
  for (; i < N; i++) { // the rest drifts around the diagram as dust
    pos[i * 4] = g() * 3.4; pos[i * 4 + 1] = BOX.cy + g() * 2.9; pos[i * 4 + 2] = g() * 1.6 - 0.4; pos[i * 4 + 3] = r()
    grp[i] = AMBIENT
  }
  return { pos, grp }
}

function buildWordShape(text, box, N) {
  const PX = 100, W = Math.round(box.w * PX), H = Math.round(box.h * PX)
  const c = document.createElement('canvas'); c.width = W; c.height = H
  const g2 = c.getContext('2d', { willReadFrequently: true })
  const family = '"Bricolage Grotesque Variable", "PingFang TC", sans-serif'
  let size = H * 0.82
  g2.font = `800 ${size}px ${family}`
  size = Math.min(size, (size * W * 0.94) / g2.measureText(text).width)
  g2.font = `800 ${size}px ${family}`
  g2.textAlign = 'center'; g2.textBaseline = 'middle'; g2.fillStyle = '#fff'
  g2.fillText(text, W / 2, H / 2)
  const data = g2.getImageData(0, 0, W, H).data, pts = []
  for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) if (data[(y * W + x) * 4 + 3] > 128) pts.push(x, y)
  const r = rng(text.length * 131 + text.charCodeAt(0)), g = () => (r() + r() + r() + r() - 2) / 2
  const pos = new Float32Array(N * 4), grp = new Float32Array(N)
  const n = pts.length / 2, used = n ? Math.min(Math.floor(N * 0.84), Math.floor(n * 2.2)) : 0
  let i = 0
  for (; i < used; i++) {
    const k = Math.floor(r() * n) * 2
    pos[i * 4] = (pts[k] + r() * 2 - W / 2) / PX; pos[i * 4 + 1] = box.cy - (pts[k + 1] + r() * 2 - H / 2) / PX
    pos[i * 4 + 2] = g() * 0.03; pos[i * 4 + 3] = pts[k] / W
  }
  for (; i < N; i++) {
    pos[i * 4] = g() * 3.4; pos[i * 4 + 1] = box.cy + g() * 1.8; pos[i * 4 + 2] = g() * 1.6 - 0.4; pos[i * 4 + 3] = r()
    grp[i] = AMBIENT
  }
  return { pos, grp }
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{ reduced: boolean, layer: HTMLElement, words: string[], texts: Record<string, {labels: Record<string, string[]>, caps: string[]}> }} opts
 * @returns {{ dispose(): void, stats(): object } | null} null when WebGL is unavailable
 */
export function createField(canvas, opts) {
  let renderer
  try {
    renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' })
  } catch (e) { return null }
  const mobile = Math.min(window.innerWidth, window.innerHeight) < 720
  const COUNT = mobile ? 6000 : 16000
  const DENSITY = mobile ? 150 : 330 // particles per scene unit of line
  let pr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2)
  renderer.setClearColor(0x000000, 0)

  const scene = new Scene()
  const camera = new PerspectiveCamera(45, 1, 0.1, 50)
  camera.position.z = 7
  const stage = new Group()
  scene.add(stage)

  // particles
  const geo = new BufferGeometry()
  const from = new BufferAttribute(new Float32Array(COUNT * 4), 4)
  const to = new BufferAttribute(new Float32Array(COUNT * 4), 4)
  const grp = new BufferAttribute(new Float32Array(COUNT * 2), 2)
  const rand = new Float32Array(COUNT * 4)
  for (let i = 0; i < rand.length; i++) rand[i] = Math.random()
  geo.setAttribute('position', new BufferAttribute(new Float32Array(COUNT * 3), 3))
  geo.setAttribute('aFrom', from); geo.setAttribute('aTo', to); geo.setAttribute('aGrp', grp)
  geo.setAttribute('aRand', new BufferAttribute(rand, 4))
  const sA = Array.from({ length: MAXG }, () => new Vector4(0, 1, 0, 0))
  const sB = Array.from({ length: MAXG }, () => new Vector4(0, 1, 0, 0))
  const mat = new ShaderMaterial({
    vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthTest: false, depthWrite: false, blending: AdditiveBlending,
    uniforms: { uMix: { value: 1 }, uTime: { value: 0 }, uSize: { value: 1 }, uAlpha: { value: 1 }, uMouse: { value: { x: 9, y: 9 } }, uSA: { value: sA }, uSB: { value: sB } },
  })
  const points = new Points(geo, mat)
  points.frustumCulled = false
  stage.add(points)

  // packets
  const pgeo = new BufferGeometry()
  const ppos = new BufferAttribute(new Float32Array(MAXP * 3), 3), pcol = new BufferAttribute(new Float32Array(MAXP * 3), 3), psize = new BufferAttribute(new Float32Array(MAXP), 1)
  for (const b of [ppos, pcol, psize]) b.setUsage(DynamicDrawUsage)
  pgeo.setAttribute('position', ppos); pgeo.setAttribute('aCol', pcol); pgeo.setAttribute('aSize', psize)
  const pmat = new ShaderMaterial({ vertexShader: PVERT, fragmentShader: PFRAG, transparent: true, depthTest: false, depthWrite: false, blending: AdditiveBlending, uniforms: { uSize: { value: 1 } } })
  const packets = new Points(pgeo, pmat)
  packets.frustumCulled = false
  stage.add(packets)
  let pn = 0

  // compiled scenes + their DOM labels
  const compiled = {}
  const get = (key) => {
    const sc = compiled[key] || (compiled[key] = compile(SCENES[key] ? key : 'dust'))
    if (!sc.shape && sc.def.words) { sc.wordShapes = (opts.words || ['Go']).map((w) => buildWordShape(w, sc.def.box, COUNT)); sc.shape = sc.wordShapes[0]; sc.word = 0 }
    if (!sc.shape) sc.shape = buildShape(sc, COUNT, DENSITY)
    if (!sc.labels) {
      const txt = (opts.texts[key] || {}).labels || {}
      sc.caps = (opts.texts[key] || {}).caps || []
      sc.labels = sc.nodes.filter((n) => txt[n.id]).map((n) => {
        const el = document.createElement('div')
        el.className = 'gl-label is-' + n.kind + (n.labelPos ? ' at-' + n.labelPos : '')
        const b = document.createElement('b'); b.textContent = txt[n.id][0]; el.appendChild(b)
        const sub = document.createElement('span'); sub.textContent = txt[n.id][1] || ''; el.appendChild(sub)
        opts.layer.appendChild(el)
        const pos = n.labelPos || (n.kind === 'circle' ? 'below' : 'in')
        const v = new Vector3(n.x, n.y, 0)
        if (pos === 'below') v.y -= n.h / 2 + 0.24
        if (pos === 'above') v.y += n.h / 2 + 0.34
        if (pos === 'top') v.y += n.h / 2 - 0.24
        if (pos === 'right') v.x += n.w / 2 + 0.2
        return { el, sub, n, v, base: txt[n.id][1] || '', tone: '', subNow: txt[n.id][1] || '', op: -1 }
      })
    }
    return sc
  }
  const capEl = document.createElement('div')
  capEl.className = 'gl-cap'
  opts.layer.appendChild(capEl)
  let capKey = ''

  // script API — writes group states (sB), label states and packets for one frame
  let cur = get('dust'), prev = cur
  const nodeState = {}, tmp = [0, 0]
  let capIdx = -1
  function pushDot(x, y, tone, size) {
    if (pn >= MAXP) return
    const c = TONE_RGB[TONES[tone] || 0]
    ppos.setXYZ(pn, x, y, 0.02); pcol.setXYZ(pn, c[0], c[1], c[2]); psize.setX(pn, size || 1); pn++
  }
  const api = {
    pkt(a, b, p, tone, size) {
      if (!(p >= 0 && p <= 1)) return
      const e = cur.edgeMap[a + '>' + b], rev = !e && cur.edgeMap[b + '>' + a]
      if (e) at(e.c, p, tmp)
      else if (rev) at(rev.c, 1 - p, tmp)
      else at(curve(cur.byId[a], cur.byId[b], 0), p, tmp)
      pushDot(tmp[0], tmp[1], tone, size)
    },
    pkt2(A, B, p, tone, size) { if (p >= 0 && p <= 1) pushDot(A[0] + (B[0] - A[0]) * p, A[1] + (B[1] - A[1]) * p, tone, size) },
    dot: pushDot,
    pos: (id) => [cur.byId[id].x, cur.byId[id].y],
    row: (id, i) => rowOf(cur.byId[id], i),
    node(id, s) {
      const n = cur.byId[id]
      if (!n) return
      sB[n.g].set(TONES[s.tone] || 0, s.alpha == null ? 1 : s.alpha, 0, 0)
      nodeState[id] = s
    },
    edge(a, b, alpha) { const e = cur.edgeMap[a + '>' + b]; if (e) sB[e.g].y = alpha },
    cap(i) { capIdx = i },
  }

  // ── layout: fit the active scene into its DOM slot ──
  let W = 0, H = 0, wide = true, anchors = []
  function resize() {
    W = window.innerWidth; H = window.innerHeight; wide = W >= 960
    renderer.setPixelRatio(pr); renderer.setSize(W, H, false)
    camera.aspect = W / H; camera.updateProjectionMatrix()
    mat.uniforms.uSize.value = H * pr * 0.017; pmat.uniforms.uSize.value = H * pr * 0.085
    measure()
  }
  function measure() {
    // elements without layout (inside a closed <details>) are skipped
    anchors = [...document.querySelectorAll('[data-scene]')].filter((el) => el.getClientRects().length).map((el) => {
      const root = el.closest('[data-stage-root]')
      return { key: el.dataset.scene, top: el.getBoundingClientRect().top + window.scrollY, slot: root && root.querySelector('.stage-slot') }
    })
  }
  function activeAnchor() {
    const y = window.scrollY + H * (wide ? 0.55 : 0.72)
    let a = anchors[0]
    for (const x of anchors) if (x.top <= y) a = x
    return a
  }
  const fit = { x: 0, y: 0, s: 1, has: false, rect: null }
  const unit = () => H / (2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z) // px per world unit at z = 0
  function slotFit(slot, out) {
    const r = slot && slot.getBoundingClientRect()
    if (!r || r.width < 40 || r.height < 40) { out.has = false; out.x = 0; out.y = 0; out.s = Math.min(1.1, W / unit() / 6); out.rect = null; return out }
    const bx = cur.def.box || BOX
    const u = unit(), s = Math.min(r.width / bx.w, r.height / bx.h) / u
    out.has = true; out.s = s; out.rect = r
    out.x = (r.left + r.width / 2 - W / 2) / u
    out.y = -(r.top + r.height / 2 - H / 2) / u - bx.cy * s
    return out
  }

  const mouse = { x: 9, y: 9 }
  const onMove = (e) => { mouse.x = (e.clientX / W) * 2 - 1; mouse.y = -(e.clientY / H) * 2 + 1 }
  const onLeave = () => { mouse.x = 9; mouse.y = 9 }

  let m = 1, time = 0, sceneTime = 0, last = 0, raf = 0, running = false, slotNow = null
  let acc = 0, frames = 0, fps = 60
  const v = new Vector3(), fitNow = { ...fit }

  function loadShape(shape) { // current targets become the start, `shape` the destination
    from.array.set(to.array); from.needsUpdate = true
    to.array.set(shape.pos); to.needsUpdate = true
    const g = grp.array
    for (let i = 0; i < COUNT; i++) { g[i * 2] = g[i * 2 + 1]; g[i * 2 + 1] = shape.grp[i] }
    grp.needsUpdate = true
    for (let i = 0; i < MAXG; i++) sA[i].copy(sB[i])
    m = opts.reduced ? 1 : 0
  }
  function switchTo(a) {
    prev = cur; cur = get(a.key); slotNow = a.slot
    if (cur.wordShapes) { cur.word = 0; cur.shape = cur.wordShapes[0] }
    loadShape(cur.shape); sceneTime = 0
    for (const l of prev.labels) if (prev !== cur) { l.el.style.opacity = 0; l.op = 0 }
  }

  function frame(now) {
    const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000 || 0.016)) // rAF time can precede performance.now()
    last = now
    const a = activeAnchor()
    if (a && (a.key !== cur.key || a.slot !== slotNow)) {
      if (a.key !== cur.key) switchTo(a); else slotNow = a.slot
    }
    if (!opts.reduced) { time += dt; sceneTime += dt; m = Math.min(1, m + dt / (cur.wordShapes ? 0.8 : 1.0)) }
    const def = cur.def
    if (cur.wordShapes && !opts.reduced) { // hero: spell the next word
      const w = Math.floor(sceneTime / def.every) % cur.wordShapes.length
      if (w !== cur.word) { cur.word = w; loadShape(cur.wordShapes[w]) }
    }
    const t = opts.reduced ? (def.still == null ? 0 : def.still) : sceneTime % def.dur

    // run the script
    for (let i = 0; i < MAXG; i++) sB[i].set(0, 1, 0, 0)
    sB[AMBIENT].y = cur.nodes.length ? 0.4 : cur.wordShapes ? 0.3 : 0.55
    for (const k in nodeState) delete nodeState[k]
    pn = 0; capIdx = -1
    def.play(api, t)
    const fade = smooth((m - 0.45) / 0.5)
    pgeo.setDrawRange(0, fade > 0.9 ? pn : 0)
    ppos.needsUpdate = true; pcol.needsUpdate = true; psize.needsUpdate = true

    // place the stage
    slotFit(slotNow, fit)
    const k = opts.reduced || fitNow.init !== true ? 1 : Math.min(1, dt * 7)
    fitNow.x += (fit.x - fitNow.x) * k; fitNow.y += (fit.y - fitNow.y) * k; fitNow.s += (fit.s - fitNow.s) * k; fitNow.init = true
    stage.position.set(fitNow.x, fitNow.y, 0)
    stage.scale.setScalar(fitNow.s)
    const mx = mouse.x > 2 ? 0 : mouse.x, my = mouse.y > 2 ? 0 : mouse.y
    stage.rotation.y = opts.reduced ? 0 : Math.sin(time * 0.3) * 0.05 + mx * 0.05
    stage.rotation.x = opts.reduced ? 0 : -my * 0.04
    stage.updateMatrixWorld()

    mat.uniforms.uMix.value = m
    mat.uniforms.uTime.value = time
    mat.uniforms.uAlpha.value = (def.alpha || 1) * (cur.nodes.length || cur.wordShapes ? 1 : wide ? 0.3 : 0.2)
    mat.uniforms.uMouse.value.x = mouse.x; mat.uniforms.uMouse.value.y = mouse.y

    // narrow screens: the canvas sits above the page, so draw only inside the slot
    if (!wide && fit.rect) {
      const r = fit.rect
      renderer.setScissorTest(true)
      renderer.setScissor(Math.max(0, r.left), Math.max(0, H - r.bottom), r.width, Math.max(0, Math.min(r.bottom, H) - Math.max(r.top, 0)))
    } else renderer.setScissorTest(false)
    renderer.clear()
    if (wide || fit.rect) renderer.render(scene, camera) // narrow + no slot: keep particles off the text

    // labels + caption
    const small = fitNow.s * unit() < 78
    for (const l of cur.labels) {
      const s = nodeState[l.n.id] || {}
      const op = fit.has ? fade * (s.alpha == null ? 1 : Math.min(1, s.alpha * 1.6)) : 0
      if (op < 0.02) { if (l.op !== 0) { l.el.style.opacity = 0; l.op = 0 } continue }
      v.copy(l.v).applyMatrix4(stage.matrixWorld).project(camera)
      l.el.style.transform = `translate3d(${((v.x + 1) / 2) * W}px, ${((1 - v.y) / 2) * H}px, 0)`
      if (l.op !== op) { l.el.style.opacity = op; l.op = op }
      const tone = s.tone || ''
      if (l.tone !== tone) { l.el.dataset.tone = tone; l.tone = tone }
      const sub = s.sub || l.base
      if (l.subNow !== sub) { l.sub.textContent = sub; l.subNow = sub }
    }
    opts.layer.classList.toggle('small', small)
    const ck = capIdx >= 0 && fit.has && cur.caps[capIdx] ? cur.key + capIdx : ''
    if (ck !== capKey) {
      capKey = ck
      capEl.classList.remove('on')
      if (ck) { capEl.textContent = cur.caps[capIdx]; void capEl.offsetWidth; capEl.classList.add('on') }
    }
    if (ck) {
      v.set(0, (cur.def.box || BOX).cy - (cur.def.box || BOX).h / 2 + 0.33, 0).applyMatrix4(stage.matrixWorld).project(camera)
      capEl.style.transform = `translate3d(${((v.x + 1) / 2) * W}px, ${((1 - v.y) / 2) * H}px, 0)`
      capEl.style.maxWidth = Math.round(Math.min(W - 40, (cur.def.box || BOX).w * fitNow.s * unit())) + 'px'
    }

    // adaptive quality
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
  const onVis = () => (document.hidden ? stop() : start())
  let still = 0
  const renderStill = () => { cancelAnimationFrame(still); still = requestAnimationFrame(frame) }

  const ro = new ResizeObserver(() => { measure(); if (opts.reduced) renderStill() })
  ro.observe(document.body)
  window.addEventListener('resize', resize)
  document.addEventListener('visibilitychange', onVis)
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); stop() })
  canvas.addEventListener('webglcontextrestored', () => start())
  if (opts.reduced) window.addEventListener('scroll', renderStill, { passive: true })
  else {
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
  }
  to.array.set(cur.shape.pos); for (let i = 0; i < COUNT; i++) grp.array[i * 2 + 1] = AMBIENT
  resize()
  if (opts.reduced) renderStill(); else start()

  return {
    stats: () => ({ fps: Math.round(fps), pixelRatio: pr, particles: COUNT, scene: cur.key, packets: pn, word: cur.word }),
    dispose() {
      stop(); cancelAnimationFrame(still); ro.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', renderStill)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
      opts.layer.replaceChildren()
      geo.dispose(); mat.dispose(); pgeo.dispose(); pmat.dispose(); renderer.dispose()
    },
  }
}
