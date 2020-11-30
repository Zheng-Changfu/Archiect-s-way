// const Promise = require('./index')
/**
 * Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象。
 * 如果这个值是一个 promise ，那么将返回这个 promise ；
 * 如果这个值是thenable（即带有"then" 方法），返回的promise会“跟随”这个thenable的对象，采用它的最终状态；
 * 否则返回的promise将以此值完成。此函数将类promise对象的多层嵌套展平
 *
 * Promise.reject()方法返回一个带有拒绝原因的Promise对象。
 */
// 测试普通值
// let p1 = Promise.resolve(1)
// p1.then(data => {
//   console.log(data) // 1
// })


// 测试成功的promise对象
// let p2 = Promise.resolve(new Promise((resolve, reject) => {
//   resolve(111)
// }))
// p2.then(data => {
//   console.log(data) // 111
// })

// 测试失败的promise对象
// let p3 = Promise.resolve(new Promise((resolve, reject) => {
//   reject(222)
// }))
// p3.then(data => {
//   console.log(data, 'data')
// }, reason => {
//   console.log(reason, 'reason')
// })

// 测试抛错
// let p4 = Promise.resolve(new Promise((resolve, reject) => {
//   throw new Error(11111)
// }))
// p4.then(data => {
//   console.log(data, 'data')
// }, reason => {
//   console.log(reason, 'reason')
// })

// 测试嵌套的promise
// let p5 = Promise.resolve(new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(555)
//     return new Promise((resolve, reject) => {
//       resolve(33)
//     })
//   })
// }))

// p5.then(data => {
//   console.log(data, 'data') // 555
// }, reason => {
//   console.log(reason, 'reason')
// })


// 测试普通值
// let p1 = Promise.reject(1)
// p1.then(data => {
//   console.log(data, 'data')
// }, err => {
//   console.log(err, 'err') // 1
// })


// 测试成功的promise对象
// let p2 = Promise.reject(new Promise((resolve, reject) => {
//   resolve(111)
// }))
// p2.then(data => {
//   console.log(data)
// }, err => {
//   console.log(err, 'err') // 111 
// })


// 测试失败的promise对象
// let p3 = Promise.reject(new Promise((resolve, reject) => {
//   reject(222)
// }))
// p3.then(data => {
//   console.log(data, 'data')
// }, reason => {
//   console.log(reason, 'reason') // 222 reason
// })

// 测试抛错
// let p4 = Promise.reject(new Promise((resolve, reject) => {
//   throw new Error(11111)
// }))
// p4.then(data => {
//   console.log(data, 'data')
// }, reason => {
//   console.log(reason, 'reason') // Promise { <rejected> 11111 } reason
// })

// 测试嵌套的promise
// let p5 = Promise.reject(new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(555)
//     return new Promise((resolve, reject) => {
//       resolve(33)
//     })
//   })
// }))

// p5.then(data => {
//   console.log(data, 'data')
// }, reason => {
//   console.log(reason, 'reason') // 555 reason
// })