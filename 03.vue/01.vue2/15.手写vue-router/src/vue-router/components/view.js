export default {
  functional: true,
  render: (h, { parent, data }) => {
    let route = parent.$route
    let depth = 0
    while (parent) {
      // $vnode ==> 组件占位符
      const vnodeData = parent.$vnode ? parent.$vnode.data : {}
      if (vnodeData.routerView) {
        // 找到父级router-view就加1,就渲染下一个组件
        depth++
      }
      parent = parent.$parent
    }
    
    let record = route.matched[depth]
    if (!record) {
      // 没有匹配到,空渲染
      return h()
    }
    data.routerView = true
    return h(record.component, data)
  }
}