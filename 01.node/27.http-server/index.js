const http = require('http')
const fs = require('fs').promises
const url = require('url')
const path = require('path')
const mime = require('mime')
const chalk = require('chalk')
const ejs = require('ejs')
const { createReadStream } = require('fs')
class Server {
  constructor(options) {
    this.port = options.port
    this.directory = options.directory
    this.cache = options.cache
  }
  // 处理请求
  async handleRequest (req, res) {
    let { pathname } = url.parse(req.url)
    // 解决中文路径转成buffer问题
    pathname = decodeURIComponent(pathname)
    // 拼接文件路径
    const filePath = path.join(this.directory, pathname)
    try {
      // 读取文件信息
      const statObj = await fs.stat(filePath)
      // 如果是目录
      if (statObj.isDirectory()) {
        // 读取目录
        const dirs = await fs.readdir(filePath)
        const strHtml = await ejs.renderFile(path.resolve(__dirname, './template.html'), {
          dirs: dirs.map(item => {
            return {
              pathname: item,
              path: path.join(pathname, item)
            }
          })
        })
        // 返回目录列表
        this.sendDirectory(strHtml, res)
        // 服务端渲染
      } else {
        // 如果是文件
        this.sendFile(filePath, res)
      }
    } catch (error) {
      this.sendError(error, res)
    }
  }

  // 返回文件
  sendFile (file, res) {
    // 获取文件类型
    const fileType = mime.getType(file)
    // 设置响应头
    res.setHeader('Content-type', `${fileType};charset=utf-8`)
    // 返回
    createReadStream(file).pipe(res)
  }

  // 返回目录
  sendDirectory (html, res) {
    res.setHeader('Content-type', 'text/html;charset=utf-8')
    res.end(html)
  }

  // 返回错误
  sendError (err, res) {
    res.statusCode = 404
    createReadStream(path.resolve(__dirname, './404.html')).pipe(res)
  }

  // 启动服务
  start () {
    const server = http.createServer(this.handleRequest.bind(this))
    server.listen(this.port, () => {
      console.log(chalk.yellow('Server is Running...'))
      console.log(`http://127.0.0.1:${chalk.green(this.port)}`)
    })
  }
}

module.exports = Server