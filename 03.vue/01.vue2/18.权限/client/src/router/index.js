import Vue from 'vue'
import VueRouter from 'vue-router'
import hooks from './hooks'
import loadable from '@/utils/loadable'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: loadable(() => import('@/views/home'))
  },
  {
    path: '/detail',
    component: loadable(() => import('@/views/detail')),
    meta: {
      // 只有登录过才能访问
      need_login: true
    }
  },
  {
    path: '/user',
    component: loadable(() => import('@/views/user')),
  },
  {
    path: '/login',
    component: loadable(() => import('@/views/login')),
    meta: {
      hidden_navbar: true
    }
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '*',
    component: {
      render () {
        return <h1>404</h1>
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

Object.values(hooks).forEach((hook) => router.beforeEach(hook))

export default router
