const Promise = require('./index')
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 2000)
})
let p2 = new Promise((resolve, reject) => {
  resolve('p2')
})
let p3 = new Promise((resolve, reject) => {
  resolve('p3')
})
Promise.all([p1, p2, p3, 'p4']).then(value => {
  console.log(value, 'value~~~')
}, reason => {
  console.log(reason, 'reason~~~')
})
