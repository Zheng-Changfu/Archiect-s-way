const express = require('./04.中间件实现-express/lib')
// const express = require('express')
const app = express()
// 中间件路径匹配开头即可，但是不可以这样,中间件路径：/home ，路由路径: /home1，这样是匹配不到的
// 中间件可以做拦截功能，或者处理公共问题，比如解析请求体，解决跨域，还可以在中间件做一些参数，然后把参数把下传递
app.use(function (req, res, next) {
  console.log(0)
  next()
})
app.use('/', function (req, res, next) {
  console.log(111)
  req.a = 1
  next()
})
app.use('/home', function (req, res, next) {
  console.log(2222)
  req.a = 2
  next()
})
app.get('/', function (req, res) {
  console.log(req.a) // 1
  res.end('ok')
})
app.get('/home/user', function (req, res) {
  console.log(req.a) // 2
  res.end('login ok')
})
app.listen(3000)