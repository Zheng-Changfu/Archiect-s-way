const express = require('./07.二级路由匹配实现-express/lib')
const user = require('./routes/user')
const comment = require('./routes/comment')
const app = express()

app.use('/user', user)
app.use('/comment', comment)

app.listen(3000)