/**
 * cookie:因为http是无状态协议，cookie是用来识别身份的，每次发送请求，客户端都会自动携带所有cookie，要合理设置cookie，不要设置太多，可能会造成页面白屏
 */
const http = require('http')

const server = http.createServer((req, res) => {
  const url = req.url
  if (url === '/read') {
    const value = req.headers['cookie']
    res.end(value)
  } else if (url === '/write') {
    // httpOnly设置为true只能防止代码的方式（document.cookie）不能修改
    // 如果直接在Application中更改我们是没办法阻止的，不安全
    res.setHeader('Set-Cookie', ['name=zcf; max-age=10; httpOnly=true', 'age=19'])
    res.end('write ok')
  } else {
    res.end('not found')
  }
})

server.listen(3000)