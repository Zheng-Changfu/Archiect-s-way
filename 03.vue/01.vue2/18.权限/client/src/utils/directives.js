
export default {
  'has-permission': {
    inserted (el, bindings, vnode) {
      // 看store中请求回来的权限数组
      const permisisons = vnode.context.$store.state.user.btnlist
      if (!permisisons.includes(bindings.value)) {
        el.parentNode.removeChild(el)
      }
    }
  }
}