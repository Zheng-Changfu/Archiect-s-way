import RouterLink from './components/link'
import RouterView from './components/view'
export let _Vue
export default function install (Vue) {
  _Vue = Vue
  Vue.mixin({
    beforeCreate () {
      const router = this.$options.router
      if (router) {
        // 根组件
        this._router = router
        this._routerRoot = this
        this._router.init(this)
        // 响应式属性current 
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        // 子孙组件
        if (this.$parent && this.$parent._routerRoot) {
          this._routerRoot = this.$parent._routerRoot
        }
      }
    }
  })
  Object.defineProperty(Vue.prototype, '$router', {
    get () {
      // 方法
      return this._routerRoot._router
    }
  })
  Object.defineProperty(Vue.prototype, '$route', {
    get () {
      // 属性current
      return this._routerRoot._route
    }
  })
  Vue.component('router-link', RouterLink)
  Vue.component('router-view', RouterView)
}