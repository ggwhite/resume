<template>
  <div class="max-w-3xl mx-auto px-6 md:px-12">

    <!-- Header -->
    <header class="flex flex-col md:flex-row items-center gap-6 py-8 border-b-2 border-slate-200">
      <img :src="profile.photo"
           class="w-28 h-28 rounded-full object-cover shadow-lg ring-4 ring-white shrink-0" />
      <div class="text-center md:text-left flex-1">
        <h1 class="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">{{ profile.name }}</h1>
        <p class="text-lg md:text-xl text-slate-500 font-medium mt-1">{{ profile.position }}</p>
      </div>
    </header>

    <!-- About -->
    <section class="py-8 border-b border-slate-100">
      <p class="text-slate-600 leading-relaxed text-[15px]">{{ data.about }}</p>
    </section>

    <!-- Core Competencies -->
    <section class="py-8 border-b border-slate-100">
      <h2 class="section-title">{{ labels.competencies }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="c in data.competencies" :key="c.title"
             class="bg-slate-50 rounded-lg p-4 border border-slate-100">
          <h3 class="font-bold text-slate-800 mb-1.5">{{ c.title }}</h3>
          <p class="text-sm text-slate-600 leading-relaxed">{{ c.description }}</p>
          <p v-if="c.tech" class="text-xs text-slate-400 mt-2.5 pt-2 border-t border-slate-100">{{ c.tech }}</p>
        </div>
      </div>
    </section>

    <!-- AI-Augmented Development -->
    <section class="py-8 border-b border-slate-100">
      <h2 class="section-title">{{ labels.aiWorkflow }}</h2>
      <p class="text-sm text-slate-500 italic mb-4">{{ data.aiWorkflow.intro }}</p>
      <ul class="space-y-2.5">
        <li v-for="(point, i) in data.aiWorkflow.points" :key="i"
            class="inline-flex gap-2.5 text-sm text-slate-600 w-full">
          <Bot :size="16" class="text-indigo-500 shrink-0 relative top-[1px]" />
          <span class="leading-relaxed">{{ point }}</span>
        </li>
      </ul>
    </section>

    <!-- Experience -->
    <section class="py-8 border-b border-slate-100">
      <h2 class="section-title">{{ labels.experience }}</h2>
      <div class="space-y-1">
        <div v-for="exp in experience" :key="exp.id" class="rounded-lg overflow-hidden">
          <!-- Row -->
          <div class="flex items-center gap-2.5 py-2.5 px-2 -mx-2 cursor-pointer rounded-lg
                       hover:bg-slate-50 transition-colors select-none"
               @click="toggleExp(exp.id)">
            <span class="w-2 h-2 rounded-full shrink-0"
                  :class="exp.end === 'Present' || exp.end === '現在' ? 'bg-indigo-500' : 'bg-slate-300'"></span>
            <div class="flex-1 min-w-0">
              <span class="font-bold text-slate-800">{{ exp.position }}</span>
              <span class="text-slate-400 mx-1.5">·</span>
              <span class="text-slate-500">{{ exp.company }}</span>
            </div>
            <span class="text-sm text-slate-400 font-medium shrink-0 hidden sm:inline">{{ exp.start }} — {{ exp.end }}</span>
            <ChevronDown :size="16"
                         class="text-slate-400 shrink-0 transition-transform duration-200"
                         :class="expanded[exp.id] ? 'rotate-180' : ''" />
          </div>
          <!-- Mobile date -->
          <div class="text-xs text-slate-400 pl-[18px] -mt-1 mb-1 sm:hidden">{{ exp.start }} — {{ exp.end }}</div>
          <!-- Expanded detail -->
          <transition name="expand">
            <div v-if="expanded[exp.id]"
                 class="bg-slate-50 rounded-lg border border-slate-100 p-4 ml-[18px] mb-3 mt-1">
              <Description :description="exp.description" />
            </div>
          </transition>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section class="py-8 border-b border-slate-100">
      <h2 class="section-title">{{ labels.project }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="p in project" :key="p.id"
             class="bg-slate-50 rounded-lg p-4 border border-slate-100">
          <div class="flex items-baseline justify-between mb-2">
            <h3 class="font-bold text-slate-700 text-sm">{{ p.name }}</h3>
            <span class="text-xs text-slate-400 shrink-0 ml-2">{{ p.start }} — {{ p.end }}</span>
          </div>
          <ul v-if="Array.isArray(p.description)" class="text-sm text-slate-600 space-y-1">
            <li v-for="(d, i) in p.description" :key="i" class="flex gap-1.5">
              <span class="text-slate-400 shrink-0">·</span>
              <span>{{ d }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Education -->
    <section class="py-8 border-b border-slate-100" v-if="education && education.length">
      <h2 class="section-title">{{ labels.education }}</h2>
      <div v-for="edu in education" :key="edu.id"
           class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <span class="font-bold text-slate-700">{{ edu.degree }}</span>
          <span class="text-slate-500 ml-1">— {{ edu.school }}</span>
        </div>
        <span class="text-sm text-slate-400 shrink-0">{{ edu.start }} — {{ edu.end }}</span>
      </div>
    </section>

    <!-- Download PDF -->
    <div class="py-8">
      <a :href="pdfUrl" download
         class="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors
                inline-flex items-center gap-2 text-sm font-medium shadow-sm no-underline hover:no-underline hover:text-white">
        <Download :size="16" />
        {{ labels.download }}
      </a>
    </div>

  </div>
</template>

<script>
import { Bot, ChevronDown, Download } from '@lucide/vue'
import Description from '@/components/Description.vue'

import en from '@/data/en'
import zhTw from '@/data/zh-tw'

const localeData = { en, 'zh-tw': zhTw }

export default {
  name: 'ResumeModern',
  components: { Bot, ChevronDown, Download, Description },
  props: {
    locale: { type: String, default: 'en' },
  },
  data() {
    return { expanded: {} }
  },
  computed: {
    data() { return localeData[this.locale] || localeData.en },
    labels() { return this.data.labels },
    profile() { return this.data.profile },
    experience() { return this.data.experience },
    project() { return this.data.project },
    education() { return this.data.education },
    pdfUrl() {
      const base = import.meta.env.BASE_URL
      const filename = this.locale === 'zh-tw' ? 'WhiteChang-Resume.zh-tw.pdf' : 'WhiteChang-Resume.en.pdf'
      return `${base}${filename}`
    },
  },
  methods: {
    toggleExp(id) {
      this.expanded = { ...this.expanded, [id]: !this.expanded[id] }
    },
  },
}
</script>

<style scoped>
.section-title {
  @apply text-lg font-bold text-slate-800 mb-4 inline-flex items-center gap-2;
}
.section-title::before {
  content: '';
  @apply w-1 h-5 bg-indigo-500 rounded-full inline-block;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
