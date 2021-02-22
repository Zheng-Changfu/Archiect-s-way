const methods = require('methods')
const Layer = require('./layer')
class Route {
  constructor() {
    this.stack = []
  }
  dispatch (req, res, out) {
    let index = 0
    const request_method = req.method.toLowerCase()
    const next = (err) => {
      if (err) {
        // 说明外界next函数中传递了错误,我们需要跳出去，直接找错误中间件即可
        return out(err)
      }
      if (index >= this.stack.length) return out()
      const layer = this.stack[index++]
      if (layer.compare(request_method)) {
        layer.handle(req, res, next)
      } else {
        next()
      }
    }
    next()
  }
}
methods.forEach(method => {
  Route.prototype[method] = function (handles) {
    handles.forEach(handle => {
      const layer = new Layer('*', handle)
      layer.method = method
      this.stack.push(layer)
    })
  }
})
module.exports = Route