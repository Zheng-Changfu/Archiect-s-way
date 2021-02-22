const Application = require('./application')
const Router = require('./router')
function createApplication () {
  return new Application()
}
// express.router 返回的是一个函数,function(req,res,next){} 
// 因为可以调用路由的所有方法，所以我们这里可以修改一下原型链
createApplication.Router = function () {
  const route = new Router()
  const router = function (req, res, next) {
    console.log(22222)
    route.handle(req, res, next)
  }
  router.__proto__ = route
  return router
}
module.exports = createApplication