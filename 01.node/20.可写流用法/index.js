const fs = require('fs')
const path = require('path')

const ws = fs.createWriteStream(path.resolve(__dirname, './copy.md'), {
  flags: 'w',
  encoding: null,
  mode: 0o666,
  autoClose: true,
  highWaterMark: 3 // 期望写入的字节数，默认为16kb,如果达到期望值，会触发drain事件，并且write返回值为false
})
ws.on('drain', () => {
  console.log('我触发了')
  write()
})
let index = 0
function write () {
  let writting = true
  while (index < 10) {
    writting = ws.write(index + '')
    index++
    if (!writting) break;
  }
}
write()