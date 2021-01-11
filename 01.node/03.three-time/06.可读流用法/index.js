const fs = require('fs')
const path = require('path')
const arr = []
const rs = fs.createReadStream(path.resolve(__dirname, './test.md'), {
  flags: 'r',
  encoding: null,
  mode: 0o666,
  autoClose: true,
  start: 0,
  highWaterMark: 3 // 每次读取3个字节
})
rs.on('open', (fd) => {
  console.log(fd, 'fd')
})
rs.on('data', (chunk) => {
  arr.push(chunk)
  console.log(chunk, 'chunk')
})
rs.on('end', () => {
  console.log('end')
  console.log(Buffer.concat(arr).toString())
})
rs.on('close', () => {
  console.log('close')
})