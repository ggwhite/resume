<!--
  Small live demos inside the open-source cards. Everything shown comes from each
  repo's README (commands, example values, tab and role names); the Jarvis pane is
  labelled as an illustration because its timers are not real data.
-->
<template>
  <div ref="root" class="demo" :class="'demo-' + kind">
    <!-- memory-mcp: the README quick start, typed out -->
    <div v-if="kind === 'memory-mcp'" class="term" aria-hidden="true">
      <p class="term-bar"><i></i><i></i><i></i><span>{{ t.termTitle }}</span></p>
      <pre><template v-for="(l, i) in shown" :key="i"><span :class="l.c">{{ l.text }}</span>{{ '\n' }}</template><span class="caret"></span></pre>
    </div>

    <!-- Jarvis: the Now tab, sketched -->
    <div v-else-if="kind === 'jarvis'" class="hud" aria-hidden="true">
      <p class="hud-tabs"><b>Now</b><span>Tasks</span><span>Changes</span><span>Stats</span><span>Lessons</span><span>Fleet</span></p>
      <p class="hud-head"><span v-for="c in t.jarvisCols" :key="c">{{ c }}</span></p>
      <p v-for="r in rows" :key="r.id" class="hud-row" :class="'s' + r.state">
        <span><b>{{ r.id }}</b> Explore</span>
        <span class="hud-state"><i></i>{{ t.jarvisStates[r.state] }}</span>
        <span class="hud-time">{{ r.clock }}</span>
      </p>
      <p class="demo-note">{{ t.jarvisNote }}</p>
    </div>

    <!-- go-masker: the README's own example values -->
    <div v-else-if="kind === 'go-masker'" class="mask">
      <p v-for="(f, i) in fields" :key="f.tag" class="mask-row">
        <code>mask:"{{ f.tag }}"</code>
        <span class="mask-val" :class="{ on: masked }">{{ cells[i] }}</span>
      </p>
      <button type="button" class="mask-toggle" :aria-pressed="masked" @click="toggleMask(true)">
        <span :class="{ on: !masked }">{{ t.raw }}</span><span :class="{ on: masked }">{{ t.masked }}</span>
      </button>
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
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'

const props = defineProps({ kind: String, t: Object })
const root = ref(null)
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
let timer = 0, io = null, visible = false, alive = true
const later = (fn, ms) => { clearTimeout(timer); timer = setTimeout(() => alive && visible && fn(), ms) }

// ── memory-mcp terminal (commands from the README quick start) ──
const script = [
  { c: 'cmd', text: '$ go install github.com/ggwhite/memory-mcp@latest' },
  { c: 'cmd', text: '$ memory-mcp store -t til "SQLite trigram tokenizer enables CJK full-text search"' },
  { c: 'cmd', text: '$ memory-mcp search "trigram"' },
  { c: 'note', text: '# ' + props.t.termNotes[0] },
  { c: 'cmd', text: '$ claude mcp add memory -s user -- memory-mcp serve' },
  { c: 'note', text: '# ' + props.t.termNotes[1] },
]
const shown = ref(reduced ? script : [])
function type(li = 0, ci = 0) {
  if (li >= script.length) return later(() => { shown.value = []; type() }, 5200)
  const l = script[li]
  if (ci === 0) shown.value = [...shown.value, { c: l.c, text: '' }]
  const step = l.c === 'note' ? l.text.length : ci + 2
  shown.value[li].text = l.text.slice(0, step)
  if (step >= l.text.length) later(() => type(li + 1, 0), l.c === 'note' ? 700 : 420)
  else later(() => type(li, step), 26)
}

// ── Jarvis rows ──
const rows = reactive([{ id: 'MK-1', state: 0, clock: '0:00', end: 9 }, { id: 'MK-2', state: 0, clock: '0:00', end: 14 }, { id: 'MK-3', state: 0, clock: '0:00', end: 99 }])
let tick = 0
function hud() {
  tick = tick >= 24 ? 0 : tick + 1
  for (const r of rows) {
    const s = Math.min(tick, r.end)
    r.clock = `0:${String(s).padStart(2, '0')}`
    r.state = tick >= r.end ? 1 : r.end === 99 && tick >= 17 ? 2 : 0
  }
  later(hud, 1000)
}

// ── go-masker (values from the README quick start) ──
const fields = [
  { tag: 'name', raw: 'John Doe', out: 'J**n D**e' },
  { tag: 'email', raw: 'john@gmail.com', out: 'joh****@gmail.com' },
  { tag: 'password', raw: 'secret', out: '**************' },
  { tag: 'mobile', raw: '0987654321', out: '0987***321' },
]
const masked = ref(reduced)
const cells = ref(fields.map((f) => (reduced ? f.out : f.raw)))
let userSet = false
function toggleMask(byUser) {
  if (byUser) userSet = true
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
  if (props.kind === 'memory-mcp') { shown.value = []; type() }
  if (props.kind === 'jarvis') hud()
  if (props.kind === 'go-masker' && !userSet) later(() => toggleMask(false), 1200)
  if (props.kind === '4x') { role.value = -1; failed = false; fail.value = false; loop() }
}

onMounted(() => {
  io = new IntersectionObserver(([e]) => {
    const was = visible
    visible = e.isIntersecting
    if (visible && !was) begin(); else if (!visible) clearTimeout(timer)
  }, { threshold: 0.25 })
  io.observe(root.value)
})
onBeforeUnmount(() => { alive = false; clearTimeout(timer); io?.disconnect() })
</script>
