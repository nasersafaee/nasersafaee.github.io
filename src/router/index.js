import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'authenticationRules',
    component: () => import('../views/PersonAuthenticationRuels.vue'),
  },
  {
    path: '/id-sample',
    name: 'idSample',
    component: () => import('../views/IdSample.vue'),
  },
  {
    path: '/video-rules',
    name: 'videoRules',
    component: () => import('../views/VideoRules.vue'),
  },
  {
    path: '/video-record',
    name: 'videoRecording',
    component: () => import('../views/VideoRecording.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
