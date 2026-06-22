<template>
  <div ref="resumeEl" class="max-w-6xl mx-auto px-4 relative md:grid md:grid-cols-[1fr_265px] md:gap-x-4">

    <MainHead :name="profile.name" :position="profile.position"
              class="md:col-start-1" />

    <section class="md:col-start-1 mb-4">
      <h2 class="text-base md:text-lg font-bold border-b border-gray-400 mb-1 md:mb-2.5 md:mr-8">
        {{ labels.summary }}
      </h2>
      <SummaryQualification :summary="summary" />
    </section>

    <section class="md:col-start-1 mb-4">
      <h2 class="text-base md:text-lg font-bold border-b border-gray-400 mb-1 md:mb-2.5 md:mr-8">
        {{ labels.experience }}
      </h2>
      <Experience v-for="exp in experience" :key="exp.id"
                  :company="exp.company" :position="exp.position"
                  :start="exp.start" :end="exp.end" :description="exp.description" />
    </section>

    <section class="md:col-start-1 mb-4">
      <h2 class="text-base md:text-lg font-bold border-b border-gray-400 mb-1 md:mb-2.5 md:mr-8">
        {{ labels.project }}
      </h2>
      <Project v-for="p in project" :key="p.id"
               :name="p.name" :start="p.start" :end="p.end" :description="p.description" />
    </section>

    <Profile :photo="profile.photo" :email="profile.email" :phone="profile.phone"
             :github="profile.github" :linkedin="profile.linkedin"
             :programming="profile.programming" :tools="profile.tools"
             :labels="profileLabels"
             class="md:col-start-2 md:row-start-1 md:row-end-[-1]" />

    <div class="md:col-start-1 flex gap-3 mt-4 mb-8 print:hidden">
      <button @click="printResume"
              class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 flex items-center gap-2 text-sm">
        <Printer :size="16" />
        {{ labels.print || 'Print / Save PDF' }}
      </button>
      <button @click="downloadPdf"
              class="px-4 py-2 border border-gray-600 text-gray-600 rounded hover:bg-gray-100 flex items-center gap-2 text-sm">
        <Download :size="16" />
        {{ labels.download || 'Download PDF' }}
      </button>
    </div>

  </div>
</template>

<script>
import MainHead from '@/components/MainHead.vue'
import SummaryQualification from '@/components/SummaryQualification.vue'
import Profile from '@/components/Profile.vue'
import Experience from '@/components/Experience.vue'
import Project from '@/components/Project.vue'
import { Printer, Download } from '@lucide/vue'

import en from '@/data/en'
import zhTw from '@/data/zh-tw'

const localeData = { en, 'zh-tw': zhTw }

export default {
  name: 'Resume',
  components: {
    MainHead,
    SummaryQualification,
    Profile,
    Experience,
    Project,
    Printer,
    Download,
  },
  props: {
    locale: {
      type: String,
      default: 'en',
    },
  },
  computed: {
    data() {
      return localeData[this.locale] || localeData.en
    },
    pdf() { return this.data.pdf },
    labels() { return this.data.labels },
    profile() { return this.data.profile },
    summary() { return this.data.summary },
    experience() { return this.data.experience },
    project() { return this.data.project },
    profileLabels() {
      return {
        personalInfo: this.labels.personalInfo,
        programming: this.labels.programming,
        tools: this.labels.tools,
      }
    },
  },
  methods: {
    printResume() {
      window.print()
    },
    async downloadPdf() {
      const html2pdf = (await import('html2pdf.js')).default
      const element = this.$refs.resumeEl
      const filename = this.locale === 'zh-tw'
        ? 'WhiteChang-Resume-zh-tw.pdf'
        : 'WhiteChang-Resume-en.pdf'

      html2pdf()
        .from(element)
        .set({
          margin: [10, 8],
          filename,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, logging: false },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        })
        .save()
    },
  },
}
</script>
