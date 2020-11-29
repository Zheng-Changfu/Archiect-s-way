// const Promise = require('./index')
/**
 * finally() 方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。
 * 这为在Promise是否成功完成后都需要执行的代码提供了一种方式。
   这避免了同样的语句需要在then()和catch()中各写一次的情况。
 */
// let p1 = Promise.resolve(1)
// // 成功情况
// p1
//   .then(val => val)
//   .finally(function (value) {
//     console.log(value) // undefined 
//   })
//   .then(data => {
//     console.log(data, 'data') // 1 
//   }, err => {
//     console.log(err, 'err')
//   })

// 失败情况
// let p2 = Promise.resolve(1)
// p2
//   .then(val => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         reject(val)
//       })
//     })
//   })
//   .finally(function (value) {
//     console.log(value) // undefined
//   })
//   .then(data => {
//     console.log(data, 'data')
//   }, err => {
//     console.log(err, 'err') // 1 
//   })

// 抛错情况
// let p2 = Promise.resolve(1)
// p2
//   .then(val => {
//     throw val
//   })
//   .finally(function (value) {
//     console.log(value) // undefined
//   })
//   .then(data => {
//     console.log(data, 'data')
//   }, err => {
//     console.log(err, 'err') // 1 
//   })