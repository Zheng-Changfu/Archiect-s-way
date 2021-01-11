const fs = require('fs')
const path = require('path')

// node中fs方法分为2种，同步和异步
// 同步操作会阻塞，我们一般都使用异步的方法
// 异步操作node中很常见，一般都是通过回调函数的方法通知我们，第一个参数一般都是为error


// 优点:不会阻塞，读取速度快，适用于小文件(小于64kb的都属于小文件)
// 缺点:不适用大文件读写操作，，因为是把所有的数据都读完在进行写入的，可能会导致内存溢出
// 解决方式: 可以读取一点写入一点，可以通过 fs.open,fs.read,fs.write
fs.readFile(path.resolve(__dirname, './test.md'), (err, data) => {
  if (err) {
    return console.log(err)
  }
  fs.writeFile(path.resolve(__dirname, './copy.md'), data, (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('copy success')
  })
})