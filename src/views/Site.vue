<template>
  <div class="site" :class="{ 'no-gl': !gl, 'is-zh': zh }" @pointermove="onGlow">
    <canvas ref="fieldEl" class="field" aria-hidden="true"></canvas>
    <div ref="labelEl" class="gl-labels" aria-hidden="true"></div>
    <div class="progress" aria-hidden="true"><i ref="barEl"></i></div>

    <header class="nav" :class="{ scrolled }">
      <a class="nav-mark" href="#top" @click.prevent="go('top')">{{ profile.name }}</a>
      <nav class="nav-links" :aria-label="zh ? '區塊導覽' : 'Sections'">
        <a v-for="id in sectionIds" :key="id" :href="'#' + id" :class="{ on: active === id }" @click.prevent="go(id)">{{ s.nav[id] }}</a>
      </nav>
      <div class="nav-side">
        <router-link class="nav-lang" :to="s.langSwitch.to">{{ s.langSwitch.label }}</router-link>
        <a class="btn btn-solid" :href="data.pdf" target="_blank" rel="noopener">PDF</a>
      </div>
    </header>

    <main id="top">
      <!-- Hero -->
      <section class="hero" data-stage-root data-scene="cluster">
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
          <div class="hero-side">
            <figure class="portrait" ref="portraitWrap" @pointermove="tilt" @pointerleave="untilt">
              <div class="portrait-card" :class="{ live: portraitLive }">
                <img :src="profile.photo" :alt="s.hero.photoAlt" width="880" height="1100" />
                <canvas ref="portraitEl" aria-hidden="true"></canvas>
              </div>
            </figure>
            <div class="stage-slot hero-stage" aria-hidden="true"></div>
          </div>
        </div>
        <div class="wrap">
          <dl class="stats">
            <div v-for="(st, i) in s.stats" :key="i" class="stat rv" :style="{ '--d': i * 90 + 'ms' }">
              <dt><span class="stat-num" :data-count="st.num" :data-dec="st.decimals || 0">{{ st.prefix }}<b>{{ st.num }}</b>{{ st.suffix }}</span> <span class="stat-unit">{{ st.unit }}</span></dt>
              <dd>{{ st.label }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <!-- 01 · Problems -->
      <section id="systems" class="sec">
        <div class="wrap">
          <header class="sec-head rv" data-scene="dust">
            <p class="idx">01</p>
            <h2 :aria-label="s.systems.title"><span v-for="(w, i) in split(s.systems.title)" :key="i" class="w" aria-hidden="true"><i :style="{ '--i': i }">{{ w }}</i></span></h2>
            <p class="sec-sub">{{ s.systems.sub }}</p>
          </header>
          <div class="story" data-stage-root :data-scene="s.systems.steps[0].scene">
            <ol class="steps">
              <li v-for="(st, i) in s.systems.steps" :key="st.scene" class="step" :data-scene="st.scene">
                <span class="step-n">{{ String(i + 1).padStart(2, '0') }} / {{ String(s.systems.steps.length).padStart(2, '0') }}</span>
                <h3>{{ st.head }}</h3>
                <p>{{ st.body }}</p>
                <ul v-if="data.competencies[i].tech" class="tags"><li v-for="t in data.competencies[i].tech.split(', ')" :key="t">{{ t }}</li></ul>
              </li>
            </ol>
            <div class="stage-col"><div class="stage-slot" aria-hidden="true"></div></div>
          </div>
        </div>
      </section>

      <!-- 02 · Experience -->
      <section id="work" class="sec">
        <div class="wrap">
          <header class="sec-head rv" data-scene="dust">
            <p class="idx">02</p>
            <h2 :aria-label="s.work.title"><span v-for="(w, i) in split(s.work.title)" :key="i" class="w" aria-hidden="true"><i :style="{ '--i': i }">{{ w }}</i></span></h2>
            <p class="sec-sub">{{ s.work.sub }}</p>
          </header>

          <header class="job-head lead rv">
            <p class="job-date">{{ tyche.start }} — {{ tyche.end }}</p>
            <h3>{{ tyche.company }}</h3>
            <p class="job-pos">{{ tyche.position }}</p>
            <p class="job-role">{{ s.work.role }}</p>
          </header>

          <div class="story" data-stage-root :data-scene="s.work.chapters[0].scene">
            <ol class="steps">
              <li v-for="(st, i) in s.work.chapters" :key="i" class="step" :data-scene="st.scene">
                <span class="step-n">{{ st.when || String(i + 1).padStart(2, '0') + ' / ' + String(s.work.chapters.length).padStart(2, '0') }}</span>
                <h3>{{ st.head }}</h3>
                <p>{{ st.body }}</p>
              </li>
            </ol>
            <div class="stage-col"><div class="stage-slot" aria-hidden="true"></div></div>
          </div>

          <div class="also rv" data-scene="dust">
            <h3 class="mini-head">{{ s.work.alsoTitle }}</h3>
            <ul><li v-for="a in s.work.also" :key="a">{{ a }}</li></ul>
            <details class="record">
              <summary><span>{{ s.work.record }}</span><i aria-hidden="true"></i></summary>
              <div class="tiles">
                <section v-for="(items, title) in tyche.description" :key="title" class="tile glow">
                  <h4>{{ title }}</h4>
                  <ul v-if="Array.isArray(items)"><li v-for="it in items" :key="it">{{ it }}</li></ul>
                </section>
              </div>
            </details>
          </div>

          <h3 class="mini-head before rv">{{ s.work.earlier }}</h3>
          <div class="story story-tl" data-stage-root data-scene="timeline">
            <div class="steps">
              <article v-for="job in earlier" :key="job.id" class="job rv">
                <header class="job-head">
                  <p class="job-date">{{ job.start }} — {{ job.end }}</p>
                  <h3>{{ job.company }}</h3>
                  <p class="job-pos">{{ job.position }}</p>
                </header>
                <div class="job-body">
                  <section v-for="(items, title) in job.description" :key="title">
                    <h4>{{ title }}</h4>
                    <ul v-if="Array.isArray(items)"><li v-for="it in items" :key="it">{{ it }}</li></ul>
                  </section>
                </div>
              </article>
            </div>
            <div class="stage-col"><div class="stage-slot" aria-hidden="true"></div></div>
          </div>
        </div>
      </section>

      <!-- kinetic line between Experience and AI -->
      <div ref="bandEl" class="band" aria-hidden="true" data-scene="dust">
        <p class="band-row"><span v-for="n in 4" :key="n">{{ s.ai.quote }}</span></p>
        <p class="band-row alt"><span v-for="n in 4" :key="n">{{ s.ai.quote }}</span></p>
      </div>

      <!-- 03 · AI workflow -->
      <section id="ai" class="sec">
        <div class="wrap">
          <header class="sec-head rv">
            <p class="idx">03</p>
            <h2 :aria-label="s.ai.title"><span v-for="(w, i) in split(s.ai.title)" :key="i" class="w" aria-hidden="true"><i :style="{ '--i': i }">{{ w }}</i></span></h2>
            <p class="sec-sub">{{ data.aiWorkflow.intro }}</p>
          </header>
          <div class="story story-flip" data-stage-root :data-scene="s.ai.steps[0].scene">
            <ol class="steps">
              <li v-for="(st, i) in s.ai.steps" :key="st.scene" class="step" :data-scene="st.scene">
                <span class="step-n">{{ String(i + 1).padStart(2, '0') }} / {{ String(s.ai.steps.length).padStart(2, '0') }}</span>
                <h3>{{ st.head }}</h3>
                <p>{{ st.body }}</p>
              </li>
            </ol>
            <div class="stage-col"><div class="stage-slot" aria-hidden="true"></div></div>
          </div>
        </div>
      </section>

      <!-- 04 · Open source -->
      <section id="oss" class="sec" data-scene="dust">
        <div class="wrap">
          <header class="sec-head rv">
            <p class="idx">04</p>
            <h2 :aria-label="s.oss.title"><span v-for="(w, i) in split(s.oss.title)" :key="i" class="w" aria-hidden="true"><i :style="{ '--i': i }">{{ w }}</i></span></h2>
          </header>
          <article v-for="(p, i) in flagships" :key="p.id" class="flag glow rv" :class="{ flip: i % 2 }">
            <div class="flag-copy">
              <p class="repo-meta">
                <span>{{ p.repo.lang }}</span>
                <span v-if="p.repo.stars" class="star">★ {{ p.repo.stars }} {{ s.oss.stars }}</span>
                <span class="repo-date">{{ p.start }} — {{ p.end }}</span>
              </p>
              <h3><a :href="p.repo.url" target="_blank" rel="noopener">{{ p.title }}</a></h3>
              <p class="repo-line">{{ s.oss.lines[p.id] }}</p>
              <dl class="pitch">
                <div><dt>{{ s.oss.labels.problem }}</dt><dd>{{ s.oss.flag[p.id].problem }}</dd></div>
                <div><dt>{{ s.oss.labels.how }}</dt><dd>{{ s.oss.flag[p.id].how }}</dd></div>
                <div><dt>{{ s.oss.labels.proof }}</dt><dd><ul class="tags"><li v-for="x in s.oss.flag[p.id].proof" :key="x">{{ x }}</li></ul></dd></div>
              </dl>
              <a class="btn" :href="p.repo.url" target="_blank" rel="noopener">{{ s.oss.labels.repo }} <span aria-hidden="true">↗</span></a>
            </div>
            <RepoDemo :kind="p.id" :t="s.oss.demo" />
          </article>

          <h3 class="mini-head rv more-head">{{ s.oss.labels.more }}</h3>
          <div class="repos">
            <article v-for="p in minorRepos" :key="p.id" class="repo glow rv">
              <p class="repo-meta">
                <span>{{ p.repo.lang }}</span>
                <span v-if="p.repo.archived" class="arch">{{ s.oss.archived }}</span>
                <span class="repo-date">{{ p.start }} — {{ p.end }}</span>
              </p>
              <h3><a :href="p.repo.url" target="_blank" rel="noopener">{{ p.title }}<span aria-hidden="true"> ↗</span></a></h3>
              <p class="repo-line">{{ s.oss.lines[p.id] }}</p>
              <RepoDemo :kind="p.id" :t="s.oss.demo" />
              <ul><li v-for="d in p.description" :key="d">{{ d }}</li></ul>
            </article>
            <a class="repo til glow rv" :href="s.oss.til.url" target="_blank" rel="noopener">
              <p class="repo-meta"><span>TIL</span></p>
              <h3>{{ s.oss.til.label }}<span aria-hidden="true"> ↗</span></h3>
              <p class="repo-line">{{ s.oss.til.line }}</p>
              <p class="til-url">ggwhite.github.io/ggwhite</p>
            </a>
          </div>
          <h3 class="mini-head rv">{{ s.oss.freelance }}</h3>
          <div class="gigs">
            <article v-for="p in gigs" :key="p.id" class="gig rv">
              <p class="job-date">{{ p.start }} — {{ p.end }}</p>
              <h4>{{ p.name }}</h4>
              <ul><li v-for="d in p.description" :key="d">{{ d }}</li></ul>
            </article>
          </div>
        </div>
      </section>

      <!-- 05 · Toolbox -->
      <section id="skills" class="sec sec-skills">
        <div class="marquee" aria-hidden="true">
          <div class="marquee-track"><span v-for="(w, i) in marquee.concat(marquee)" :key="i">{{ w }}</span></div>
        </div>
        <div class="wrap">
          <header class="sec-head rv">
            <p class="idx">05</p>
            <h2 :aria-label="s.skills.title"><span v-for="(w, i) in split(s.skills.title)" :key="i" class="w" aria-hidden="true"><i :style="{ '--i': i }">{{ w }}</i></span></h2>
            <p class="sec-sub">{{ s.skills.hint }}</p>
          </header>
          <div class="kit rv">
            <div class="kit-langs" role="tablist" :aria-label="data.labels.programming">
              <button v-for="lang in langs" :key="lang" type="button" role="tab" :aria-selected="lang === lang0" :class="{ on: lang === lang0 }"
                @pointerenter="lang0 = lang" @focus="lang0 = lang" @click="lang0 = lang">{{ lang }}</button>
            </div>
            <div class="kit-libs" role="tabpanel">
              <p class="kit-big">{{ lang0 }}</p>
              <ul :key="lang0"><li v-for="(l, i) in profile.programming[lang0]" :key="l" :style="{ '--i': i }">{{ l }}</li></ul>
            </div>
          </div>
          <dl class="tools rv">
            <div v-for="(list, group) in profile.tools" :key="group">
              <dt>{{ group }}</dt>
              <dd><span v-for="x in list" :key="x">{{ x }}</span></dd>
            </div>
          </dl>
          <div class="edu rv">
            <h3 class="mini-head">{{ data.labels.education }}</h3>
            <p v-for="e in data.education" :key="e.id"><b>{{ e.degree }}</b> — {{ e.school }} <span class="job-date">{{ e.start }} — {{ e.end }}</span></p>
          </div>
        </div>
      </section>

      <!-- 06 · Contact -->
      <section id="contact" class="sec contact" data-stage-root data-scene="handshake">
        <div class="wrap">
          <div class="stage-slot contact-stage" aria-hidden="true"></div>
          <p class="idx rv">06</p>
          <h2 class="rv">{{ s.contact.title }}</h2>
          <a class="mail rv" :href="'mailto:' + profile.email">{{ profile.email }}</a>
          <ul class="contact-list rv">
            <li><a :href="'tel:' + profile.phone.replace(/\s/g, '')">{{ profile.phone }}</a></li>
            <li><a :href="profile.github" target="_blank" rel="noopener">github.com/ggwhite</a></li>
            <li><a :href="profile.linkedin" target="_blank" rel="noopener">linkedin.com/in/white-chang</a></li>
            <li><a :href="data.pdf" target="_blank" rel="noopener">{{ data.labels.download }}</a></li>
          </ul>
        </div>
        <footer class="foot">
          <span>{{ profile.name }} · {{ s.contact.sub }}</span>
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
import RepoDemo from '@/components/RepoDemo.vue'
import '@/styles/site.css'

const props = defineProps({ locale: { type: String, default: 'en' } })
const zh = computed(() => props.locale === 'zh-tw')
const data = computed(() => (zh.value ? zhTw : en))
const s = computed(() => data.value.site)
const profile = computed(() => data.value.profile)
const sectionIds = ['systems', 'work', 'ai', 'oss', 'skills', 'contact']

const nameChars = computed(() => s.value.hero.nameLines.map((l) => Array.from(l)))
// headline → words (Latin) or characters (CJK) for the staggered reveal
const split = (t) => (/[一-鿿]/.test(t) ? Array.from(t) : t.split(' ').map((w, i, a) => (i < a.length - 1 ? w + ' ' : w)))
const tyche = computed(() => data.value.experience[0])
const earlier = computed(() => data.value.experience.slice(1))
const ossProjects = computed(() => data.value.project.filter((p) => repos[p.id]).map((p) => ({ ...p, title: p.name.split(' — ')[0], repo: repos[p.id] })))
const FLAGSHIPS = ['memory-mcp', 'jarvis', 'go-masker']
const flagships = computed(() => FLAGSHIPS.map((id) => ossProjects.value.find((p) => p.id === id)))
const minorRepos = computed(() => ossProjects.value.filter((p) => !FLAGSHIPS.includes(p.id)))
const gigs = computed(() => data.value.project.filter((p) => !repos[p.id]))
const langs = computed(() => Object.keys(profile.value.programming))
const lang0 = ref('Golang')
const marquee = computed(() => [
  ...langs.value.slice(0, 4), ...profile.value.tools['Data Store'].slice(0, 3), 'gRPC', 'RabbitMQ', 'Kafka',
  ...profile.value.tools['DevOps'].slice(0, 2), 'Skynet', 'Claude Code', 'MCP',
])
// timeline scene labels come straight from the experience record: start year · company id
const sceneTexts = computed(() => {
  const jobs = [...data.value.experience].reverse()
  const labels = Object.fromEntries(jobs.map((j, i) => ['j' + i, [`${j.start.match(/\d{4}/)[0]} · ${j.id}`]]))
  return { ...s.value.scenes, timeline: { labels, caps: [] } }
})

const fieldEl = ref(null), labelEl = ref(null), barEl = ref(null), portraitEl = ref(null), portraitWrap = ref(null), bandEl = ref(null)
const gl = ref(true), portraitLive = ref(false), scrolled = ref(false), active = ref('')
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
let field = null, disposePortrait = null, io = null, spy = null, stepIo = null, alive = true

function go(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
}
function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  scrolled.value = window.scrollY > 40
  if (barEl.value) barEl.value.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
  const b = bandEl.value
  if (b && !reduced) { // the quote slides sideways as it crosses the viewport
    const r = b.getBoundingClientRect()
    if (r.bottom > 0 && r.top < window.innerHeight) b.style.setProperty('--p', ((window.innerHeight - r.top) / (window.innerHeight + r.height)).toFixed(4))
  }
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
  portraitWrap.value.style.setProperty('--rx', -((e.clientY - r.top) / r.height - 0.5) * 10 + 'deg')
  portraitWrap.value.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 12 + 'deg')
}
function untilt() {
  portraitWrap.value.style.setProperty('--rx', '0deg')
  portraitWrap.value.style.setProperty('--ry', '0deg')
}
function countUp(el) {
  if (reduced) return
  const b = el.querySelector('b'), to = +el.dataset.count, dec = +el.dataset.dec, t0 = performance.now()
  const step = (now) => {
    const k = Math.min(1, (now - t0) / 1400)
    b.textContent = (to * (1 - Math.pow(1 - k, 4))).toFixed(dec)
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

  // the step being read is lit; the rest dim (same reading line the WebGL stage uses)
  const wide = window.innerWidth >= 960
  stepIo = new IntersectionObserver((entries) => {
    for (const e of entries) e.target.classList.toggle('on', e.isIntersecting)
  }, { rootMargin: wide ? '-55% 0px -45% 0px' : '-72% 0px -28% 0px' })
  document.querySelectorAll('.step').forEach((el) => stepIo.observe(el))

  // three.js is loaded after first paint so the text never waits for it
  await nextTick()
  if (!hasWebGL()) { gl.value = false; return } // static CSS background instead; three.js is never downloaded
  try {
    const [{ createField }, { createPortrait }] = await Promise.all([import('@/gl/field'), import('@/gl/portrait')])
    if (!alive) return
    field = createField(fieldEl.value, { reduced, layer: labelEl.value, texts: sceneTexts.value })
    gl.value = !!field
    if (field && !reduced) disposePortrait = createPortrait(portraitEl.value, profile.value.photo, () => { portraitLive.value = true })
    if (import.meta.env.DEV || location.search.includes('stats')) window.__field = field
  } catch (e) {
    if (import.meta.env.DEV) console.error(e)
    gl.value = false
  }
})

onBeforeUnmount(() => {
  alive = false
  window.removeEventListener('scroll', onScroll)
  io?.disconnect(); spy?.disconnect(); stepIo?.disconnect()
  field?.dispose(); disposePortrait?.()
})
</script>
