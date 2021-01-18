const fs = require('fs')
const path = require('path')
const ReadStream = require('./creatReadStream')
let arr = []
// const rs = fs.createReadStream(path.resolve(__dirname, './test.md'), {
const rs = new ReadStream(path.resolve(__dirname, './test.md'), {
  flags: 'r',
  mode: 0o666,
  autoClose: true,
  start: 0,
  encoding: null,
  highWaterMark: 3, // 每次读取3个字节
  // end: 4
})
rs.on('open', (fd) => {
  console.log(fd, 'fd')
})
rs.on('data', (chunk) => {
  arr.push(chunk)
  console.log(chunk, 'chunk')
})
rs.on('end', () => {
  console.log(Buffer.concat(arr).toString())
  console.log('end')
})
rs.on('close', () => {
  console.log('close')
})