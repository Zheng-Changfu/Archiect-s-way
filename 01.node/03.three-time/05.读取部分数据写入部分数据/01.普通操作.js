const fs = require('fs')
const path = require('path')

const buffer = Buffer.alloc(3)
fs.open(path.resolve(__dirname, './test.md'), 'r', 0o666, (err, fd) => {
  if (err) {
    return console.log(err)
  }
  // console.log(fd) // 读取到的是字节 22 
  /**
   * fd:文件描述符
   * buffer:写入哪个buffer
   * 0:从buffer的哪个位置开始写
   * 3:每次写入几个
   * 0:读取文件的位置
   */
  fs.read(fd, buffer, 0, 3, 0, (err, bytesRead) => {
    if (err) {
      return console.log(err)
    }
    // console.log(bytesRead) // 读取到的是真实字节的个数 一个中文字符代表3个字节
    // console.log(buffer, 'buffer') // <Buffer e6 83 a0>
    fs.open(path.resolve(__dirname, './copy.md'), 'w', (err, wfd) => {
      if (err) {
        return console.log(err)
      }
      fs.write(wfd, buffer, (err, written) => {
        if (err) {
          return console.log(err)
        }
        console.log(written, 'written') // 写入字节的个数
        // 关闭
        fs.close(fd, () => { })
        fs.close(wfd, () => { })
      })
    })
  })
})