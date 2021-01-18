const fs = require('fs')
const Event = require('events')
class ReadStream extends Event {
  // 初始化参数
  constructor(path, options) {
    super() // 继承父类Event的方法和属性
    this.path = path
    this.encoding = options.encoding || null
    this.fd = options.fd || null
    this.flags = options.flags || 'r'
    this.mode = options.mode || 0o666
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.end = options.end || undefined
    this.highWaterMark = options.highWaterMark || 64 * 1024 // 每次读取64kb
    this.offset = 0
    this.open() // 打开文件
    // 每次绑定事件都会触发此事件
    this.on('newListener', type => {
      if (type === 'data') {
        // 说明外界有绑定消费(data)事件
        this.read() // 读取文件
      }
    })
  }
  // 打开文件
  open () {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        this.destroy(err)
        return
      }
      if (!this.fd) {
        this.fd = fd
      }
      this.emit('open', fd)
    })
  }
  // 消费
  read () {
    if (!this.fd) {
      this.once('open', () => this.read())
    } else {
      const readBytes = this.end
        ? Math.min(this.highWaterMark, this.end - this.offset + 1)
        : this.highWaterMark
      const buffer = Buffer.alloc(readBytes)
      fs.read(this.fd, buffer, 0, readBytes, this.offset, (err, bytesRead) => {
        if (err) {
          this.destroy(err)
          return
        }
        if (bytesRead > 0) {
          // 正在读取
          this.emit('data', buffer)
          // 修正下次读取的偏移量
          this.offset += bytesRead
          // 递归读取
          this.read()
        } else {
          // 读完了
          this.destroy()
        }
      })
    }
  }
  // 错误或者关闭
  destroy (err) {
    if (err) {
      // 分发错误事件
      this.emit('error', err)
    } else {
      this.emit('end') // 分发读取结束事件
      if (this.autoClose) {
        fs.close(this.fd, () => {
          this.emit('close') // 分发关闭事件
        })
      }
    }
  }
}

module.exports = ReadStream