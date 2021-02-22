const Layer = require('./layer')
function Route () {
  // 存放用户真实回调的栈
  this.stack = []
}
/**
 * 
 * @param {*} handles 用户真实的回调
 */
Route.prototype.get = function (handles) {
  for (let i = 0; i < handles.length; i++) {
    const callback = handles[i]
    // 这个路径无所谓，因为外层layer已经处理路径了，这里我们只需要处理用户回调即可
    const layer = new Layer('*', callback)
    layer.method = 'get'
    this.stack.push(layer)
  }
}
Route.prototype.dispatch = function (req, res, next) {
  let index = 0
  const callbacks = () => {
    if (index >= this.stack.length) return next() // 如果方法都没有匹配到，那就出去匹配下一个路径
    const method = req.method.toLowerCase()
    const layer = this.stack[index++]
    // 这里的dispatch是请求方法
    if (layer.method === method) {
      // 这里调用的是外层用户真实的回调,外层用户函数中的next === callbacks
      layer.dispatch(req, res, callbacks)
    } else {
      callbacks()
    }
  }
  callbacks()
}
module.exports = Route