import { createRouter, createWebHashHistory } from 'vue-router'
import ResumeModern from './views/ResumeModern.vue'
import Resume from './views/Resume.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: ResumeModern, props: { locale: 'en' } },
    { path: '/en', name: 'resume-en', component: ResumeModern, props: { locale: 'en' } },
    { path: '/zh-tw', name: 'resume-zh-tw', component: ResumeModern, props: { locale: 'zh-tw' } },
    { path: '/legacy', name: 'legacy-en', component: Resume, props: { locale: 'en' } },
    { path: '/legacy/zh-tw', name: 'legacy-zh-tw', component: Resume, props: { locale: 'zh-tw' } },
  ],
})

export default router
