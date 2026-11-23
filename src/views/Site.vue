<template>
  <div class="site" :class="{ 'no-gl': !gl, 'is-zh': locale === 'zh-tw' }" @pointermove="onGlow">
    <canvas ref="fieldEl" class="field" aria-hidden="true"></canvas>
    <div ref="labelEl" class="gl-labels" aria-hidden="true"></div>
    <div class="progress" aria-hidden="true"><i ref="barEl"></i></div>

    <header class="nav" :class="{ scrolled }">
      <a class="nav-mark" href="#top" @click.prevent="go('top')">{{ profile.name }}</a>
      <nav class="nav-links" :aria-label="locale === 'zh-tw' ? '區塊導覽' : 'Sections'">
        <a v-for="id in sectionIds" :key="id" :href="'#' + id" :class="{ on: active === id }" @click.prevent="go(id)">{{ s.nav[id] }}</a>
      </nav>
      <div class="nav-side">
        <router-link class="nav-lang" :to="s.langSwitch.to">{{ s.langSwitch.label }}</router-link>
        <a class="btn btn-solid" :href="data.pdf" target="_blank" rel="noopener">PDF</a>
      </div>
    </header>

    <main id="top">
      <!-- 0 · Hero -->
      <section class="hero" data-scene="0">
        <div class="wrap hero-grid">
          <div class="hero-copy">
            <p class="kicker"><span>{{ profile.position }}</span><span class="sep"></span><span>{{ s.hero.stack }}</span></p>
            <h1 class="name" :aria-label="s.hero.nameLines.join(' ')">
              <span v-for="(line, li) in nameChars" :key="li" class="name-line" :class="{ outline: li === 1 }" aria-hidden="true">
                <span v-for="(c, ci) in line" :key="ci" class="ch" :style="{ '--i': li * 5 + ci }">{{ c }}</span>
              </span>
            </h1>
            <p class="alt-name">{{ s.hero.altName }}</p>
            <p class="lede">{{ s.hero.lede }}</p>
            <div class="cta">
              <a class="btn btn-solid" :href="data.pdf" target="_blank" rel="noopener">{{ data.labels.download }} <span aria-hidden="true">↓</span></a>
              <a class="btn" :href="profile.github" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a>
              <a class="btn" :href="profile.linkedin" target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <figure class="portrait" ref="portraitWrap" @pointermove="tilt" @pointerleave="untilt">
            <div class="portrait-card" :class="{ live: portraitLive }">
              <img :src="profile.photo" :alt="s.hero.photoAlt" width="880" height="1100" />
              <canvas ref="portraitEl" aria-hidden="true"></canvas>
            </div>
          </figure>
        </div>
        <div class="wrap">
          <dl class="stats">
            <div v-for="(st, i) in s.stats" :key="i" class="stat rv" :style="{ '--d': i * 90 + 'ms' }">
              <dt><span class="stat-num" :data-count="st.num" :data-dec="st.decimals || 0">{{ st.prefix }}<b>{{ st.num }}</b>{{ st.suffix }}</span> <span class="stat-unit">{{ st.unit }}</span></dt>
              <dd>{{ st.label }}</dd>
            </div>
          </dl>
        </div>
        <a class="scroll-cue" href="#systems" @click.prevent="go('systems')"><i></i>{{ s.hero.scroll }}</a>
      </section>

      <!-- 1 · Systems -->
      <section id="systems" class="sec sec-left" data-scene="1">
        <div class="wrap">
          <header class="sec-head rv">
            <p class="idx">01</p>
            <h2>{{ s.sections.systems.title }}</h2>
            <p class="sec-sub">{{ s.sections.systems.sub }}</p>
          </header>
          <ol class="caps">
            <li v-for="(c, i) in data.competencies" :key="c.title" class="cap rv">
              <span class="cap-n">{{ String(i + 1).padStart(2, '0') }}</span>
              <div>
                <h3>{{ c.title }}</h3>
                <p>{{ c.description }}</p>
                <ul v-if="c.tech" class="tags"><li v-for="t in c.tech.split(', ')" :key="t">{{ t }}</li></ul>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <!-- 2 · Experience -->
      <section id="work" class="sec sec-work" data-scene="2">
        <div class="wrap">
          <header class="sec-head rv">
            <p class="idx">02</p>
            <h2>{{ s.sections.work.title }}</h2>
            <p class="sec-sub">{{ s.sections.work.sub }}</p>
          </header>
          <article v-for="(job, ji) in data.experience" :key="job.id" class="job" :class="{ lead: ji === 0 }">
            <header class="job-head rv">
              <p class="job-date">{{ job.start }} — {{ job.end }}</p>
              <h3>{{ job.company }}</h3>
              <p class="job-pos">{{ job.position }}</p>
            </header>
            <div class="tiles">
              <section v-for="(items, title) in job.description" :key="title" class="tile glow rv">
                <h4>{{ title }}</h4>
                <ul v-if="Array.isArray(items)"><li v-for="it in items" :key="it">{{ it }}</li></ul>
              </section>
            </div>
          </article>
        </div>
      </section>

      <!-- 3 · AI workflow -->
      <section id="ai" class="sec sec-right" data-scene="3">
        <div class="wrap">
          <header class="sec-head rv">
            <p class="idx">03</p>
            <h2>{{ s.sections.ai.title }}</h2>
          </header>
          <blockquote class="quote rv">{{ s.sections.ai.quote }}</blockquote>
          <p class="quote-sub rv">{{ s.sections.ai.sub }}</p>
          <ul class="roles" :aria-label="s.sections.ai.title">
            <li v-for="(n, i) in s.scene.ai" :key="n.name" class="rv" :style="{ '--d': i * 70 + 'ms' }"><b>{{ n.name }}</b><span>{{ n.role }}</span></li>
          </ul>
          <p class="ai-intro rv">{{ data.aiWorkflow.intro }}</p>
          <ol class="points">
            <li v-for="(p, i) in aiPoints" :key="i" class="rv">
              <span class="cap-n">{{ String(i + 1).padStart(2, '0') }}</span>
              <p><b>{{ p.head }}</b>{{ p.body }}</p>
            </li>
          </ol>
        </div>
      </section>

      <!-- 4 · Open source -->
      <section id="oss" class="sec" data-scene="4">
        <div class="wrap">
          <header class="sec-head rv">
            <p class="idx">04</p>
            <h2>{{ s.sections.oss.title }}</h2>
          </header>
          <div class="repos">
            <article v-for="p in ossProjects" :key="p.id" class="repo glow rv">
              <header>
                <p class="repo-meta">
                  <span>{{ p.repo.lang }}</span>
                  <span v-if="p.repo.stars" class="star">★ {{ p.repo.stars }} {{ s.sections.oss.stars }}</span>
                  <span v-if="p.repo.archived" class="arch">{{ s.sections.oss.archived }}</span>
                  <span class="repo-date">{{ p.start }} — {{ p.end }}</span>
                </p>
                <h3><a :href="p.repo.url" target="_blank" rel="noopener">{{ p.title }}<span aria-hidden="true"> ↗</span></a></h3>
                <p class="repo-tag">{{ p.tagline }}</p>
              </header>
              <ul><li v-for="d in p.description" :key="d">{{ d }}</li></ul>
            </article>
          </div>
          <h3 class="mini-head rv">{{ s.sections.oss.freelance }}</h3>
          <div class="gigs">
            <article v-for="p in gigs" :key="p.id" class="gig rv">
              <p class="job-date">{{ p.start }} — {{ p.end }}</p>
              <h4>{{ p.name }}</h4>
              <ul><li v-for="d in p.description" :key="d">{{ d }}</li></ul>
            </article>
          </div>
        </div>
      </section>

      <!-- 5 · Toolbox -->
      <section id="skills" class="sec sec-left sec-skills" data-scene="5">
        <div class="marquee" aria-hidden="true">
          <div class="marquee-track"><span v-for="(w, i) in marquee.concat(marquee)" :key="i">{{ w }}</span></div>
        </div>
        <div class="wrap">
          <header class="sec-head rv">
            <p class="idx">05</p>
            <h2>{{ s.sections.skills.title }}</h2>
          </header>
          <div class="kit">
            <div class="kit-col rv">
              <h3>{{ data.labels.programming }}</h3>
              <dl>
                <div v-for="(libs, lang) in profile.programming" :key="lang">
                  <dt>{{ lang }}</dt>
                  <dd>{{ libs.join(' · ') }}</dd>
                </div>
              </dl>
            </div>
            <div class="kit-col rv">
              <h3>{{ data.labels.tools }}</h3>
              <dl>
                <div v-for="(list, group) in profile.tools" :key="group">
                  <dt>{{ group }}</dt>
                  <dd>{{ list.join(' · ') }}</dd>
                </div>
              </dl>
            </div>
          </div>
          <div class="edu rv">
            <h3>{{ data.labels.education }}</h3>
            <p v-for="e in data.education" :key="e.id"><b>{{ e.degree }}</b> — {{ e.school }} <span class="job-date">{{ e.start }} — {{ e.end }}</span></p>
          </div>
        </div>
      </section>

      <!-- 6 · Contact -->
      <section id="contact" class="sec contact" data-scene="6">
        <div class="wrap">
          <p class="idx rv">06</p>
          <h2 class="rv">{{ s.sections.contact.title }}</h2>
          <a class="mail rv" :href="'mailto:' + profile.email">{{ profile.email }}</a>
          <ul class="contact-list rv">
            <li><a :href="'tel:' + profile.phone.replace(/\s/g, '')">{{ profile.phone }}</a></li>
            <li><a :href="profile.github" target="_blank" rel="noopener">github.com/ggwhite</a></li>
            <li><a :href="profile.linkedin" target="_blank" rel="noopener">linkedin.com/in/white-chang</a></li>
            <li><a :href="data.pdf" target="_blank" rel="noopener">{{ data.labels.download }}</a></li>
          </ul>
        </div>
        <footer class="foot">
          <span>{{ profile.name }} · {{ s.sections.contact.sub }}</span>
          <a href="https://github.com/ggwhite/resume" target="_blank" rel="noopener">Vue · three.js · github.com/ggwhite/resume</a>
        </footer>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import en from '@/data/en'
import zhTw from '@/data/zh-tw'
import { repos } from '@/data/shared'
import { AI_NODES, LAYER_Y } from '@/gl/shapes'
import '@/styles/site.css'

const props = defineProps({ locale: { type: String, default: 'en' } })
const data = computed(() => (props.locale === 'zh-tw' ? zhTw : en))
const s = computed(() => data.value.site)
const profile = computed(() => data.value.profile)
const sectionIds = ['systems', 'work', 'ai', 'oss', 'skills', 'contact']

const nameChars = computed(() => s.value.hero.nameLines.map((l) => Array.from(l)))
// "Heading: body" / "標題：內容" → bold heading + body
const aiPoints = computed(() => data.value.aiWorkflow.points.map((p) => {
  const m = p.match(/^(.+?[:：])\s*(.*)$/s)
  return m ? { head: m[1] + ' ', body: m[2] } : { head: '', body: p }
}))
const ossProjects = computed(() => data.value.project.filter((p) => repos[p.id]).map((p) => {
  const [title, ...rest] = p.name.split(' — ')
  return { ...p, title, tagline: rest.join(' — '), repo: repos[p.id] }
}))
const gigs = computed(() => data.value.project.filter((p) => !repos[p.id]))
const marquee = computed(() => [
  ...Object.keys(profile.value.programming).slice(0, 4),
  ...profile.value.tools['Data Store'].slice(0, 3), 'gRPC', 'RabbitMQ', 'Kafka',
  ...profile.value.tools['DevOps'].slice(0, 2), 'Skynet', 'Claude Code', 'MCP',
])

const fieldEl = ref(null), labelEl = ref(null), barEl = ref(null), portraitEl = ref(null), portraitWrap = ref(null)
const gl = ref(true), portraitLive = ref(false), scrolled = ref(false), active = ref('')
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
let field = null, disposePortrait = null, io = null, spy = null, alive = true

function go(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
}
function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  scrolled.value = window.scrollY > 40
  if (barEl.value) barEl.value.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
}
function onGlow(e) {
  const el = e.target.closest?.('.glow')
  if (!el) return
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', e.clientX - r.left + 'px')
  el.style.setProperty('--my', e.clientY - r.top + 'px')
}
function tilt(e) {
  if (reduced) return
  const r = portraitWrap.value.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
  portraitWrap.value.style.setProperty('--rx', -y * 10 + 'deg')
  portraitWrap.value.style.setProperty('--ry', x * 12 + 'deg')
}
function untilt() {
  portraitWrap.value.style.setProperty('--rx', '0deg')
  portraitWrap.value.style.setProperty('--ry', '0deg')
}

function countUp(el) {
  const b = el.querySelector('b'), to = +el.dataset.count, dec = +el.dataset.dec
  if (reduced) return
  const t0 = performance.now()
  const step = (now) => {
    const k = Math.min(1, (now - t0) / 1400), e = 1 - Math.pow(1 - k, 4)
    b.textContent = (to * e).toFixed(dec)
    if (k < 1 && alive) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch (e) { return false }
}
const label = (name, role) => `<b>${name}</b>${role ? `<span>${role}</span>` : ''}`

onMounted(async () => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      e.target.classList.add('in')
      const n = e.target.querySelector('.stat-num')
      if (n) countUp(n)
      io.unobserve(e.target)
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 })
  document.querySelectorAll('.rv').forEach((el) => io.observe(el))

  spy = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) active.value = e.target.id
  }, { rootMargin: '-45% 0px -45% 0px' })
  sectionIds.forEach((id) => spy.observe(document.getElementById(id)))

  // three.js is loaded after first paint so the text never waits for it
  await nextTick()
  if (!hasWebGL()) { gl.value = false; return } // static CSS background instead; three.js is never downloaded
  try {
    const [{ createField }, { createPortrait }] = await Promise.all([import('@/gl/field'), import('@/gl/portrait')])
    if (!alive) return
    const sc = s.value.scene
    field = createField(fieldEl.value, {
      reduced,
      labelLayer: labelEl.value,
      labels: {
        1: sc.systems.map((t, i) => ({ pos: [1.72, LAYER_Y[i], 0], html: label(t) })),
        2: [{ pos: [1.12, -1.9, 0], html: label(sc.work[0]) }, { pos: [1.12, 1.9, 0], html: label(sc.work[1]) }],
        3: sc.ai.map((n, i) => ({ pos: [AI_NODES[i][0] - 0.32, AI_NODES[i][1] + (i ? -0.56 : 0.72), 0], html: label(n.name, n.role) })),
      },
    })
    gl.value = !!field
    if (field && !reduced) {
      disposePortrait = createPortrait(portraitEl.value, profile.value.photo, () => { portraitLive.value = true })
    }
    if (import.meta.env.DEV || location.search.includes('stats')) window.__field = field
  } catch (e) {
    gl.value = false
  }
})

onBeforeUnmount(() => {
  alive = false
  window.removeEventListener('scroll', onScroll)
  io?.disconnect(); spy?.disconnect()
  field?.dispose(); disposePortrait?.()
})
</script>
