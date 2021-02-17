const url = require('url')
const methods = require('methods')
const Route = require('./route')
const Layer = require('./layer')
function Router () {
  this.stack = []
}
Router.prototype.route = function (path) {
  const route = new Route()
  const layer = new Layer(path, route.dispatch.bind(route))
  layer.route = true
  this.stack.push(layer)
  return route
}
methods.forEach(method => {
  Router.prototype[method] = function (path, ...handles) {
    const route = this.route(path)
    route[method](handles)
  }
})
Router.prototype.use = function (path, handles) {
  if (!handles.length) {
    // 说明外面只传了一个参数
    handles = path
    path = '/'
    if (!Array.isArray(handles)) {
      handles = [handles]
    }
  }
  handles.forEach(handle => {
    const layer = new Layer(path, handle)
    layer.route = false
    this.stack.push(layer)
  })
}
Router.prototype.handle = function (req, res, toError) {
  const { pathname } = url.parse(req.url)
  let index = 0
  let removedPath = ''
  const next = (err) => {
    if (index >= this.stack.length) return toError(req, res)
    const layer = this.stack[index++]
    if (removedPath.length) {
      req.url = removedPath + req.url
      removedPath = ''
    }
    if (err) {
      // 找错误处理中间件
      if (!layer.route) {
        // 参数为4个就认为是错误处理中间件
        if (layer.handle.length === 4) {
          layer.handle(err, req, res, next)
        } else {
          // 不是4个就跳过，进行下一个路由/中间件判断
          next(err)
        }
      } else {
        next(err)
      }
    } else {
      if (layer.match(pathname)) {
        req.params = layer.params
        if (layer.path !== '/') {
          removedPath = layer.path
          req.url = pathname.slice(removedPath.length)
        }
        // 这里的方法路由和中间件都会走，如果是路由走，会调用dispatch函数，如果是中间件走，调用的就是真实的用户回调
        layer.handle_request(req, res, next)
      } else {
        next()
      }
    }
  }
  next()
}
module.exports = Router