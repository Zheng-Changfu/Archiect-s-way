const PathToRegExp = require('path-to-regexp')
class Layer {
  constructor(path, handle) {
    this.path = path
    // 将路径转成正则
    this.regexp = PathToRegExp(this.path, this.keys = [])
    this.handle = handle
  }
  match (pathname) {
    // 区分是否为中间件
    const isMiddware = !this.route
    // 完全匹配
    if (this.path === pathname) {
      return true
    }
    // 中间件是模糊匹配的
    if (isMiddware) {
      // 假设路径是/,那么我们是不需要管的，可以匹配所有
      if (this.path === '/') {
        return true
      }
      // 假设中间件路径为/test1,请求路径为/test1/a,是可以匹配到的，但是请求路径如果为/test12/a,是匹配不到的
      // 那么我们就可以匹配是否以/test1/开头即可
      return pathname.startsWith(this.path + '/')
    } else {
      // 一般像这种动态路径只有路由会去做，中间件一般不考虑，所以我们这里只处理路由
      const r = pathname.match(this.regexp)
      if (r) {
        // console.log(r, 'r') // ['/sgg/1/2/qd', '1', '2']
        const [, ...handles] = r
        // console.log(handles, 'handles') // ['1','2']
        // 将{id:'1',name:'2'}赋值到layer实例上
        this.params = handles.reduce((p, c, i) => {
          p[this.keys[i].name] = c
          return p
        }, {})
        return true
        // console.log(this.params) // { id: '1', name: '2' }
      }
    }
    // 如果不是中间件，那么就是路由，路由是完全匹配的，所以这里我们返回false即可
    return false
  }
  compare (method) {
    return this.method === method
  }
}
module.exports = Layer