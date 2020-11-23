const Promise = require('./index')
let p2 = new Promise((resolve, reject) => {
  console.log(111)
  setTimeout(() => {
    resolve(333)
  }, 1000)
})
p2.then(value => {
  console.log(value)
}, reason => {
  console.log(reason)
})
console.log(222)