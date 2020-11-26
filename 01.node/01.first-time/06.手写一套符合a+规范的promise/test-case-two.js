// 测试 promise return value not equal and one a promise
const Promise = require('./index')
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(333)
  }, 1000)
})
let p2 = p1.then(value => {
  return p2
})

