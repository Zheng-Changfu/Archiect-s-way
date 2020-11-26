// 手写一个符合a+规范的promise
// 核心函数

function corePromise (p2, x, resolve, reject) {
  if (x === p2) {
    return reject(new TypeError('别干傻事'))
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // 取x.then可能报错,因为外部可能混用了别人的promise，比如这种情况
    try {
      const then = x.then
      if (typeof then === 'function') {
        // 确定他是一个promise
        then.call(x, y => {
          corePromise(p2, y, resolve, reject)
        }, r => {
          corePromise(p2, r, resolve, reject)
        })
      } else {
        resolve(x)
      }
    } catch (error) {
      reject(error)
    }
  } else {
    // x 都是成功
    resolve(x)
  }
}
/**
 * promise内部有3种状态
 * pending:初始化状态
 * resolved:成功
 * rejected:失败
 * 
 * Promise内部状态是不可逆的，只能被修改一次
 */
class Promise {
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
    onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r }
    let p2 = new Promise((resolve, reject) => {
      if (this._status === 'resolved') {
        setTimeout(() => {
          try {
            /**
             * x 如果抛错，那么是失败
             * x 如果返回的不是一个promise，那么默认返回的promise都是成功
             * x 如果等于p2 就表示自己引用自己的状态，抛错
             * x 如果是一个promise对象，那么我们就要看promise内部的值
             */
            const x = onResolved(this._value)
            corePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this._status === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this._value)
            corePromise(p2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
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
          })
        })
        this._callbacks.onRejected.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this._value)
              corePromise(p2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
      }
    })
    return p2
  }
}
Promise.deferred = function () {
  const df = {}
  df.promise = new Promise((resolve, reject) => {
    df.resolve = resolve
    df.reject = reject
  })
  return df
}
module.exports = Promise


