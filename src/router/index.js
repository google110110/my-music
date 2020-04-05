import Vue from 'vue'
import VueRouter from 'vue-router'
import my from './my'
import friend from './friend'
import recommend from './recommend'
Vue.use(VueRouter)

const routes = [
  my,
  friend,
  recommend,
  {
    path: '/*',
    redirect: '/recommend'
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: 'my-music/dist',
  // base: 'my-music',
  routes
})

export default router