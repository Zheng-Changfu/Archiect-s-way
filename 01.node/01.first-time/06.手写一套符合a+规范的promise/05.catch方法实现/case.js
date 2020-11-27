const Promise = require('./index')
// let p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject(1)
//   })
// })
// p.then(null, reason => {
//   console.log(reason)
// })


/**
 * catch方法就相当于then方法，只不过第一个参数不传，catch方法的参数就是
 *  reason => {
      console.log(reason)
    }
 */

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(1)
  })
})
p.catch(reason => {
  console.log(reason)
})
