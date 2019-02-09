import Vue from 'vue'
import Router from 'vue-router'
import ResumeEn from './views/ResumeEn.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: ResumeEn
    },
    {
      path: '/resume/en',
      name: 'resume-en',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/ResumeEn.vue')
    },
    {
      path: '/resume/zh-tw',
      name: 'resume-zh-tw',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/ResumeZhTw.vue')
    },
  ]
})
