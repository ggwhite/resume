<template>
  <div class="pdf-resume font-sans text-[11px] leading-[1.4] text-slate-700 px-2">

    <!-- Header -->
    <div class="flex items-center gap-4 pb-3 border-b-2 border-slate-300 mb-4">
      <img :src="profile.photo" class="w-14 h-14 rounded-full object-cover shrink-0" />
      <div class="flex-1">
        <h1 class="text-[22px] font-extrabold text-slate-800 leading-tight">{{ profile.name }}</h1>
        <p class="text-[13px] text-slate-500 font-medium">{{ profile.position }}</p>
      </div>
      <div class="text-[9.5px] text-slate-500 text-right shrink-0 space-y-0.5">
        <div>{{ profile.email }}</div>
        <div>{{ profile.phone }}</div>
        <div>github.com/ggwhite</div>
        <div>linkedin.com/in/white-chang</div>
      </div>
    </div>

    <!-- About -->
    <p class="text-slate-600 leading-relaxed mb-4">{{ data.about }}</p>

    <!-- Two columns: Competencies + AI -->
    <div class="grid grid-cols-2 gap-4 mb-4">
      <!-- Competencies -->
      <div>
        <h2 class="section-title">{{ labels.competencies }}</h2>
        <div class="space-y-2.5">
          <div v-for="c in data.competencies" :key="c.title">
            <h3 class="font-bold text-slate-800">{{ c.title }}</h3>
            <p class="text-[10.5px] text-slate-600 leading-snug mt-0.5">{{ c.description }}</p>
            <p v-if="c.tech" class="text-[9px] text-slate-400 mt-0.5">{{ c.tech }}</p>
          </div>
        </div>
      </div>
      <!-- AI Workflow -->
      <div>
        <h2 class="section-title">{{ labels.aiWorkflow }}</h2>
        <p class="text-[10px] text-slate-500 italic mb-2">{{ data.aiWorkflow.intro }}</p>
        <ul class="space-y-1.5">
          <li v-for="(point, i) in data.aiWorkflow.points" :key="i"
              class="text-[10.5px] text-slate-600 leading-snug flex gap-1.5">
            <span class="text-indigo-500 shrink-0">•</span>
            <span>{{ point }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Experience -->
    <div class="mb-4">
      <h2 class="section-title">{{ labels.experience }}</h2>
      <div class="space-y-2">
        <div v-for="exp in experience" :key="exp.id">
          <div class="flex items-baseline gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full shrink-0 relative top-[-0.5px]"
                  :class="exp.end === 'Present' || exp.end === '現在' ? 'bg-indigo-500' : 'bg-slate-300'"></span>
            <span class="font-bold text-slate-800">{{ exp.position }}</span>
            <span class="text-slate-400 mx-0.5">·</span>
            <span class="text-slate-500">{{ exp.company }}</span>
            <span class="flex-1"></span>
            <span class="text-[10px] text-slate-400 shrink-0">{{ exp.start }} — {{ exp.end }}</span>
          </div>
          <!-- Brief highlights for recent roles -->
          <div v-if="exp.highlights" class="ml-4 mt-0.5 text-[10px] text-slate-500 leading-snug">
            {{ exp.highlights }}
          </div>
        </div>
      </div>
    </div>

    <!-- Projects -->
    <div class="mb-4">
      <h2 class="section-title">{{ labels.project }}</h2>
      <div class="space-y-1.5">
        <div v-for="p in project" :key="p.id">
          <div class="flex items-baseline gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 relative top-[-0.5px]"></span>
            <span class="font-bold text-slate-700">{{ p.name }}</span>
            <span class="flex-1"></span>
            <span class="text-[10px] text-slate-400 shrink-0">{{ p.start }} — {{ p.end }}</span>
          </div>
          <div v-if="Array.isArray(p.description)" class="ml-4 mt-0.5 text-[10px] text-slate-500 leading-snug">
            {{ p.description.join(' / ') }}
          </div>
        </div>
      </div>
    </div>

    <!-- Education -->
    <div v-if="education && education.length">
      <h2 class="section-title">{{ labels.education }}</h2>
      <div v-for="edu in education" :key="edu.id" class="flex items-baseline gap-1.5">
        <span class="font-bold text-slate-700">{{ edu.degree }}</span>
        <span class="text-slate-500">— {{ edu.school }}</span>
        <span class="flex-1"></span>
        <span class="text-[10px] text-slate-400 shrink-0">{{ edu.start }} — {{ edu.end }}</span>
      </div>
    </div>

  </div>
</template>

<script>
import en from '@/data/en'
import zhTw from '@/data/zh-tw'

const highlights = {
  en: {
    Tyche: "3 game server projects (Lua/Skynet, Golang). MongoDB optimization on 2.7M records/day. Redis architecture redesign. Security incident investigation & AES encryption. CI/CD pipeline with Docker/Harbor/Helm.",
    Terpro: "Built reusable slot game framework (FreeGame, Lightning, PickGame). Kubernetes/Helm deployment.",
    WistronITS: "Led 2 engineers. Built 5 micro-services (OpenId, Product, Payment, Stock, Kafka). Jenkins/Nexus CI toolchain.",
  },
  'zh-tw': {
    Tyche: "3 個遊戲服務器專案（Lua/Skynet、Golang）。MongoDB 每日 270 萬筆資料效能優化。Redis 架構重構。資安事件調查與 AES 加密。Docker/Harbor/Helm CI/CD Pipeline。",
    Terpro: "建立可複用老虎機遊戲框架（FreeGame、Lightning、PickGame）。Kubernetes/Helm 部署。",
    WistronITS: "領導 2 名工程師。開發 5 個微服務（OpenId、Product、Payment、Stock、Kafka）。Jenkins/Nexus CI 工具鏈。",
  },
}

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
    experience() {
      const h = highlights[this.locale] || highlights.en
      return this.data.experience.map(exp => ({
        ...exp,
        highlights: h[exp.id] || null,
      }))
    },
    project() { return this.data.project },
    education() { return this.data.education },
  },
}
</script>

<style scoped>
.section-title {
  @apply text-[12px] font-bold text-slate-800 mb-2 pb-1 border-b border-slate-200 flex items-center gap-1.5;
}
.section-title::before {
  content: '';
  @apply w-0.5 h-3.5 bg-indigo-500 rounded-full inline-block;
}
</style>
