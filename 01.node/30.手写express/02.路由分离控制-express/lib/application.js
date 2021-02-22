// app 应用模块
const http = require('http')
const Router = require('./router')
function Application () {
  // express()调用之后就送一个路由系统实例
  this._router = new Router()
}
// app.get
/**
 * 
 * @param {*} path 接口路径
 * @param  {...any} handles 接口回调，可能是一个或者多个，不确定 
 */
Application.prototype.get = function (path, ...handles) {
  // 统一让路由系统去管理
  this._router.get(path, handles)
}
// app.listen
Application.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    this._router.handle(req, res, this.toErrorResponse.bind(this))
  })
  server.listen(...args)
}
Application.prototype.toErrorResponse = function (req, res) {
  res.end(`Error ${req.method} ${req.url}`)
}
module.exports = Application