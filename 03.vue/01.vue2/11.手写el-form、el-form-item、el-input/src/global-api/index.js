export default function globalApi (Vue) {
  /**
   * 
   * @param {*} componentName 组件名称
   * @param {*} eventName 事件名称
   */
  Vue.prototype.$dispatch = function (componentName, eventName) {
    let parent = this.$parent
    while (parent) {
      if (parent.$options.name === componentName) {
        if (eventName) {
          parent.$emit(eventName)
        }
        return parent
      }
      parent = parent.$parent
    }
    return parent
  }
  Vue.prototype.$vchild = function (componentName) {
    let children = this.$children
    let arr = []
    function find (children) {
      children.forEach(child => {
        if (child.$options.name === componentName) {
          arr.push(child)
        } else {
          if (child.$children) {
            find(child.$children)
          }
        }
      })
    }
    find(children)
    return arr

  }
}