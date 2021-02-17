const express = require('./01.简化版express/lib')
// express 本身是一个函数，函数调用返回一个应用app
const app = express()
// 路由1
app.get('/', function (req, res) {
  res.end('home')
})
// 路由2
app.get('/login', function (req, res) {
  res.end('login ok')
})

app.listen(3000, err => {
  if (err) return console.log(err)
  else console.log('server is running')
})