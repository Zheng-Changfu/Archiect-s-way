import Vue from 'vue'
import VueRouter from '../vue-router'
// import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    children: [
      {
        path: 'a',
        component: {
          render: (h) => h('div', null, 'about/a')
        }
      },
      {
        path: 'b',
        component: {
          render: (h) => h('div', null, 'about/b')
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
