/**
 * 路由系统:
 *      思路:
 *          此栈中存放Layer实例,实例中包含真实路径和触发用户真实回调的方法(dispatch),因为可能用户有多个回调
 */
const url = require('url')
const methods = require('methods')
const Layer = require('./layer')
const Route = require('./route')
function Router () {
  // 存放请求路径和触发用户回调(dispatch)的栈
  this.stack = []
}
Router.prototype.route = function (path) {
  const route = new Route()
  const layer = new Layer(path, route.dispatch.bind(route))
  this.stack.push(layer)
  return route
}
for (let i = 0; i < methods.length; i++) {
  const method = methods[i]
  Router.prototype[method] = function (path, handles) {
    // 让layer和route建立关系，外层layer检测路径，里层layer检测方法回调
    const route = this.route(path)
    route[method](handles)
  }
}

Router.prototype.handle = function (req, res, toError) {
  let index = 0
  const { pathname } = url.parse(req.url)
  const next = () => {
    if (index >= this.stack.length) return toError(req, res)
    const layer = this.stack[index++]
    // 如果路径相等，就去route实例层去比对方法，如果方法一样，就调用回调
    if (pathname === layer.path) {
      layer.dispatch(req, res, next) // next传递过去主要是为了让里层route可以拥有匹配下一个路由路径的权限
    } else {
      // 匹配下一个路由路径
      next()
    }
  }
  next()
}
module.exports = Router