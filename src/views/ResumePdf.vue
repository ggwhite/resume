<!--
  One-page PDF layout (routes /#/pdf and /#/pdf/zh-tw), printed by scripts/generate-pdf.py.
  Built for machine reading (ATS / job sites): a single column in DOM order, plain
  text nodes, system fonts, no letter-spacing, no kerning tricks, no canvas.
-->
<template>
  <div class="pdf" :class="'pdf-' + locale">
    <header class="top">
      <img :src="profile.photo" alt="" />
      <div class="who">
        <h1>{{ profile.name }}</h1>
        <p class="pos">{{ profile.position }}</p>
        <p class="reach">{{ profile.email }} | {{ profile.phone }} | github.com/ggwhite | linkedin.com/in/white-chang</p>
      </div>
    </header>

    <p class="about">{{ data.about }}</p>

    <section>
      <h2>{{ labels.competencies }}</h2>
      <p v-for="c in data.competencies" :key="c.title" class="item"><b>{{ c.title }}: </b>{{ c.description }}<span v-if="c.tech" class="tech"> ({{ c.tech }})</span></p>
    </section>

    <section>
      <h2>{{ labels.aiWorkflow }}</h2>
      <p class="item">{{ data.aiWorkflow.intro }}</p>
      <ul><li v-for="p in data.aiWorkflow.points" :key="p">• {{ p }}</li></ul>
    </section>

    <section>
      <h2>{{ labels.experience }}</h2>
      <div v-for="e in data.experience" :key="e.id" class="row">
        <p class="row-head"><b>{{ e.position }}</b>, {{ e.company }} <span class="date">({{ e.start }} – {{ e.end }})</span></p>
        <p v-if="data.pdfHighlights[e.id]" class="row-body">{{ data.pdfHighlights[e.id] }}</p>
      </div>
    </section>

    <section>
      <h2>{{ labels.project }}</h2>
      <p v-for="p in projects" :key="p.id" class="row-head"><b>{{ p.name }}</b> <span class="date">({{ p.start }} – {{ p.end }})</span></p>
    </section>

    <section>
      <h2>{{ labels.programming }} / {{ labels.tools }}</h2>
      <p class="item">{{ skills }}</p>
    </section>

    <section>
      <h2>{{ labels.education }}</h2>
      <p v-for="e in data.education" :key="e.id" class="row-head"><b>{{ e.degree }}</b>, {{ e.school }} <span class="date">({{ e.start }} – {{ e.end }})</span></p>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import en from '@/data/en'
import zhTw from '@/data/zh-tw'

const props = defineProps({ locale: { type: String, default: 'en' } })
const data = computed(() => (props.locale === 'zh-tw' ? zhTw : en))
const labels = computed(() => data.value.labels)
const profile = computed(() => data.value.profile)
const projects = computed(() => data.value.project.filter((p) => p.pdf !== false))
const skills = computed(() => {
  const langs = Object.entries(profile.value.programming).map(([k, v]) => (v.length ? `${k} (${v.join(', ')})` : k))
  const tools = Object.values(profile.value.tools).flat()
  return [...langs, ...tools].join(', ')
})
</script>

<style>
html.is-pdf, html.is-pdf body { margin: 0; background: #fff; }
@page { size: A4; margin: 7mm 10mm; }
.pdf {
  width: 190mm; margin: 0 auto; color: #1b1b22;
  font: 400 8.2pt/1.33 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-kerning: none; font-variant-ligatures: none; letter-spacing: 0; text-rendering: optimizeSpeed;
  hyphens: manual; text-align: left;
}
/* Not PingFang: Chromium splits it into fallback runs and the PDF text layer comes
   out of order. Heiti TC extracts in exact DOM order (checked by generate-pdf.py). */
.pdf-zh-tw { font-family: 'Helvetica Neue', 'Heiti TC', 'Noto Sans TC', 'Microsoft JhengHei', sans-serif; font-size: 8.7pt; line-height: 1.4; }
.pdf * { margin: 0; padding: 0; box-sizing: border-box; }
.pdf .top { display: flex; align-items: center; gap: 4mm; padding-bottom: 2.2mm; border-bottom: 1.2pt solid #1b1b22; }
.pdf .top img { width: 15mm; height: 15mm; border-radius: 50%; object-fit: cover; object-position: 60% 30%; flex: none; }
.pdf h1 { font-size: 19pt; line-height: 1.1; font-weight: 700; }
.pdf .pos { font-size: 11pt; font-weight: 500; color: #4b3fd6; }
.pdf .reach { color: #44444f; margin-top: 0.6mm; }
.pdf .about { margin-top: 2.2mm; }
.pdf section { margin-top: 2.3mm; }
.pdf h2 { font-size: 10pt; font-weight: 700; color: #4b3fd6; border-bottom: 0.5pt solid #c9c9d6; padding-bottom: 0.5mm; margin-bottom: 1.2mm; }
.pdf .item + .item, .pdf .row + .row { margin-top: 0.9mm; }
.pdf ul { list-style: none; margin-top: 0.9mm; }
.pdf li { padding-left: 3mm; text-indent: -3mm; }
.pdf li + li { margin-top: 0.6mm; }
.pdf .tech, .pdf .date { color: #5a5a66; }
.pdf .row-body { color: #33333d; }
.pdf b { font-weight: 700; }
</style>
