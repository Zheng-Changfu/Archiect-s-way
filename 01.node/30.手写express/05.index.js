const express = require('./05.错误处理中间件实现-express/lib')
// const express = require('express')
const app = express()
// 如果next中有参数，那么就代表出错了，就会跳过所有路由和中间件，直接找错误处理中间件去执行
// 错误处理中间件特点：本身是一个中间件，只不过有4个参数，分别是err,req,res,next
app.use(function (req, res, next) {
  console.log(0)
  next('出错了')
  // next()
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
app.get('/', function (req, res, next) {
  console.log(req.a) // 1
  // next('路由出错了')
  res.end('ok')
})
app.get('/home/user', function (req, res) {
  console.log(req.a) // 2
  res.end('login ok')
})
app.use(function (err, req, res, next) {
  res.end(err)
})
app.listen(3000)