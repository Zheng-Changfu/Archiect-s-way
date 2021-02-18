// cache: 服务端主要的功能是告诉浏览器需不需要缓存
// 浏览器会将访问过的资源缓存起来
// 我希望引用的资源在没有变化的情况下，去使用默认的浏览器缓存就行了
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs').promises
const { createReadStream } = require('fs')
const mime = require('mime')

const server = http.createServer(async (req, res) => {
  // no-cache : 每次都要访问服务器
  // no-store : 不缓存，浏览器不缓存文件
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Expires', new Date(Date.now() + 30 * 1000).toUTCString())
  const { pathname } = url.parse(req.url)
  console.log(pathname, 'pathname')
  const filePath = path.join(__dirname, pathname)
  try {
    const statInfo = await fs.stat(filePath)
    if (statInfo.isFile()) {
      const type = mime.getType(filePath)
      res.setHeader('Content-type', type + ';charset=utf-8')
      createReadStream(filePath).pipe(res)
    } else {
      res.end('not fount')
    }
  } catch (error) {
    res.end('not found')
  }
})
server.listen(3000)