const http = require('http')
const url = require('url')
function Router () {
  // 存放路由信息的栈
  this.stack = []
}
Router.prototype.get = function (path, callback) {
  this.stack.push({
    path,
    method: 'get',
    callback
  })
}
Router.prototype.handle = function (done, ...args) {
  const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url)
    const requestMethod = req.method.toLowerCase()
    for (let i = 0; i < this.stack.length; i++) {
      const { path, callback, method } = this.stack[i]
      if (path === pathname && method === requestMethod) {
        return callback(req, res)
      }
    }
    done(req, res)
  })
  server.listen(...args)
}
module.exports = Router