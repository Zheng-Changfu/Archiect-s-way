const http = require('http')
const methods = require('methods')
const Router = require('./router')
class Application {
  constructor() {
    this._router = new Router()
  }
  listen (...args) {
    const server = http.createServer((req, res) => {
      this._router.handle(req, res, this.toErrorResponse.bind(this))
    })
    server.listen(...args)
  }
  toErrorResponse (req, res, err) {
    res.setHeader('Content-type', 'text/plain;charset=utf-8')
    return err ? res.end('路由/中间件 出错了') : res.end(`Error ${req.method} ${req.url}`)
  }
  use (path, ...handles) {
    // 交给路由系统统一处理
    this._router.use(path, handles)
  }
}
methods.forEach(method => {
  Application.prototype[method] = function (path, ...handles) {
    this._router[method](path, handles)
  }
})
module.exports = Application
