// Story scenes. Each scene is a small diagram (nodes + edges, drawn by the particle
// field) and a looping script that moves packets through it and changes node states,
// so the picture acts out the paragraph next to it. Label and caption text lives in
// src/data/*.js under site.scenes[<key>].
//
// Script API (see field.js):
//   a.pkt(from, to, p, tone, size)   packet at progress p (0..1) along from → to
//   a.dot(x, y, tone, size)          free dot in scene coordinates
//   a.node(id, { tone, alpha, sub }) state of a node (and its label)
//   a.edge(from, to, alpha)          opacity of an edge
//   a.cap(i)                         which caption is showing
//   a.row(id, i)                     [x1, x2, y] of row i in a grid node
// Tones: 'ok' (green), 'bad' (red), 'hot' (amber).

const box = (id, x, y, w, h, o = {}) => ({ id, x, y, w, h, kind: 'box', ...o })
const circ = (id, x, y, r, o = {}) => ({ id, x, y, w: r * 2, h: r * 2, r, kind: 'circle', ...o })
const note = (id, x, y) => ({ id, x, y, w: 0, h: 0, kind: 'note' })
const seg = (t, a, b) => (t - a) / (b - a)
const clamp = (v) => Math.min(1, Math.max(0, v))

export const SCENES = {
  dust: { nodes: [], edges: [], dur: 1, play() {} },

  // Hero — "real-time game server platforms": players → Gate → Lobby → Game
  cluster: {
    nodes: [
      circ('players', -2.3, 0.2, 0.3), box('gate', -1.0, 0.2, 0.9, 1.5), box('lobby', 0.35, 0.2, 0.9, 1.5),
      box('g1', 1.95, 1.15, 1.1, 0.55), box('g2', 1.95, 0.2, 1.1, 0.55), box('g3', 1.95, -0.75, 1.1, 0.55),
    ],
    edges: [['players', 'gate'], ['gate', 'lobby'], ['lobby', 'g1'], ['lobby', 'g2'], ['lobby', 'g3']],
    dur: 7.2, still: 2, box: { w: 5.5, h: 3.4, cy: 0.15 },
    play(a, t) {
      for (let k = 0; k < 5; k++) {
        const u = ((t / 2.4 + k / 5) % 1) * 3, g = 'g' + ((k % 3) + 1)
        a.pkt('players', 'gate', u); a.pkt('gate', 'lobby', u - 1); a.pkt('lobby', g, u - 2, 'hot')
        if (u > 2.8) a.node(g, { tone: 'hot' })
      }
    },
  },

  // Competency 1 — unification built to a POC, evaluated, stopped
  poc: {
    nodes: [
      box('a', -2.05, 1.2, 1.1, 0.55), box('b', -2.05, 0.1, 1.1, 0.55), box('c', -2.05, -1.0, 1.1, 0.55),
      box('poc', 0.05, 0.1, 1.7, 1.5, { dashed: true }), box('live', 2.1, 0.1, 1.1, 0.9),
    ],
    edges: [['a', 'poc'], ['b', 'poc'], ['c', 'poc'], ['poc', 'live']],
    dur: 11, still: 9,
    play(a, t) {
      const src = ['a', 'b', 'c']
      if (t < 5) {
        a.cap(0)
        src.forEach((s, k) => a.pkt(s, 'poc', (t * 0.55 + k / 3) % 1))
        a.node('poc', { tone: 'hot' }); a.edge('poc', 'live', 0.3); a.node('live', { alpha: 0.6 })
      } else if (t < 6.6) {
        a.cap(0); a.node('poc', { tone: 'hot' })
        a.pkt('poc', 'live', seg(t, 5, 6.6) * 0.5, 'hot', 1.4)
      } else {
        a.cap(1)
        a.pkt('poc', 'live', 0.5, 'bad', 2.2 + Math.sin(t * 6) * 0.4)
        a.edge('poc', 'live', 0.1); a.node('poc', { tone: 'hot', alpha: 0.75 }); a.node('live', { tone: 'ok' })
      }
    },
  },

  // Competency 2 — shared mechanics in one framework, new titles stack on top
  framework: {
    nodes: [
      box('fw', 0, -1.25, 4.6, 0.75),
      box('g1', -1.8, 0.75, 1.0, 0.8), box('g2', -0.6, 0.75, 1.0, 0.8), box('g3', 0.6, 0.75, 1.0, 0.8), box('g4', 1.8, 0.75, 1.0, 0.8),
    ],
    edges: [['fw', 'g1'], ['fw', 'g2'], ['fw', 'g3'], ['fw', 'g4']],
    dur: 9, still: 8,
    play(a, t) {
      a.cap(t < 5.6 ? 0 : 1); a.node('fw', { tone: 'hot' })
      for (let i = 0; i < 4; i++) {
        const g = 'g' + (i + 1), t0 = 0.4 + i * 1.3
        const v = clamp(seg(t, t0 + 0.7, t0 + 1.1))
        a.pkt('fw', g, seg(t, t0, t0 + 0.7), 'hot', 1.3)
        a.node(g, { alpha: 0.06 + v * 0.94, tone: t > 5.6 ? 'ok' : null }); a.edge('fw', g, 0.1 + v * 0.9)
        if (t > 5.6) a.pkt('fw', g, (t * 0.5 + i / 4) % 1, 'ok', 0.8)
      }
    },
  },

  // Competency 3 / Tyche — full-collection scan vs compound index
  index: {
    nodes: [circ('query', -2.3, -0.3, 0.3), box('idx', -0.95, 1.2, 1.5, 0.55), box('coll', 1.25, -0.1, 2.4, 3.3, { grid: 10, labelPos: 'top' })],
    edges: [['query', 'coll'], ['query', 'idx'], ['idx', 'coll']],
    dur: 11, still: 9,
    play(a, t) {
      if (t < 5.6) {
        a.cap(0); a.node('idx', { alpha: 0 }); a.edge('query', 'idx', 0); a.edge('idx', 'coll', 0)
        a.pkt('query', 'coll', (t * 0.8) % 1, 'bad')
        const f = clamp(seg(t, 0.5, 5.3)) * 10, cur = Math.min(9, Math.floor(f))
        for (let i = 0; i <= cur; i++) {
          const [x1, x2, y] = a.row('coll', i)
          if (i < cur) { a.dot(x1, y, 'bad', 0.9); a.dot((x1 + x2) / 2, y, 'bad', 0.9); a.dot(x2, y, 'bad', 0.9) }
          else a.dot(x1 + (x2 - x1) * (f - cur), y, 'bad', 2)
        }
        a.node('coll', { tone: 'bad' })
      } else {
        a.cap(1); a.node('idx', { tone: 'ok' }); a.edge('query', 'coll', 0.08); a.node('coll', { alpha: 0.55 })
        const u = (((t - 5.6) % 1.8) / 1.8) * 2.4
        a.pkt('query', 'idx', u, 'ok'); a.pkt('idx', 'coll', u - 1, 'ok')
        if (u > 1.9) for (const i of [3, 6]) { const [x1, x2, y] = a.row('coll', i); a.dot(x1 + (x2 - x1) * 0.4, y, 'ok', 2) }
      }
    },
  },

  // Competency 4 — release pipeline
  pipeline: {
    nodes: [
      box('tag', -1.8, 0.95, 1.3, 0.65), box('ci', 0, 0.95, 1.5, 0.65), box('img', 1.8, 0.95, 1.4, 0.65),
      box('reg', 1.8, -0.75, 1.3, 0.65), box('dep', 0, -0.75, 1.5, 0.65), box('run', -1.8, -0.75, 1.3, 0.65),
    ],
    edges: [['tag', 'ci'], ['ci', 'img'], ['img', 'reg'], ['reg', 'dep'], ['dep', 'run']],
    dur: 9, still: 8.5,
    play(a, t) {
      const n = ['tag', 'ci', 'img', 'reg', 'dep', 'run'], s = t / 1.3
      a.cap(0)
      n.forEach((id, i) => {
        if (i < 5) a.pkt(id, n[i + 1], s - i, 'hot', 1.6)
        a.node(id, s >= i + 1 || (i === 5 && s >= 5) ? { tone: 'ok' } : s >= i ? { tone: 'hot' } : { alpha: 0.45 })
      })
    },
  },

  // Competency 5 — Redis tampering: validation bypassed, then state moved into process memory
  tamper: {
    nodes: [
      circ('atk', -2.3, 1.25, 0.3), box('redis', -0.6, 1.25, 1.4, 0.75), box('val', -0.6, -0.45, 1.9, 0.6),
      box('docker', 1.75, -0.45, 1.75, 2.5, { dashed: true, labelPos: 'top' }), box('game', 1.75, -0.2, 1.35, 0.6), box('mem', 1.75, -1.15, 1.35, 0.55),
    ],
    edges: [['atk', 'redis'], ['redis', 'val'], ['val', 'game'], ['redis', 'mem', 0.9]],
    dur: 12.5, still: 11,
    play(a, t) {
      a.node('atk', { tone: 'bad' })
      if (t < 5.8) {
        a.cap(0); a.node('docker', { alpha: 0 }); a.node('mem', { alpha: 0 }); a.edge('redis', 'mem', 0)
        const u = ((t % 2.9) / 2.9) * 3.3
        a.pkt('atk', 'redis', u, 'bad', 1.5); a.pkt('redis', 'val', u - 1, 'bad', 1.5); a.pkt('val', 'game', u - 2, 'bad', 1.5)
        if (t > 0.9) a.node('redis', { tone: 'bad' })
        if (t > 1.8) a.node('val', { tone: 'bad', alpha: 0.7 })
        if (t > 2.7) a.node('game', { tone: 'bad' })
      } else {
        const t2 = t - 5.8
        a.cap(1); a.node('docker', { tone: 'ok' }); a.node('mem', { tone: t2 > 1.5 ? 'ok' : 'hot' }); a.node('game', { tone: 'ok' })
        a.pkt('redis', 'mem', seg(t2, 0.2, 1.5), 'hot', 2)
        a.node('redis', { alpha: 0.4 }); a.node('val', { alpha: 0.25 }); a.edge('redis', 'val', 0.1); a.edge('val', 'game', 0.1)
        a.edge('redis', 'mem', t2 < 1.6 ? 1 : 0.12)
        a.pkt('atk', 'redis', (t2 % 2.2) / 2.2, 'bad', 1.2)
      }
    },
  },

  // Tyche — bare metal → Docker, following the cutover runbook
  migrate: {
    nodes: [
      box('old', -1.75, 0.55, 1.75, 2.0, { labelPos: 'top' }), box('s1', -1.75, 0.6, 1.3, 0.45), box('s2', -1.75, -0.05, 1.3, 0.45),
      box('neu', 1.75, 0.55, 1.75, 2.0, { dashed: true, labelPos: 'top' }), box('c1', 1.75, 0.6, 1.3, 0.45), box('c2', 1.75, -0.05, 1.3, 0.45),
      box('f', -1.85, -1.55, 1.5, 0.5), box('sy', 0, -1.55, 1.5, 0.5), box('op', 1.85, -1.55, 1.6, 0.5),
    ],
    edges: [['s1', 'c1'], ['s2', 'c2'], ['f', 'sy'], ['sy', 'op']],
    dur: 11, still: 10,
    play(a, t) {
      const step = t < 2.6 ? 0 : t < 6.8 ? 1 : 2
      a.cap(step)
      a.node('f', { tone: step > 0 ? 'ok' : 'hot' })
      a.node('sy', step === 1 ? { tone: 'hot' } : step > 1 ? { tone: 'ok' } : { alpha: 0.4 })
      a.node('op', step === 2 ? { tone: t > 9 ? 'ok' : 'hot' } : { alpha: 0.4 })
      const v = clamp(seg(t, 2.6, 6.2))
      for (const c of ['c1', 'c2']) a.node(c, { alpha: 0.08 + v * 0.92, tone: step === 2 ? 'ok' : null })
      a.edge('s1', 'c1', step === 1 ? 1 : 0.15); a.edge('s2', 'c2', step === 1 ? 1 : 0.15)
      if (step === 0) { a.node('old', { tone: 'hot' }) }
      if (step === 1) for (let k = 0; k < 3; k++) { a.pkt('s1', 'c1', ((t - 2.6) * 0.6 + k / 3) % 1, 'hot'); a.pkt('s2', 'c2', ((t - 2.6) * 0.6 + k / 3 + 0.17) % 1, 'hot') }
      if (step === 2) {
        for (const o of ['old', 's1', 's2']) a.node(o, { alpha: 0.25 })
        a.node('neu', { tone: 'ok' })
        for (let k = 0; k < 3; k++) { const u = ((t - 6.8) * 0.7 + k / 3) % 1; a.dot(1.2 + k * 0.55, 2.35 - u * 0.75, 'ok', 1.2) }
      }
    },
  },

  // Tyche — two concurrent requests pass the same check; Redis marker fixes it
  race: {
    nodes: [circ('r1', -2.3, 0.75, 0.3), circ('r2', -2.3, -0.95, 0.3, { labelPos: 'below' }), box('chk', -0.3, -0.1, 1.6, 0.8), box('rew', 1.95, -0.1, 1.3, 0.8), box('mark', -0.3, 1.45, 1.5, 0.55)],
    edges: [['r1', 'chk'], ['r2', 'chk'], ['chk', 'rew'], ['chk', 'mark']],
    dur: 11.5, still: 10,
    play(a, t) {
      if (t < 5.4) {
        a.cap(0); a.node('mark', { alpha: 0 }); a.edge('chk', 'mark', 0)
        a.pkt('r1', 'chk', seg(t, 0.5, 1.8), null, 1.6); a.pkt('r2', 'chk', seg(t, 0.5, 1.8), null, 1.6)
        if (t > 1.7 && t < 2.3) a.node('chk', { tone: 'hot' })
        a.pkt('chk', 'rew', seg(t, 1.9, 3.0), 'bad', 1.6); a.pkt('chk', 'rew', seg(t, 2.15, 3.25), 'bad', 1.6)
        if (t > 3.0) a.node('rew', { tone: 'bad', sub: t > 3.25 ? '× 2' : '× 1' })
      } else {
        const u = t - 5.4
        a.cap(1)
        a.pkt('r1', 'chk', seg(u, 0.5, 1.8), null, 1.6); a.pkt('r2', 'chk', seg(u, 0.5, 1.8), null, 1.6)
        a.pkt('chk', 'mark', seg(u, 1.8, 2.4), 'ok', 1.3); a.node('mark', { tone: u > 2.4 ? 'ok' : null })
        a.pkt('chk', 'rew', seg(u, 2.0, 3.1), 'ok', 1.6); a.pkt('chk', 'r2', seg(u, 2.4, 3.6), 'bad', 1.6)
        if (u > 3.1) a.node('rew', { tone: 'ok', sub: '× 1' })
        if (u > 3.6) a.node('r2', { tone: 'bad' })
      }
    },
  },

  // Tyche — one key per rid found by SCAN → one Hash with rid as field
  hash: {
    nodes: [
      note('keys', -1.35, 1.5),
      ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => box('k' + i, -2.25 + (i % 3) * 0.9, 0.85 - Math.floor(i / 3) * 0.75, 0.7, 0.4)),
      circ('q', -0.45, -1.55, 0.26, { labelPos: 'below' }), box('hash', 1.75, -0.1, 1.6, 3.0, { grid: 7, labelPos: 'top' }),
    ],
    edges: [['q', 'hash']],
    dur: 10.5, still: 9,
    play(a, t) {
      if (t < 5.2) {
        a.cap(0); a.node('hash', { alpha: 0.12 }); a.edge('q', 'hash', 0.05)
        const f = clamp(seg(t, 0.4, 4.8)) * 8, cur = Math.min(7, Math.floor(f))
        for (let i = 0; i < 8; i++) {
          if (i < cur) a.node('k' + i, { tone: 'hot', alpha: 0.6 })
          if (i === cur) { a.node('k' + i, { tone: 'bad' }); const p = a.pos('k' + i); a.dot(p[0], p[1], 'bad', 2.2) }
        }
        const p = a.pos('k' + cur); a.pkt2(a.pos('q'), p, (f - cur), 'bad', 1)
      } else {
        a.cap(1); a.node('hash', { tone: 'ok' }); a.node('keys', { alpha: 0.3 })
        for (let i = 0; i < 8; i++) a.node('k' + i, { alpha: 0.12 })
        const u = ((t - 5.2) % 1.6) / 1.6
        a.pkt('q', 'hash', u * 1.5, 'ok', 1.5)
        if (u > 0.6) { const [x1, x2, y] = a.row('hash', 3); a.dot(x1, y, 'ok', 1.6); a.dot((x1 + x2) / 2, y, 'ok', 1.6); a.dot(x2, y, 'ok', 1.6) }
      }
    },
  },

  // Tyche — Lua injection: monitoring and evidence first, restart second
  inject: {
    nodes: [circ('atk', -2.35, 1.15, 0.28), box('con', -0.75, 1.15, 2.0, 0.65), box('svc', -0.75, -0.75, 1.7, 0.95), box('mon', 1.85, 0.2, 1.4, 0.6), box('ev', 1.85, -1.1, 1.4, 0.6)],
    edges: [['atk', 'con'], ['con', 'svc'], ['svc', 'mon'], ['svc', 'ev']],
    dur: 11.5, still: 10.5,
    play(a, t) {
      a.node('atk', { tone: 'bad' })
      if (t < 3.6) {
        a.cap(0); a.node('mon', { alpha: 0.25 }); a.node('ev', { alpha: 0.25 }); a.edge('svc', 'mon', 0.15); a.edge('svc', 'ev', 0.15)
        a.pkt('atk', 'con', seg(t, 0.3, 1.3), 'bad', 1.6); a.pkt('con', 'svc', seg(t, 1.3, 2.3), 'bad', 1.6)
        if (t > 1.3) a.node('con', { tone: 'bad' })
        if (t > 2.3) a.node('svc', { tone: 'bad' })
      } else if (t < 7.2) {
        a.cap(1); a.node('con', { tone: 'bad', alpha: 0.6 }); a.node('svc', { tone: 'bad' })
        a.pkt('svc', 'mon', seg(t, 3.7, 4.7), 'hot', 1.5); a.node('mon', t > 4.7 ? { tone: 'ok' } : { alpha: 0.25 })
        a.pkt('svc', 'ev', seg(t, 4.9, 5.9), 'hot', 1.5); a.node('ev', t > 5.9 ? { tone: 'ok' } : { alpha: 0.25 })
        if (t > 4.7) a.pkt('svc', 'mon', (t * 0.6) % 1, 'ok', 0.7)
      } else {
        a.cap(2); a.node('mon', { tone: 'ok' }); a.node('ev', { tone: 'ok' }); a.node('con', { alpha: 0.35 }); a.edge('atk', 'con', 0.15); a.edge('con', 'svc', 0.15)
        a.node('svc', t < 8.4 ? { alpha: 0.04 + Math.abs(Math.sin(t * 9)) * 0.1 } : { tone: 'ok' })
        a.pkt('svc', 'mon', (t * 0.6) % 1, 'ok', 0.7)
      }
    },
  },

  // Earlier roles — a timeline, oldest at the bottom
  timeline: {
    nodes: [0, 1, 2, 3, 4, 5].map((i) => circ('j' + i, -1.5, -1.9 + i * 0.76, 0.16, { labelPos: 'right' })),
    edges: [0, 1, 2, 3, 4].map((i) => ['j' + i, 'j' + (i + 1)]),
    dur: 8, still: 7.5,
    play(a, t) {
      const s = (t / 6.5) * 5
      for (let i = 0; i < 6; i++) {
        if (i < 5) a.pkt('j' + i, 'j' + (i + 1), s - i, 'hot', 1.5)
        a.node('j' + i, s >= i ? { tone: i === 5 ? 'hot' : 'ok' } : { alpha: 0.4 })
      }
    },
  },

  // AI workflow — main session delegates; a separate verifier signs off
  delegate: {
    nodes: [circ('main', 0, 1.2, 0.42, { labelPos: 'above' }), box('light', -1.9, -1.0, 1.7, 0.85), box('worker', 0, -1.0, 1.5, 0.85), box('ver', 1.9, -1.0, 1.7, 0.85)],
    edges: [['main', 'light'], ['main', 'worker'], ['worker', 'ver'], ['ver', 'main']],
    dur: 10.5, still: 9.8,
    play(a, t) {
      a.node('main', { tone: 'hot' })
      if (t < 2.7) {
        a.cap(0); a.pkt('main', 'light', seg(t, 0.2, 1.2), null, 1.5); a.pkt('light', 'main', seg(t, 1.5, 2.5), 'ok', 1.2)
        a.node('light', { tone: t > 1.2 ? 'ok' : null }); a.node('worker', { alpha: 0.4 }); a.node('ver', { alpha: 0.4 })
      } else if (t < 5.6) {
        a.cap(1); a.pkt('main', 'worker', seg(t, 2.8, 3.8), null, 1.5); a.node('light', { alpha: 0.4 }); a.node('ver', { alpha: 0.4 })
        if (t > 3.8) { a.node('worker', { tone: 'hot' }); const p = a.pos('worker'); a.dot(p[0] - 0.45 + ((t * 2.2) % 1) * 0.9, p[1] - 0.25, 'hot', 0.8) }
      } else {
        a.cap(2); a.node('light', { alpha: 0.4 }); a.node('worker', { alpha: t < 6.7 ? 1 : 0.5 })
        a.pkt('worker', 'ver', seg(t, 5.7, 6.7), 'hot', 1.6)
        a.node('ver', t > 8.1 ? { tone: 'ok' } : t > 6.7 ? { tone: 'hot' } : {})
        a.pkt('ver', 'main', seg(t, 8.1, 9.3), 'ok', 1.6)
        if (t > 9.3) a.node('main', { tone: 'ok' })
      }
    },
  },

  // AI workflow — rule files as a fence, memory-mcp as memory across sessions
  guard: {
    nodes: [box('rules', -0.85, -0.05, 2.9, 2.7, { dashed: true, labelPos: 'top' }), box('agent', -0.85, -0.2, 1.4, 0.7), box('mem', 2.05, -0.2, 1.3, 1.1)],
    edges: [['agent', 'mem', 0.7], ['mem', 'agent', 0.7]],
    dur: 10.5, still: 9.5,
    play(a, t) {
      if (t < 3.4) {
        a.cap(0); a.node('rules', { tone: 'hot' }); a.node('mem', { alpha: 0.35 }); a.edge('agent', 'mem', 0.1); a.edge('mem', 'agent', 0.1)
        const bounce = (u) => (u < 0 || u > 1 ? -1 : 1 - Math.abs(u * 2 - 1))
        const b1 = bounce(seg(t, 0.2, 1.7)), b2 = bounce(seg(t, 1.7, 3.2))
        if (b1 >= 0) a.dot(-1.55 - b1 * 0.7, -0.2, b1 > 0.9 ? 'bad' : 'hot', 1.5)
        if (b2 >= 0) a.dot(-0.85, -0.55 - b2 * 0.8, b2 > 0.9 ? 'bad' : 'hot', 1.5)
      } else if (t < 6.8) {
        a.cap(1); a.edge('mem', 'agent', 0.1)
        a.pkt('agent', 'mem', seg(t, 3.7, 5.1), 'hot', 1.8); a.node('mem', t > 5.1 ? { tone: 'ok' } : {}); a.node('agent', { alpha: t > 5.6 ? 0.3 : 1 })
      } else {
        a.cap(2); a.edge('agent', 'mem', 0.1); a.node('mem', { tone: 'ok' })
        a.pkt('mem', 'agent', seg(t, 7.2, 8.6), 'ok', 1.8); a.node('agent', t > 8.6 ? { tone: 'ok' } : { alpha: 0.45 })
      }
    },
  },

  // Contact — a connection opening between two ends
  handshake: {
    nodes: [circ('you', -2.5, -0.2, 0.26, { labelPos: 'below' }), circ('me', 2.5, -0.2, 0.26, { labelPos: 'below' })],
    edges: [['you', 'me', 2.5], ['me', 'you', 2.5]],
    dur: 6, still: 1.5, alpha: 0.8, box: { w: 5.7, h: 3.6, cy: -0.2 },
    play(a, t) {
      a.node('you', { tone: 'hot' }); a.node('me', { tone: 'ok' })
      for (let k = 0; k < 3; k++) { a.pkt('you', 'me', (t / 3 + k / 3) % 1, 'hot', 1.4); a.pkt('me', 'you', (t / 3 + k / 3 + 0.17) % 1, 'ok', 1.4) }
    },
  },
}
