// Story scenes. Each scene is a small diagram (nodes + edges, drawn by the particle
// field) and a looping script that moves packets through it and changes node states,
// so the picture acts out the paragraph next to it — in the same order the text tells
// it: the situation first, then what went wrong, then the fix.
// Label and caption text lives in src/data/*.js under site.scenes[<key>].
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

  // Hero — the particles spell the stack, one word at a time (words come from data)
  words: { nodes: [], edges: [], dur: 1, words: true, every: 2.4, box: { w: 5.6, h: 2.6, cy: 0 }, play() {} },

  // Story 1 — a claim-once flow: check, slow eligibility query, grant. Repeated
  // requests all pass the first check while the query is slow; an atomic marker fixes it.
  race: {
    nodes: [
      circ('req', -2.45, -0.1, 0.27, { labelPos: 'below' }),
      box('c1', -1.05, -0.1, 1.3, 0.8), box('c2', 0.55, -0.1, 1.4, 0.8), box('grant', 2.1, -0.1, 1.1, 0.8),
      box('mark', -1.05, 1.35, 1.5, 0.55),
    ],
    edges: [['req', 'c1'], ['c1', 'c2'], ['c2', 'grant'], ['c1', 'mark']],
    dur: 17, still: 16,
    play(a, t) {
      const flow = (u, tone, wait) => { // one request: req → c1 → (waits in c2) → grant
        a.pkt('req', 'c1', seg(u, 0, 0.7), tone, 1.5); a.pkt('c1', 'c2', seg(u, 0.7, 1.4), tone, 1.5)
        if (u > 1.4 && u < 1.4 + wait) { const p = a.pos('c2'); a.dot(p[0] - 0.3 + ((u * 1.7) % 1) * 0.6, p[1] - 0.22, tone || 'hot', 1.1) }
        a.pkt('c2', 'grant', seg(u, 1.4 + wait, 2.1 + wait), tone, 1.5)
      }
      if (t < 4) { // situation: the normal flow
        a.cap(0); a.node('mark', { alpha: 0 }); a.edge('c1', 'mark', 0)
        flow(t - 0.4, 'ok', 0.3)
        if (t > 2.8) a.node('grant', { tone: 'ok', sub: '× 1' })
      } else if (t < 10.5) { // problem: step 2 is slow, a second request passes step 1 meanwhile
        const u = t - 4
        a.cap(1); a.node('mark', { alpha: 0 }); a.edge('c1', 'mark', 0)
        a.node('c2', { tone: u > 1.4 && u < 4.6 ? 'hot' : null })
        flow(u - 0.2, 'bad', 2.6); flow(u - 1.5, 'bad', 1.6)
        if (u > 4.9) a.node('grant', { tone: 'bad', sub: u > 5.2 ? '× 2' : '× 1' })
      } else { // fix: check-and-mark in one atomic step
        const u = t - 10.5
        a.cap(2)
        a.pkt('req', 'c1', seg(u, 0.2, 0.9), null, 1.5)
        a.pkt('c1', 'mark', seg(u, 0.9, 1.4), 'ok', 1.2); a.node('mark', { tone: u > 1.4 ? 'ok' : null })
        a.pkt('c1', 'c2', seg(u, 1.0, 1.7), 'ok', 1.5)
        if (u > 1.7 && u < 3.6) { a.node('c2', { tone: 'hot' }); const p = a.pos('c2'); a.dot(p[0] - 0.3 + ((u * 1.7) % 1) * 0.6, p[1] - 0.22, 'ok', 1.1) }
        a.pkt('req', 'c1', seg(u, 1.6, 2.3), null, 1.5); a.pkt('c1', 'req', seg(u, 2.3, 3.1), 'bad', 1.5) // second request: rejected
        a.pkt('c2', 'grant', seg(u, 3.6, 4.3), 'ok', 1.5)
        if (u > 4.3) a.node('grant', { tone: 'ok', sub: '× 1' })
      }
    },
  },

  // Story 2 — each day's new collection had no index; a scheduler now builds it ahead
  index: {
    nodes: [
      circ('query', -2.35, -0.6, 0.28, { labelPos: 'below' }), box('idx', -0.95, 0.35, 1.5, 0.55), box('sched', -0.95, 1.55, 1.6, 0.6),
      box('coll', 1.3, -0.1, 2.3, 3.4, { grid: 10, labelPos: 'top' }),
    ],
    edges: [['query', 'coll', -0.5], ['query', 'idx'], ['idx', 'coll'], ['sched', 'idx']],
    dur: 16, still: 15,
    play(a, t) {
      if (t < 6.5) { // situation + problem: no index, every record is read
        a.cap(t < 1.6 ? 0 : 1)
        a.node('idx', { alpha: 0 }); a.node('sched', { alpha: 0 }); a.edge('query', 'idx', 0); a.edge('idx', 'coll', 0); a.edge('sched', 'idx', 0)
        if (t > 1.6) {
          a.pkt('query', 'coll', ((t - 1.6) * 0.8) % 1, 'bad')
          const f = clamp(seg(t, 2, 6.2)) * 10, cur = Math.min(9, Math.floor(f))
          for (let i = 0; i <= cur; i++) {
            const [x1, x2, y] = a.row('coll', i)
            if (i < cur) { a.dot(x1, y, 'bad', 0.9); a.dot((x1 + x2) / 2, y, 'bad', 0.9); a.dot(x2, y, 'bad', 0.9) }
            else a.dot(x1 + (x2 - x1) * (f - cur), y, 'bad', 2)
          }
          a.node('coll', { tone: 'bad' })
        }
      } else if (t < 10) { // fix: the scheduler builds the index before the day starts
        a.cap(2); a.edge('query', 'coll', 0.08); a.edge('query', 'idx', 0.2); a.edge('idx', 'coll', 0.2)
        a.node('sched', { tone: 'hot' }); a.pkt('sched', 'idx', seg(t, 6.9, 8.1), 'hot', 1.8)
        a.node('idx', { alpha: t > 8.1 ? 1 : 0.12, tone: t > 8.1 ? 'ok' : null })
      } else { // outcome: queries go through the index
        a.cap(3); a.node('idx', { tone: 'ok' }); a.node('sched', { alpha: 0.5 }); a.edge('query', 'coll', 0.08); a.node('coll', { alpha: 0.6 })
        const u = (((t - 10) % 1.8) / 1.8) * 2.4
        a.pkt('query', 'idx', u, 'ok'); a.pkt('idx', 'coll', u - 1, 'ok')
        if (u > 1.9) for (const i of [3, 6]) { const [x1, x2, y] = a.row('coll', i); a.dot(x1 + (x2 - x1) * 0.4, y, 'ok', 2) }
      }
    },
  },

  // Story 3 — session state in Redis is edited directly; app-layer checks fail once
  // the secret is exposed; the state moves into process memory behind Docker isolation
  tamper: {
    nodes: [
      circ('atk', -2.35, 1.3, 0.28), box('redis', -0.6, 1.3, 1.5, 0.75), box('val', -0.6, -0.4, 1.9, 0.7),
      box('docker', 1.8, -0.5, 1.75, 2.5, { dashed: true, labelPos: 'top' }), box('svc', 1.8, -0.2, 1.35, 0.6), box('mem', 1.8, -1.15, 1.35, 0.55),
    ],
    edges: [['atk', 'redis'], ['redis', 'val'], ['val', 'svc'], ['redis', 'mem', 0.9]],
    dur: 17, still: 16,
    play(a, t) {
      if (t < 4) { // situation: the service keeps session state in Redis
        a.cap(0); a.node('atk', { alpha: 0 }); a.edge('atk', 'redis', 0); a.node('docker', { alpha: 0 }); a.node('mem', { alpha: 0 }); a.edge('redis', 'mem', 0)
        a.node('val', { alpha: 0.25 })
        const u = ((t % 2) / 2) * 2
        a.pkt('redis', 'val', u, 'ok', 1.2); a.pkt('val', 'svc', u - 1, 'ok', 1.2)
        a.node('redis', { tone: 'ok' }); a.node('svc', { tone: 'ok' })
      } else if (t < 10.5) { // problem: direct edits pass validation
        const u2 = t - 4
        a.cap(1); a.node('atk', { tone: 'bad' }); a.node('docker', { alpha: 0 }); a.node('mem', { alpha: 0 }); a.edge('redis', 'mem', 0)
        const u = ((u2 % 3.2) / 3.2) * 3.4
        a.pkt('atk', 'redis', u, 'bad', 1.5); a.pkt('redis', 'val', u - 1, 'bad', 1.5); a.pkt('val', 'svc', u - 2, 'bad', 1.5)
        if (u2 > 1) a.node('redis', { tone: 'bad' })
        a.node('val', { tone: u2 > 2 ? 'bad' : 'hot' })
        if (u2 > 2.9) a.node('svc', { tone: 'bad' })
      } else { // fix: state leaves Redis for process memory; Docker isolates the environment
        const t2 = t - 10.5
        a.cap(2); a.node('atk', { tone: 'bad' }); a.node('docker', { tone: 'ok' }); a.node('mem', { tone: t2 > 1.5 ? 'ok' : 'hot' }); a.node('svc', { tone: 'ok' })
        a.pkt('redis', 'mem', seg(t2, 0.2, 1.5), 'hot', 2)
        a.node('redis', { alpha: 0.4 }); a.node('val', { alpha: 0.2 }); a.edge('redis', 'val', 0.1); a.edge('val', 'svc', 0.1)
        a.edge('redis', 'mem', t2 < 1.6 ? 1 : 0.12)
        a.pkt('atk', 'redis', (t2 % 2.2) / 2.2, 'bad', 1.2)
      }
    },
  },

  // Story 4 — bare metal → Docker, following the cutover runbook
  migrate: {
    nodes: [
      box('old', -1.75, 0.55, 1.75, 2.0, { labelPos: 'top' }), box('s1', -1.75, 0.6, 1.3, 0.45), box('s2', -1.75, -0.05, 1.3, 0.45),
      box('neu', 1.75, 0.55, 1.75, 2.0, { dashed: true, labelPos: 'top' }), box('c1', 1.75, 0.6, 1.3, 0.45), box('c2', 1.75, -0.05, 1.3, 0.45),
      box('f', -1.85, -1.55, 1.5, 0.5), box('sy', 0, -1.55, 1.5, 0.5), box('op', 1.85, -1.55, 1.6, 0.5),
    ],
    edges: [['s1', 'c1'], ['s2', 'c2'], ['f', 'sy'], ['sy', 'op']],
    dur: 15, still: 14,
    play(a, t) {
      const step = t < 3.6 ? -1 : t < 6.2 ? 0 : t < 10.6 ? 1 : 2
      a.cap(step + 1)
      const traffic = (x0, tone) => { for (let k = 0; k < 3; k++) { const u = (t * 0.7 + k / 3) % 1; a.dot(x0 - 0.55 + k * 0.55, 2.35 - u * 0.75, tone, 1.2) } }
      a.node('f', step < 0 ? { alpha: 0.3 } : { tone: step > 0 ? 'ok' : 'hot' })
      a.node('sy', step === 1 ? { tone: 'hot' } : step > 1 ? { tone: 'ok' } : { alpha: 0.3 })
      a.node('op', step === 2 ? { tone: t > 13 ? 'ok' : 'hot' } : { alpha: 0.3 })
      const v = clamp(seg(t, 6.2, 10))
      a.node('neu', { alpha: step < 0 ? 0.15 : 1, tone: step === 2 ? 'ok' : null })
      for (const c of ['c1', 'c2']) a.node(c, { alpha: 0.06 + v * 0.94, tone: step === 2 ? 'ok' : null })
      a.edge('s1', 'c1', step === 1 ? 1 : 0.12); a.edge('s2', 'c2', step === 1 ? 1 : 0.12)
      if (step < 0) { traffic(-1.75, 'ok'); a.node('s1', { tone: 'ok' }); a.node('s2', { tone: 'ok' }) }
      if (step === 0) a.node('old', { tone: 'hot' })
      if (step === 1) for (let k = 0; k < 3; k++) { a.pkt('s1', 'c1', ((t - 6.2) * 0.6 + k / 3) % 1, 'hot'); a.pkt('s2', 'c2', ((t - 6.2) * 0.6 + k / 3 + 0.17) % 1, 'hot') }
      if (step === 2) { for (const o of ['old', 's1', 's2']) a.node(o, { alpha: 0.25 }); traffic(1.75, 'ok') }
    },
  },

  // Story 5 — three platforms on three stacks; a unified gRPC backend built to a POC,
  // evaluated, and stopped
  poc: {
    nodes: [
      box('a', -2.0, 1.25, 1.35, 0.7), box('b', -2.0, 0.1, 1.35, 0.7), box('c', -2.0, -1.05, 1.35, 0.7),
      box('poc', 0.2, 0.1, 1.8, 1.5, { dashed: true }), box('live', 2.2, 0.1, 1.0, 0.9),
    ],
    edges: [['a', 'poc'], ['b', 'poc'], ['c', 'poc'], ['poc', 'live']],
    dur: 15, still: 14,
    play(a, t) {
      const src = ['a', 'b', 'c']
      if (t < 3.6) { // situation: three separate stacks
        a.cap(0); a.node('poc', { alpha: 0 }); a.node('live', { alpha: 0 }); a.edge('poc', 'live', 0)
        src.forEach((s, k) => { a.edge(s, 'poc', 0); a.node(s, { tone: Math.floor(t / 1.2) % 3 === k ? 'hot' : null }) })
      } else if (t < 9) { // what I built: one backend, to a working POC
        a.cap(1)
        src.forEach((s, k) => a.pkt(s, 'poc', ((t - 3.6) * 0.55 + k / 3) % 1))
        a.node('poc', { tone: 'hot', alpha: clamp(seg(t, 3.6, 4.6)) }); a.edge('poc', 'live', 0.3); a.node('live', { alpha: 0.6 })
      } else if (t < 10.6) {
        a.cap(1); a.node('poc', { tone: 'hot' })
        a.pkt('poc', 'live', seg(t, 9, 10.6) * 0.5, 'hot', 1.4)
      } else { // the decision: stopped before production
        a.cap(2)
        a.pkt('poc', 'live', 0.5, 'bad', 2.2 + Math.sin(t * 6) * 0.4)
        a.edge('poc', 'live', 0.1); a.node('poc', { tone: 'hot', alpha: 0.75 }); a.node('live', { tone: 'ok' })
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
        a.pkt2(a.pos('q'), a.pos('k' + cur), f - cur, 'bad', 1)
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
