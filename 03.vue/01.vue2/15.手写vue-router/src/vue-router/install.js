import RouterLink from '../components/link'
import RouterView from '../components/view'
export let _Vue
export default function install (Vue) {
  _Vue = Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) {
        // 根组件
        this._router = this.$options.router
        this._routerRoot = this
        this._router.init(this)
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

    }
  })
  Object.defineProperty(Vue.prototype, '$route', {
    get () {

    }
  })
  Vue.component('router-link', RouterLink)
  Vue.component('router-view', RouterView)
}