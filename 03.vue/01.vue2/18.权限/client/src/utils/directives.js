<<<<<<< HEAD
export default {
  // 按钮权限
  'has-permission': {
    inserted (el, bindings, vnode) {
      // 拿到当前用户的按钮权限列表
      let btnlist = vnode.context.$store.state.user.btnlist
      // 拿到当前绑定的值
      let value = bindings.value
      if (!btnlist.includes(value)) {
        // 删除
=======

export default {
  'has-permission': {
    inserted (el, bindings, vnode) {
      // 看store中请求回来的权限数组
      const permisisons = vnode.context.$store.state.user.btnlist
      if (!permisisons.includes(bindings.value)) {
>>>>>>> 3dd732ed07879ec04d035d81c0b614cb37303250
        el.parentNode.removeChild(el)
      }
    }
  }
}