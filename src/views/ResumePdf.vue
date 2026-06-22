<template>
  <div class="pdf-resume font-sans text-[9px] leading-[1.35] text-slate-700 px-1">

    <!-- Header -->
    <div class="flex items-center gap-3 pb-2 border-b border-slate-300 mb-2">
      <img :src="profile.photo" class="w-12 h-12 rounded-full object-cover shrink-0" />
      <div class="flex-1">
        <h1 class="text-[18px] font-extrabold text-slate-800 leading-tight">{{ profile.name }}</h1>
        <p class="text-[11px] text-slate-500 font-medium">{{ profile.position }}</p>
      </div>
      <div class="text-[8px] text-slate-500 text-right shrink-0 space-y-0.5">
        <div>{{ profile.email }}</div>
        <div>{{ profile.phone }}</div>
        <div>github.com/ggwhite</div>
        <div>linkedin.com/in/white-chang</div>
      </div>
    </div>

    <!-- About -->
    <p class="text-[8.5px] text-slate-600 leading-snug mb-2">{{ data.about }}</p>

    <!-- Two columns: Competencies + AI -->
    <div class="grid grid-cols-2 gap-2 mb-2">
      <!-- Competencies -->
      <div>
        <h2 class="section-title">{{ labels.competencies }}</h2>
        <div class="space-y-1.5">
          <div v-for="c in data.competencies" :key="c.title">
            <h3 class="font-bold text-slate-800 text-[9px]">{{ c.title }}</h3>
            <p class="text-[8px] text-slate-600 leading-snug">{{ c.description }}</p>
            <p v-if="c.tech" class="text-[7px] text-slate-400 mt-0.5">{{ c.tech }}</p>
          </div>
        </div>
      </div>
      <!-- AI Workflow -->
      <div>
        <h2 class="section-title">{{ labels.aiWorkflow }}</h2>
        <p class="text-[7.5px] text-slate-500 italic mb-1">{{ data.aiWorkflow.intro }}</p>
        <ul class="space-y-0.5">
          <li v-for="(point, i) in data.aiWorkflow.points" :key="i"
              class="text-[8px] text-slate-600 leading-snug flex gap-1">
            <span class="text-indigo-500 shrink-0">•</span>
            <span>{{ point }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Experience -->
    <div class="mb-2">
      <h2 class="section-title">{{ labels.experience }}</h2>
      <div class="space-y-0.5">
        <div v-for="exp in experience" :key="exp.id" class="flex items-baseline gap-1">
          <span class="w-1 h-1 rounded-full shrink-0 relative top-[-0.5px]"
                :class="exp.end === 'Present' || exp.end === '現在' ? 'bg-indigo-500' : 'bg-slate-300'"></span>
          <span class="font-bold text-slate-800">{{ exp.position }}</span>
          <span class="text-slate-400 mx-0.5">·</span>
          <span class="text-slate-500">{{ exp.company }}</span>
          <span class="flex-1"></span>
          <span class="text-[8px] text-slate-400 shrink-0">{{ exp.start }} — {{ exp.end }}</span>
        </div>
      </div>
    </div>

    <!-- Projects -->
    <div class="mb-2">
      <h2 class="section-title">{{ labels.project }}</h2>
      <div class="space-y-0.5">
        <div v-for="p in project" :key="p.id" class="flex items-baseline gap-1">
          <span class="w-1 h-1 rounded-full bg-slate-300 shrink-0 relative top-[-0.5px]"></span>
          <span class="font-bold text-slate-700">{{ p.name }}</span>
          <span class="flex-1"></span>
          <span class="text-[8px] text-slate-400 shrink-0">{{ p.start }} — {{ p.end }}</span>
        </div>
      </div>
    </div>

    <!-- Education -->
    <div v-if="education && education.length">
      <h2 class="section-title">{{ labels.education }}</h2>
      <div v-for="edu in education" :key="edu.id" class="flex items-baseline gap-1">
        <span class="font-bold text-slate-700">{{ edu.degree }}</span>
        <span class="text-slate-500">— {{ edu.school }}</span>
        <span class="flex-1"></span>
        <span class="text-[8px] text-slate-400 shrink-0">{{ edu.start }} — {{ edu.end }}</span>
      </div>
    </div>

  </div>
</template>

<script>
import en from '@/data/en'
import zhTw from '@/data/zh-tw'

const localeData = { en, 'zh-tw': zhTw }

export default {
  name: 'ResumePdf',
  props: {
    locale: { type: String, default: 'en' },
  },
  computed: {
    data() { return localeData[this.locale] || localeData.en },
    labels() { return this.data.labels },
    profile() { return this.data.profile },
    experience() { return this.data.experience },
    project() { return this.data.project },
    education() { return this.data.education },
  },
}
</script>

<style scoped>
.section-title {
  @apply text-[10px] font-bold text-slate-800 mb-1 pb-0.5 border-b border-slate-200 flex items-center gap-1;
}
.section-title::before {
  content: '';
  @apply w-0.5 h-3 bg-indigo-500 rounded-full inline-block;
}
</style>
