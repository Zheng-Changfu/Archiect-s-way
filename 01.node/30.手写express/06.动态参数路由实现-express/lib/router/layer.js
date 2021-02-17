const pathToRegExp = require('path-to-regexp')
function Layer (path, handle) {
  this.path = path
  this.regExp = pathToRegExp(this.path, this.keys = [])
  this.handle = handle
}
Layer.prototype.match = function (pathname) {
  // 路径完全一样，路由是完全匹配，中间件是包含
  if (this.path === pathname) {
    return true
  }
  if (!this.route) {
    // 中间件,开头如果是/,可以匹配所有路径
    if (this.path === '/') {
      return true
    } else {
      // 如果不是/,那么就判断pathname是否以this.path开头
      // 还要防止这种请求,假设路径是 /home1 ,写的路径是/home/user,也是匹配不到的，所以我们直接在path后面拼接/去比对
      return pathname.startsWith(this.path + '/')
    }
  } else {
    // 路由
    // 动态路由匹配
    // console.log(this.keys, 'keys') // [{ name: 'id', optional: false, offset: 7 },{ name: 'key', optional: false, offset: 22 }]
    // console.log(this.regExp, 'regexp') // /^\/home\/(?:([^\/]+?))\/(?:([^\/]+?))\/zcf\/?$/i
    const [, ...matches] = pathname.match(this.regExp)
    // console.log(matches, 'matches') // [ '1', '2' ]
    if (matches.length) {
      this.params = this.keys.reduce((p, c, i) => {
        p[c.name] = matches[i]
        return p
      }, {})
      // console.log(this.params, 'this.params') // { id: '1', key: '2' }
      return true
    }
  }
  // 如果都没有匹配上，就返回false
  return false
}
module.exports = Layer