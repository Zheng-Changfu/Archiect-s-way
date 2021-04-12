function createRoute (record, location) {
  let matched = []
  if (record) {
    while (record) {
      if (record) {
        matched.unshift(record)
      }
      record = record.parent
    }
  }
  return {
    ...location,
    matched
  }
}
export default class History {
  constructor(router) {
    this.router = router
    this.current = createRoute(null, {
      path: '/'
    }) // {path:'/',matched:[]}
  }
  listen (cb) {
    this.callback = cb
  }
  transtionTo (path, cb) {
    // 当路径发生变化，渲染组件,那我们要收集匹配到的组件
    // 比如跳转到/about/a，我们要收集/about和/aboutA组件
    // 找到匹配的记录
    const record = this.router.match(path)
    // current属性变化，要渲染视图，所以我们要将current属性变成响应式属性
    const route = createRoute(record, { path })
    // 防止重复跳转
    if (route.path === this.current.path && route.matched.length === this.current.matched.length) return
    this.current = route
    this.callback && this.callback(this.current)
    cb && cb()
  }
}