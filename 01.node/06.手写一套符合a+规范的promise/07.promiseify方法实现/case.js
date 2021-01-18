const Promise = require('./index')
const fs = require('fs')

// 包装一层
const readFile = Promise.promisify(fs.readFile)
// 那就可以这么调用
readFile('./index.js').then(data => {
  console.log(data.toString(), '数据')
}, err => {
  console.log(err, '错误了')
})