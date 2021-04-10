export let _Vue
export default function insall (Vue) {
  _Vue = Vue
  // 给每个组件都混入一个钩子函数,目的是给每个组件都提供一个$store选项
  Vue.mixin(initMixin())
}

function initMixin () {
  return {
    beforeCreate () {
      let options = this.$options
      if (options.store) {
        // 根组件
        this.$store = options.store
      } else {
        // 子组件
        if (this.$parent && this.$parent.$store) {
          this.$store = this.$parent.$store
        }
      }
    }
  }
}
