const methods = require('methods')
const Layer = require('./layer')
function Route () {
  this.stack = []
}
Route.prototype.dispatch = function (req, res, out) {
  let index = 0
  const method = req.method.toLowerCase()
  const next = () => {
    if (index >= this.stack.length) return out()
    const layer = this.stack[index++]
    if (layer.method === method) {
      layer.handle(req, res, next)
    } else {
      next()
    }
  }
  next()
}
methods.forEach(method => {
  Route.prototype[method] = function (handles) {
    handles.forEach((handle) => {
      const layer = new Layer('*', handle)
      layer.method = method
      this.stack.push(layer)
    })
  }
})
module.exports = Route