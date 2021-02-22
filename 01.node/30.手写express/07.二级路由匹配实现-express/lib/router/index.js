const url = require('url')
const methods = require('methods')
const Layer = require('./layer')
const Route = require('./route')
class Router {
  constructor() {
    this.stack = []
    // 保存要被删除的路径
    this.removePath = ''
  }
  route (path) {
    const route = new Route()
    const layer = new Layer(path, route.dispatch.bind(route))
    layer.route = true
    this.stack.push(layer)
    return route
  }
  use (path, handles) {
    // 如果外面只传了一个参数
    // 如:app.use(function(req,res,next){})
    // 修正path和handles
    console.log(handles, 'handles')
    if (!handles.length) {
      handles = [path]
      path = '/'
    }
    if (typeof handles === 'function') {
      handles = Array.from(arguments).slice(1)
    }
    // 遍历中间件里面的回调函数
    handles.forEach(handle => {
      const layer = new Layer(path, handle)
      // 区分是否为中间件，之前我们埋下的伏点就有用了
      layer.route = false
      // 追加到容器中
      this.stack.push(layer)
    })
  }
  handle (req, res, toError) {
    const { pathname } = url.parse(req.url)
    let index = 0
    const next = (err) => {

      if (index >= this.stack.length) {
        // 如果外界没有写中间件，我们也应该手动返回一个错误的响应
        return err ? toError(req, res, err) : toError(req, res)
      }

      const layer = this.stack[index++]
      if (err) {
        // 我们需要去找错误处理中间件
        // 先排除掉路由
        if (!layer.route) {
          // 函数.length === 参数的个数
          if (layer.handle.length === 4) {
            // 触发中间件
            layer.handle(err, req, res, next)
          } else {
            next(err)
          }
        } else {
          // 是路由就跳过进行下一个，把错误向下传递
          next(err)
        }
      } else {
        console.log(pathname, 'pathname')
        if (pathname !== null && layer.match(pathname)) { // layer.path = '/user' pathname= '/user/add'
          req.params = layer.params || {} // 挂载到req上
          // 如果是中间件并且不是错误中间件并且路径不是/
          if (!layer.route && layer.handle.length !== 4 && layer.path !== '/') {
            // 移除中间件路径，然后调用dispatch方法进去匹配路由，此时路由就可以匹配上了
            // 保存要删除的路径
            this.removePath = layer.path
            req.url = req.url.slice(this.removePath.length) // 删除路径 /user/add会删除/user
          }
          // 如果是二级路由，那么这里调用的其实是express.Router()函数，这个函数会让我们再次调用handle方法，然后进来
          // 如果路由经过这里，那么走的是dispatch进里面继续比对方法，如果是中间件走，那么这个handle就是真实的用户回调，直接调用即可
          layer.handle(req, res, next)
        } else {
          next(err)
        }
      }
    }
    next()
  }
}
methods.forEach(method => {
  Router.prototype[method] = function (path, handles) {
    // 因为之前是app调用的，app那边处理了handles，但是如果是router调用的，这里的handles有可能不是数组，有可能还不止一个
    // 所以我们要处理一下
    if (!Array.isArray(handles)) {
      // 可能不止一个
      handles = Array.from(arguments).slice(1)
    }
    const route = this.route(path)
    route[method](handles)
  }
})
module.exports = Router