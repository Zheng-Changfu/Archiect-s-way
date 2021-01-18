const fs = require('fs')
const path = require('path')

let position = 0
let size = 1
let buffer = Buffer.alloc(size)

// 可以基于流来实现 大文件的读取 
// fs中 createReadStream createWriteStream  基于stream模块来实现的
fs.open(path.resolve(__dirname, './test.md'), 'r', (err, rfd) => {
  fs.open(path.resolve(__dirname, './copy.md'), 'w', (err, wfd) => {
    function next () {
      fs.read(rfd, buffer, 0, size, position, (err, bytesRead) => {
        if (bytesRead > 0) { // 读到了内容
          fs.write(wfd, buffer, 0, bytesRead, position, (err, written) => {
            // 写入成功,修正下次读取位置
            position += bytesRead
            next()
          })
        } else { // 读取完毕
          fs.close(rfd, () => { })
          fs.close(wfd, () => { })
        }
      })
    }
    next()
  })
})