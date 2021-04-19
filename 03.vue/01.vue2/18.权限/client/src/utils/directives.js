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
        el.parentNode.removeChild(el)
      }
    }
  }
}