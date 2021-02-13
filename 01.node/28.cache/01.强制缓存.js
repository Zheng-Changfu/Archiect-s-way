/**
 * 强制缓存:服务端设置缓存主要就是用来告诉浏览器被引用资源需不需要被缓存，因为浏览器默认可以缓存文件
 *    优点: 减少请求，直接读取本地已经缓存的资源，速度很快
 *    缺点: 如果缓存的资源被修改过，客户端不知道，导致用的还是老的
 */
const http = require('http')
const url = require('url')
const { createReadStream } = require('fs')
const path = require('path')
const mime = require('mime')

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url)
  const filePath = path.join(__dirname, pathname)
  // 强制缓存(memory-cache),设置特定字段- Cache-Control,10s内不要访问服务器了，只有被引用资源才会被缓存，直接访问的资源不会被强制缓存
  res.setHeader('Cache-Control', 'max-age=10')
  res.setHeader('Content-type', `${mime.getType(filePath)};charset=utf-8`) // utf8也可以，但是ie不支持
  createReadStream(filePath).pipe(res)
})

server.listen(3000, (err) => {
  if (err) return console.log(err)
  else console.log('server is running...')
})
