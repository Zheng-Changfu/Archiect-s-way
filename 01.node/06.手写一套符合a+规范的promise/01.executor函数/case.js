const Promise = require('./index')
const p = new Promise((resolve, reject) => {
  console.log(1)
  resolve(11)
  reject(22)
})
console.log(2, p) // Promise { _status: 'resolved', _value: 11 } 

const p1 = new Promise((resolve, reject) => {
  throw new Error('11')
})
console.log(p1) // Promise { _status: 'rejected' , _value: Error: 11 }

