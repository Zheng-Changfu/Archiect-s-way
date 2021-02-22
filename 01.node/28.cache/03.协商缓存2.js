const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs').promises
const { createReadStream } = require('fs')
const crypto = require('crypto') // node中所有的加密包
const mime = require('mime')

const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url)
  const filePath = path.join(__dirname, pathname)
  const fileType = mime.getType(filePath)
  const statInfo = await fs.stat(filePath)
  if (statInfo.isFile()) {
    // 创建MD5摘要算法，不可逆的
    const etag = crypto.createHash('md5').update(await fs.readFile(filePath)).digest('base64')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Etag', etag)
    // 因为if-modified-since时间不一定很准确，因为假设文件没变，时间变了就不行，假如在文件里面写了一些代码，然后又删除了，文件其实没变，但是时间变了
    if (req.headers['if-none-match'] === etag) {
      res.statusCode = 304
      res.end()
    } else {
      res.setHeader('Content-type', `${fileType};charset=utf-8`)
      createReadStream(filePath).pipe(res)
    }
  } else {
    res.statusCode = 404
    res.end('not found')
  }
})

server.listen(3000, err => {
  if (err) return console.log(err)
  console.log('server is running...')
})