// const Promise = require('./index')

// let p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(11)
//   })
// })
/**
 * 也就是说then内部的两个回调函数可以不传，如果不传，就默认返回一个函数，函数内部值向下透传
 */
// p1.then().then().then(value => {
//   console.log(value) // 11
// })
// 上面这种透传的写法相当于这种写法
// p1
//   .then(value => {
//     return value
//   })
//   .then(value => {
//     return value
//   })
//   .then(value => {
//     console.log(value)
//   })





// let p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject(22)
//   })
// })
// p1.then().then().then(null, err => {
//   console.log(err) // 22
// })

// 上面这种透传的写法相当于这种写法
// p1
//   .then(null, err => {
//     throw err
//   })
//   .then(null, err => {
//     throw err
//   })
//   .then(null, err => {
//     console.log(err)
//   })
