// Particle target shapes. Each builder returns Float32Array(n * 4): x, y, z, flow.
// `flow` (0..1) is a coordinate along the shape's "data path"; the shader sends
// light pulses along increasing flow, so streams read as traffic.

function rng(seed) {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const TAU = Math.PI * 2

function build(n, seed, fn) {
  const r = rng(seed)
  const g = () => (r() + r() + r() + r() - 2) / 2 // ~gaussian, -1..1
  const out = new Float32Array(n * 4)
  const p = [0, 0, 0, 0]
  for (let i = 0; i < n; i++) {
    fn(p, r, g, i / n)
    out.set(p, i * 4)
  }
  return out
}

function shell(p, r, c, rad) {
  const u = r() * 2 - 1, th = r() * TAU, s = Math.sqrt(1 - u * u)
  p[0] = c[0] + rad * s * Math.cos(th)
  p[1] = c[1] + rad * u
  p[2] = c[2] + rad * s * Math.sin(th)
}

function lerp3(p, a, b, t, bend = 0) {
  p[0] = a[0] + (b[0] - a[0]) * t
  p[1] = a[1] + (b[1] - a[1]) * t - Math.sin(t * Math.PI) * bend
  p[2] = a[2] + (b[2] - a[2]) * t
}

// 0 — hero: a tilted spiral disc
function galaxy(n) {
  const tilt = 1.05, ct = Math.cos(tilt), st = Math.sin(tilt)
  return build(n, 11, (p, r, g) => {
    let x, y, z, flow
    if (r() < 0.14) {
      const q = [0, 0, 0]
      shell(q, r, [0, 0, 0], 0.32 * Math.cbrt(r()))
      ;[x, y, z] = q; flow = r() * 0.1
    } else {
      const rad = 0.3 + Math.pow(r(), 0.7) * 2.1
      const arm = Math.floor(r() * 3)
      const ang = (arm * TAU) / 3 + rad * 1.5 + g() * 0.42
      x = rad * Math.cos(ang); z = rad * Math.sin(ang)
      y = g() * 0.1 * (2.6 - rad)
      flow = rad / 2.4
    }
    p[0] = x; p[1] = y * ct - z * st; p[2] = y * st + z * ct; p[3] = flow
  })
}

// 1 — systems: three server layers (Gate / Lobby / Game) joined by streams
export const LAYER_Y = [1.25, 0, -1.25]
function layers(n) {
  return build(n, 23, (p, r, g) => {
    if (r() < 0.6) {
      const y = LAYER_Y[Math.floor(r() * 3)]
      const rad = [0.45, 0.85, 1.25][Math.floor(r() * 3)] + g() * 0.03
      const ang = r() * TAU
      p[0] = rad * Math.cos(ang); p[1] = y + g() * 0.02; p[2] = rad * Math.sin(ang)
      p[3] = ang / TAU
    } else {
      const k = Math.floor(r() * 8)
      const ang = (k * TAU) / 8 + 0.2
      const rad = k % 2 ? 0.85 : 1.25
      const y = 1.25 - r() * 2.5
      p[0] = rad * Math.cos(ang) + g() * 0.025; p[1] = y; p[2] = rad * Math.sin(ang) + g() * 0.025
      p[3] = (1.25 - y) / 2.5
    }
  })
}

// 2 — experience: a double helix timeline, 2011 at the bottom, now at the top
function helix(n) {
  return build(n, 37, (p, r, g) => {
    const rad = 0.72
    if (r() < 0.72) {
      const t = r(), s = r() < 0.5 ? 0 : Math.PI
      const ang = t * TAU * 3.2 + s
      p[0] = rad * Math.cos(ang) + g() * 0.035; p[1] = -1.9 + 3.8 * t + g() * 0.02; p[2] = rad * Math.sin(ang) + g() * 0.035
      p[3] = t
    } else {
      const t = Math.floor(r() * 30) / 30 + 1 / 60
      const ang = t * TAU * 3.2, u = r() * 2 - 1
      p[0] = rad * Math.cos(ang) * u; p[1] = -1.9 + 3.8 * t; p[2] = rad * Math.sin(ang) * u
      p[3] = t
    }
  })
}

// 3 — AI workflow: main session on top; lightweight model, worker, verifier below
export const AI_NODES = [[0, 1.25, 0], [-1.3, -0.9, 0], [0, -0.9, 0], [1.3, -0.9, 0]]
function agents(n) {
  const N = AI_NODES
  const links = [[0, 1, 0], [0, 2, 0], [0, 3, 0], [2, 3, 0.55]]
  return build(n, 41, (p, r, g) => {
    const u = r()
    if (u < 0.5) {
      const k = r() < 0.34 ? 0 : 1 + Math.floor(r() * 3)
      shell(p, r, N[k], (k === 0 ? 0.44 : 0.3) * (0.9 + r() * 0.1))
      p[3] = r()
    } else if (u < 0.92) {
      const l = links[Math.floor(r() * links.length)]
      const t = r()
      lerp3(p, N[l[0]], N[l[1]], t, l[2])
      p[0] += g() * 0.03; p[1] += g() * 0.03; p[2] += g() * 0.03
      p[3] = t
    } else {
      p[0] = g() * 2.4; p[1] = g() * 2.2; p[2] = g() * 1.5; p[3] = r()
    }
  })
}

// 4 — open source: four small systems in a constellation
function constellation(n) {
  const C = [[-1.7, 0.9, 0], [1.5, 1.1, -0.4], [-1.2, -1.1, 0.4], [1.8, -0.8, 0]]
  return build(n, 53, (p, r, g) => {
    const u = r()
    if (u < 0.75) {
      const k = Math.floor(r() * 4)
      if (r() < 0.55) shell(p, r, C[k], 0.34)
      else {
        const ang = r() * TAU, rad = 0.62 + g() * 0.02, tilt = 0.5 + k * 0.6
        p[0] = C[k][0] + rad * Math.cos(ang)
        p[1] = C[k][1] + rad * Math.sin(ang) * Math.sin(tilt)
        p[2] = C[k][2] + rad * Math.sin(ang) * Math.cos(tilt)
      }
      p[3] = r()
    } else {
      p[0] = g() * 4.5; p[1] = g() * 2.6; p[2] = g() * 2; p[3] = r()
    }
  })
}

// 5 — toolbox: a wireframe lattice
function lattice(n) {
  const S = 1.35, steps = 4
  const snap = (v) => (Math.round(((v + 1) / 2) * steps) / steps) * 2 - 1
  return build(n, 67, (p, r) => {
    const axis = Math.floor(r() * 3), t = r()
    for (let a = 0; a < 3; a++) p[a] = (a === axis ? t * 2 - 1 : snap(r() * 2 - 1)) * S
    p[3] = t
  })
}

// 6 — contact: concentric rings facing the viewer
function rings(n) {
  return build(n, 79, (p, r, g) => {
    const ang = r() * TAU
    const k = r()
    const rad = k < 0.55 ? 2.05 : k < 0.85 ? 2.45 : 2.9
    const j = k < 0.55 ? 0.05 : 0.02
    p[0] = (rad + g() * j) * Math.cos(ang); p[1] = (rad + g() * j) * Math.sin(ang); p[2] = g() * (k < 0.55 ? 0.12 : 0.03)
    p[3] = ang / TAU
  })
}

// Per-shape staging. `x` = horizontal offset as a fraction of half the viewport
// width (desktop only); `a` = opacity; `s` = scale; `spin` = sway amount.
export const STAGES = [
  { make: galaxy, x: 0.5, a: 1, s: 1.0, spin: 1 },
  { make: layers, x: 0.56, a: 1, s: 1.0, spin: 1 },
  { make: helix, x: 0.76, a: 0.9, s: 1.15, spin: 2.4 },
  { make: agents, x: -0.56, a: 1, s: 0.9, spin: 0.3 },
  { make: constellation, x: 0, a: 0.34, s: 1.15, spin: 0.5 },
  { make: lattice, x: 0.6, a: 0.8, s: 1.0, spin: 2 },
  { make: rings, x: 0, a: 0.75, s: 1.42, spin: 0.3 },
]
