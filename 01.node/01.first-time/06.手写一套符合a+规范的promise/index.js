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
  static race (values) {
    return new Promise((resolve, reject) => {
      let called = false
      for (let i = 0; i < values.length; i++) {
        const x = values[i]
        if (x instanceof Promise) {
          called = true
          x.then(y => {
            resolve(y)
          }, r => {
            reject(r)
          })
        } else {
          if (called) return
          // 普通值
          resolve(x)
        }
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
  finally (fn) {
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

// 测试我们写的Promise是否符合promise a+ 规范
// promise a+ 规范文档地址: https://promisesaplus.com/
// promise a+ 规范测试文档地址: https://github.com/promises-aplus/promises-tests
// 测试流程: yarn --> 下载包    yarn start 跑测试
Promise.deferred = function () {
  let dot = {}
  // 测试我们的promise,a+规范中只有resolve，reject，并没有其他的一些方法
  dot.promise = new Promise((resolve, reject) => {
    dot.resolve = resolve // 测试我们自己实现的resolve
    dot.reject = reject // 测试我们自己实现的reject
  })
  return dot
}
module.exports = Promise



