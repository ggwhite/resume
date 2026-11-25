<!--
  The stage of each open-source exhibit. Nothing here is invented:
  - memory-mcp: the real CLI output, captured from the binary against a throwaway
    database (same commands as the repo's assets/demo-tour.tape).
  - Jarvis: the demo-session recording published in the repo README
    (docs/media/hero-tour.mp4, a scripted todo-api session), re-encoded smaller.
  - go-masker: the README quick start and what it prints, before and after masking.
  - 4x: role names from the README.
-->
<template>
  <div ref="root" class="demo" :class="'demo-' + kind">
    <!-- memory-mcp: one session stores, a later session gets it back -->
    <div v-if="kind === 'memory-mcp'" class="mem" role="img" :aria-label="t.termAlt">
      <div v-for="(w, wi) in wins" :key="wi" class="term" :class="'term-' + wi" aria-hidden="true">
        <p class="term-bar"><i></i><i></i><i></i><span>{{ t.termTitles[wi] }}</span></p>
        <pre><template v-for="(l, i) in w" :key="i"><span :class="[l.c, { off: l.n > shownN }]">{{ head(l) }}<span v-if="typing && l.n === shownN" class="caret"></span><span class="off">{{ l.text.slice(head(l).length) }}</span></span>{{ i < w.length - 1 ? '\n' : '' }}</template></pre>
        <p v-if="wi === 0" class="mem-link" :class="{ on: shownN > split }"><i></i><span>{{ t.termDb }}</span><i></i></p>
      </div>
    </div>

    <!-- Jarvis: the recorded demo session from the README -->
    <figure v-else-if="kind === 'jarvis'" class="reel">
      <div class="reel-frame">
        <video ref="video" muted loop playsinline preload="none" width="1200" height="702" :poster="poster" :aria-label="t.jarvisAlt"
          @play="playing = true" @pause="playing = false">
          <source v-if="armed" :src="webm" type="video/webm" />
          <source v-if="armed" :src="mp4" type="video/mp4" />
        </video>
      </div>
      <figcaption class="reel-cap">
        <span class="demo-note">{{ t.jarvisNote }}</span>
        <button type="button" class="reel-btn" :aria-pressed="playing" :aria-label="playing ? t.pause : t.play" @click="toggleReel">
          <span aria-hidden="true" :class="playing ? 'ico-pause' : 'ico-play'"></span>{{ playing ? t.pause : t.play }}
        </button>
      </figcaption>
    </figure>

    <!-- go-masker: the README quick start, and what it prints -->
    <div v-else-if="kind === 'go-masker'" class="mask">
      <pre class="mask-code" aria-hidden="true"><span class="k">type</span> User <span class="k">struct</span> {
<template v-for="f in fields" :key="f.tag">    {{ f.name.padEnd(8) }} <span class="k">string</span> <span class="tag">`mask:"{{ f.tag }}"`</span>{{ '\n' }}</template>}</pre>
      <div class="mask-out">
        <p v-for="(f, i) in fields" :key="f.tag" class="mask-row">
          <code>mask:"{{ f.tag }}"</code>
          <span class="mask-val" :class="{ on: masked }">{{ cells[i] }}</span>
        </p>
        <p class="mask-print" aria-hidden="true"><span>{{ masked ? 'fmt.Println(m.Format(u))' : 'fmt.Println(u)' }}</span>&amp;{{ '{' + cells.join(' ') + '}' }}</p>
        <button type="button" class="mask-toggle" :aria-pressed="masked" @click="toggleMask(true)">
          <span :class="{ on: !masked }">{{ t.raw }}</span><span :class="{ on: masked }">{{ t.masked }}</span>
        </button>
      </div>
    </div>

    <!-- 4x: four isolated roles, one FAIL sent back -->
    <div v-else-if="kind === '4x'" class="roles4" aria-hidden="true">
      <p class="roles4-row">
        <template v-for="(r, i) in roles" :key="r">
          <span class="role" :class="{ on: role === i, done: role > i, fail: fail && i === 2 }">{{ r }}</span>
          <i v-if="i < roles.length - 1" :class="{ on: role > i }"></i>
        </template>
      </p>
      <p class="roles4-note" :class="{ on: fail }">{{ t.fourxFail }}</p>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import poster from '@/assets/oss/jarvis-tour.webp'
import webm from '@/assets/oss/jarvis-tour.webm'
import mp4 from '@/assets/oss/jarvis-tour.mp4'

const props = defineProps({ kind: String, t: Object })
const root = ref(null)
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
let timer = 0, io = null, visible = false, alive = true
const later = (fn, ms) => { clearTimeout(timer); timer = setTimeout(() => alive && visible && fn(), ms) }

// ── memory-mcp: real output from a throwaway database (commands follow assets/demo-tour.tape) ──
const MEMO = 'EXPIRE resets the TTL on writes; SET ... KEEPTTL keeps it'
const wins = [
  [
    { c: 'cmd', text: `$ memory-mcp store -t til --project my-app "${MEMO}"` },
    { c: 'ok', text: 'Stored memory #1' },
    { c: 'cmd', text: '$ memory-mcp store -t feedback --project global "Prefer table-driven tests for Go code"' },
    { c: 'ok', text: 'Stored memory #2' },
  ],
  [
    { c: 'cmd', text: '$ memory-mcp search --compact KEEPTTL' },
    { c: 'out', text: `- #1 til my-app 2026-11-25 ${MEMO}` },
    { c: 'cmd', text: '$ memory-mcp get 1' },
    { c: 'out', text: '#1 [til] 2026-11-25  project:my-app' },
    { c: 'out', text: `  ${MEMO}` },
  ],
]
const lines = wins.flat()
lines.forEach((l, i) => { l.n = i })
const split = wins[0].length - 1
const shownN = ref(reduced ? lines.length : -1), chars = ref(0), typing = ref(false)
let typed = false
const head = (l) => (l.n === shownN.value && l.c === 'cmd' ? l.text.slice(0, chars.value) : l.text)
function type() { // plays once: commands are typed, their output lands whole
  const n = shownN.value + 1
  if (n >= lines.length) { shownN.value = lines.length; typing.value = false; return }
  const l = lines[n]
  shownN.value = n
  if (l.c !== 'cmd') { typing.value = false; return later(type, 380) }
  typing.value = true
  chars.value = 2
  const step = () => {
    chars.value += 3
    if (chars.value >= l.text.length) later(type, 460); else later(step, 24)
  }
  later(step, n === wins[0].length ? 900 : 300)
}

// ── Jarvis recording ──
const video = ref(null), armed = ref(false), playing = ref(false)
let userPaused = false
function play() {
  if (!armed.value) { armed.value = true; requestAnimationFrame(() => { video.value?.load(); video.value?.play().catch(() => {}) }) }
  else video.value?.play().catch(() => {})
}
function toggleReel() {
  if (playing.value) { userPaused = true; video.value.pause() } else { userPaused = false; play() }
}

// ── go-masker (README quick start; both printed lines are the program's real output) ──
const fields = [
  { name: 'Name', tag: 'name', raw: 'John Doe', out: 'J**n D**e' },
  { name: 'Email', tag: 'email', raw: 'john@gmail.com', out: 'joh****@gmail.com' },
  { name: 'Password', tag: 'password', raw: 'secret', out: '**************' },
  { name: 'Mobile', tag: 'mobile', raw: '0987654321', out: '0987***321' },
]
const masked = ref(reduced)
const cells = ref(fields.map((f) => (reduced ? f.out : f.raw)))
let userSet = false
function toggleMask(byUser) {
  if (byUser) { userSet = true; clearTimeout(timer) } // a click wins over the pending auto-toggle
  masked.value = !masked.value
  const target = fields.map((f) => (masked.value ? f.out : f.raw))
  if (reduced) { cells.value = target; return }
  let n = 0
  const run = () => {
    n++
    cells.value = target.map((s) => Array.from(s).map((ch, i) => (i < n ? ch : '*#%@x'[(i + n) % 5])).join(''))
    if (n < 18 && alive) setTimeout(run, 28); else cells.value = target
  }
  run()
  if (!userSet) later(() => toggleMask(false), 3200)
}

// ── 4x roles (names from the README) ──
const roles = ['Designer', 'Coder', 'Reviewer', 'Tester', 'Accept']
const role = ref(reduced ? 5 : -1), fail = ref(false)
let failed = false
function loop() {
  if (role.value === 2 && !failed) { failed = true; fail.value = true; return later(() => { fail.value = false; role.value = 1; loop() }, 1500) }
  if (role.value >= 5) { failed = false; role.value = -1; return later(loop, 600) }
  role.value++
  later(loop, role.value === 5 ? 2200 : 950)
}

function begin() {
  if (reduced) return
  if (props.kind === 'memory-mcp' && !typed) { typed = true; later(type, 500) }
  if (props.kind === 'memory-mcp' && typed && shownN.value < lines.length) later(type, 300)
  if (props.kind === 'jarvis' && !userPaused) play()
  if (props.kind === 'go-masker' && !userSet) later(() => toggleMask(false), 1200)
  if (props.kind === '4x') { role.value = -1; failed = false; fail.value = false; loop() }
}

onMounted(() => {
  io = new IntersectionObserver(([e]) => {
    const was = visible
    visible = e.isIntersecting
    if (visible && !was) begin()
    else if (!visible) { clearTimeout(timer); video.value?.pause() }
  }, { threshold: 0.25 })
  io.observe(root.value)
})
onBeforeUnmount(() => { alive = false; clearTimeout(timer); io?.disconnect() })
</script>
