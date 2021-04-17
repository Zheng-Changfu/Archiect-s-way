import Vue from 'vue'
import VueRouter from 'vue-router'
import hooks from './hooks'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: () => import('@/views/home')
  },
  {
    path: '/detail',
    component: () => import('@/views/detail')
  },
  {
    path: '/user',
    component: () => import('@/views/user')
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    meta: {
      hidden_navbar: true
    }
  },
  {
    path: '/',
    redirect: '/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

Object.values(hooks).forEach((hook) => router.beforeEach(hook))

export default router
