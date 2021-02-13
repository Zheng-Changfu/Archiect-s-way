/**
 * 协商缓存: 由服务器告诉浏览器是否要访问本地缓存的资源
 *     优点: 服务端资源更新，客户端也能访问到最新的资源
 *     缺点: 客户端每次都要发送请求给服务端
 */
const http = require('http')
const url = require('url')
const fs = require('fs').promises
const { createReadStream } = require('fs')
const path = require('path')
const mime = require('mime')

const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url)
  const filePath = path.join(__dirname, pathname)
  const fileType = mime.getType(filePath)
  // 告诉浏览器每次都要发请求，因为浏览器有默认的强制缓存时间
  // no-cache :  每次都是需要发送请求给服务端
  // no-store :  客户端不缓存
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Content-type', `${fileType};charset=utf-8`)
  const statInfo = await fs.stat(filePath)
  if (statInfo.isFile()) {
    const ctime = statInfo.ctime.toUTCString()
    if (req.headers['if-modified-since'] === ctime) {
      // 说明修改时间一样，就让客户端走缓存
      res.statusCode = 304
      return res.end()
    }
    /**
     * 设置响应头Last-Modified，下次客户端请求会携带一个请求头 if-modified-since,服务端会用if-modified-since的值和Last-Modified值进行比较，如果一样，说明文件没
     * 动过，就可以让客户端访问本地缓存的资源,如果动过，就返回最新的资源，然后在设置新的响应头Last-Modified覆盖之前的
     */
    res.setHeader('Last-Modified', ctime)
    createReadStream(filePath).pipe(res)
  } else {
    res.statusCode = 404
    return res.end('not found')
  }
})

server.listen(3000, (err) => {
  if (err) return console.log(err)
  else console.log('server is running...')
})