const Promise = require('./index')
// let p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(111)
//   })
// })




// // 测试 x === p2 逻辑
// let p1 = p.then(value => {
//   return p1 // 自己等自己改变状态，自己啥也没干，跟我闹着玩呢~~~
// })
// p1.then(() => { }, reason => {
//   console.log(reason)
// })






// 测试 x.then 报错逻辑
// const obj = {}
// Object.defineProperty(obj, 'then', {
//   get () {
//     throw new Error('你看我安不安排你就完事了~~~')
//   }
// })
// let p = new Promise((resolve, reject) => {
//   resolve(1)
// })
// let p1 = p.then(value => {
//   return obj
// })
// p1.then(() => { }, err => {
//   console.log(err)
// })








/**
 * 测试
 *  then.call(x, y => {
          resolve(y)
        }, r => {
          reject(r)
        })
 */
// let p = new Promise((resolve, reject) => {
//   resolve(1)
// })
// let p1 = p.then(value => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(11)
//     })
//   })
// })
// p1.then(value => {
//   console.log(value) // 11
// })








/**
 * 测试
 *    then.call(x, y => {
          resolve(y)
        }, r => {
          reject(r)
        })
 */
// let p = new Promise((resolve, reject) => {
//   resolve(1)
// })
// let p1 = p.then(value => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(new Promise((resolve, reject) => {
//         setTimeout(() => {
//           resolve(222)
//         })
//       }))
//     })
//   })
// })
// p1.then(value => {
//   console.log(value) /**
//                       Promise {
//                         _status: 'resolved',
//                         _value: 222,
//                         _callbacks: { onResolved: [], onRejected: [] }
//                       }
//                       测试结果是不符合我们预期的，正确打印应该为222，
//                       所以我们还应该继续判断y是否还是一个promise,那么是不是又是走相同的逻辑呢
//                       解决方案:递归解析即可
//                     */
// })