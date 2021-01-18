// const Promise = require('./index')

// 测试
// let p1 = new Promise((resolve, reject) => {
//   resolve(1)
// })
// let p2 = new Promise((resolve, reject) => {
//   reject(2)
// })
// let res1 = Promise.race([p1, p2])
// res1.then(value => {
//   console.log(value, 'value') // 1
// }, reason => {
//   console.log(reason, 'reason')
// })

// let res2 = Promise.race([p2, p1])
// res2.then(value => {
//   console.log(value, 'value')
// }, reason => {
//   console.log(reason, 'reason') // 2
// })

// let res3 = Promise.race([p1, p2, 3])
// res3.then(value => {
//   console.log(value, 'value') // 1
// }, reason => {
//   console.log(reason, 'reason')
// })

// let res4 = Promise.race([3, p1, p2])
// res4.then(value => {
//   console.log(value, 'value') // 3
// }, reason => {
//   console.log(reason, 'reason')
// })