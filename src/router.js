import { createRouter, createWebHashHistory } from 'vue-router'
import Resume from './views/Resume.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: Resume, props: { locale: 'en' } },
    { path: '/en', name: 'resume-en', component: Resume, props: { locale: 'en' } },
    { path: '/zh-tw', name: 'resume-zh-tw', component: Resume, props: { locale: 'zh-tw' } },
  ],
})

export default router
