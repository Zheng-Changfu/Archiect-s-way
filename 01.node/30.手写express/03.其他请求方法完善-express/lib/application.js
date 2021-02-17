// app 应用模块
const http = require('http')
const methods = require('methods') // 因为之前下载了express包，express包中自带methods包
const Router = require('./router')
// console.log(methods, 'methods') // 所有的请求方法组成的数组，不限于get/post/delete/put
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
for (let i = 0; i < methods.length; i++) {
  const method = methods[i]
  Application.prototype[method] = function (path, ...handles) {
    // 统一让路由系统去管理
    this._router[method](path, handles)
  }
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