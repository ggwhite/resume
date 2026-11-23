import { createRouter, createWebHashHistory } from 'vue-router'
import Site from './views/Site.vue'

const Pdf = () => import('./views/ResumePdf.vue')

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Site, props: { locale: 'en' } },
    { path: '/en', redirect: '/' },
    { path: '/zh-tw', component: Site, props: { locale: 'zh-tw' } },
    { path: '/pdf', component: Pdf, props: { locale: 'en' }, meta: { pdf: true } },
    { path: '/pdf/zh-tw', component: Pdf, props: { locale: 'zh-tw' }, meta: { pdf: true } },
    { path: '/:rest(.*)*', redirect: '/' },
  ],
  scrollBehavior: (to, from) => (to.path !== from.path ? { top: 0 } : undefined),
})
