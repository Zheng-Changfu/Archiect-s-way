
const Router = require('./router')
function Application () {
  // 初始化路由实例
  this._router = new Router()
}
Application.prototype.get = function (path, callback) {
  this._router.get(path, callback)
}
Application.prototype.listen = function (...args) {
  this._router.handle(this.toErrorResponse, ...args)
}
Application.prototype.toErrorResponse = function (req, res) {
  res.end(`Error ${req.method} ${req.url}`)
}


module.exports = Application