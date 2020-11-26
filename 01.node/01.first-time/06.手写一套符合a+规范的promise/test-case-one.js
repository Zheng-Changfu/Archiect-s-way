const Promise = require('./index')
// const obj = {}
// Object.defineProperty(obj, 'then', {
//   get () {
//     throw 1
//   }
// })
let p = new Promise((resolve, reject) => {
  // console.log(1)
  setTimeout(() => {
    resolve(1111)
  }, 1000)
  // throw new Error(111)
})
p.then((value) => {
  console.log(value)
})
// let p2 = p.then(value => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {

//       resolve(2222)
//     }, 1000)
//   })
// })

// p2.then((value) => {
//   console.log(value)
// })






