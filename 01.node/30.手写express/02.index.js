const express = require('./02.路由分离控制express/lib')
const app = express()

app.get('/', function (req, res, next) {
  console.log(1)
  next()
  console.log(2)
}, function (req, res, next) {
  console.log(3)
  next()
  console.log(4)
}, function (req, res, next) {
  console.log(5)
  next()
  console.log(6)
})
app.get('/', function (req, res) {
  res.end('home ok')
})
app.get('/login', function (req, res) {
  res.end('login ok')
})
app.listen(3000)