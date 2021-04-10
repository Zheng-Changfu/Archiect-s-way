/**
 * 同构:
 *  2套代码，分别对应客户端，服务端
 *  打包出来的服务端代码给服务器用，生成字符串渲染给客户端
 *  打包出来的客户端代码js插入到服务端代码中，用来实现页面的交互功能
 *  
 *  服务端js用来渲染字符串
 *  客户端js用来渲染页面交互效果
 */

const express = require('express')
const app = express()
const path = require('path')
const VueServerRenderer = require('vue-server-renderer')
const fs = require('fs')

const template = fs.readFileSync(path.resolve(__dirname, 'dist/server.html'), 'utf-8')
const serverBundle = fs.readFileSync(path.resolve(__dirname, 'dist/server.bundle.js'), 'utf-8')

app.use(express.static(path.resolve(__dirname, 'dist')))
const render = VueServerRenderer.createBundleRenderer(serverBundle, {
  template
})


// app.use(express.static(path.resolve(__dirname, 'dist')))
app.get('/', async (req, res) => {
  // 每次会调用函数，生成新的实例
  let html = await new Promise((resolve, reject) => {
    render.renderToString((err, html) => {
      if (err) {
        reject(err)
      }
      resolve(html)
    })
  })
  console.log(html, 'html')
  res.send(html)
})


app.listen(3000)