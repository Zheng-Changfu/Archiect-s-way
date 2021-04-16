// 用户信息 token 路由菜单 按钮权限
const express = require('express')
const cors = require('cors')
const userRouter = require('./router/user')
const listRouter = require('./router/list')
const config = require('./config')
const app = express()


require('./db')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(listRouter)
app.use('/user', userRouter)

app.listen(config.port, config.host, err => {
  if (!err) console.log(`服务器启动成功，http://${config.host}:${config.port}`)
})