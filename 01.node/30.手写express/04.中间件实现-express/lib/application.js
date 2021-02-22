const http = require('http')
const methods = require('methods')
const Router = require('./router')
function Application () {
  this._router = new Router()
}
methods.forEach(method => {
  Application.prototype[method] = function (path, ...handles) {
    this._router[method](path, handles)
  }
})
Application.prototype.use = function (path, ...handles) {
  // 中间件匹配路径开头，不需要去匹配方法
  this._router.use(path, handles)
}
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