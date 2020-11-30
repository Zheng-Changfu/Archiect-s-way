function corePromise (p2, x, resolve, reject) {
  if (x === p2) {
    reject(new TypeError('孩子,别干傻事'))
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called = false
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return
          called = true
          corePromise(p2, y, resolve, reject)
        }, r => {
          if (called) return
          called = true
          reject(r)
        })
      } else {
        if (called) return
        called = true
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}
class Promise {
  static all (values) {
    return new Promise((resolve, reject) => {
      let arr = [], count = 0
      for (let i = 0; i < values.length; i++) {
        const x = values[i]
        if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
          const then = x.then
          if (typeof then === 'function') {
            then.call(x, y => {
              count++
              arr[i] = y
              if (count === values.length) {
                resolve(arr)
              }
            }, r => {
              reject(r)
            })
          } else {
            count++
            arr[i] = x
          }
        } else {
          count++
          arr[i] = x
        }
      }
    })
  }
  static promisify (fn) {
    return (...args) => {
      return new Promise((resolve, reject) => {
        fn(...args, (err, data) => {
          if (err) {
            reject(err)
            return
          }
          resolve(data)
        })
      })
    }
  }
  static resolve (value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(y => {
          resolve(y)
        }, r => {
          reject(r)
        })
      } else {
        resolve(value)
      }
    })
  }
  static reject (value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(reject, reject)
      } else {
        reject(value)
      }
    })
  }
  constructor(executor) {
    this._status = 'pending'
    this._value = undefined
    this._callbacks = {
      onResolved: [],
      onRejected: []
    }
    const resolve = value => {
      if (this._status !== 'pending') return
      this._status = 'resolved'
      this._value = value
      this._callbacks.onResolved.forEach(fn => fn())
    }
    const reject = reason => {
      if (this._status !== 'pending') return
      this._status = 'rejected'
      this._value = reason
      this._callbacks.onRejected.forEach(fn => fn())
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then (onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
    let p2 = new Promise((resolve, reject) => {
      if (this._status === 'resolved') {
        setTimeout(() => {
          try {
            const x = onResolved(this._value)
            corePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      if (this._status === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this._value)
            corePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      if (this._status === 'pending') {
        this._callbacks.onResolved.push(() => {
          setTimeout(() => {
            try {
              const x = onResolved(this._value)
              corePromise(p2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this._callbacks.onRejected.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this._value)
              corePromise(p2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    return p2
  }
  catch (onRejected) {
    this.then(null, onRejected)
  }
  // finally接收一个函数作为参数,该函数在上一次结果出来后被调用
  finally (fn) {
    /* fn 函数内部不接收参数,只作为中间层,返回的是一个promise对象,
       该promise对象的状态由上一次结果来决定
    */

    // 1. 写法
    // return this.then(y => {
    //   // y 是上一个promise的结果
    //   return new Promise((resolve, reject) => {
    //     fn()
    //     resolve(y)
    //   })
    // }, r => {
    //   // r 也是上一个promise的结果
    //   return new Promise((resolve, reject) => {
    //     fn()
    //     reject(r)
    //   })
    // })

    // 2. 写法
    return this.then(
      y => fn() || Promise.resolve(y),
      r => fn() || Promise.reject(r)
    )
  }
}
module.exports = Promise