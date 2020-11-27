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
    // 调用then方法,只不过第一个参数不传
    this.then(null, onRejected)
  }
}
/**
   * @param {*} values 放promise或者普通值的数组
   * Promise.all方法返回一个 Promise 实例，此实例在参数内所有的 promise 都完成或参数中不包含 promise 时回调完成（resolve）；
   * 如果参数中 promise 有一个失败，此实例回调失败，失败的原因是第一个失败 promise 的结果。
   */
Promise.all = function (values) {
  return new Promise((resolve, reject) => {
    let arr = [], count = 0
    for (let i = 0; i < values.length; i++) {
      const x = values[i]
      // 判断x是否为promise
      if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        const then = x.then
        if (typeof then === 'function') {
          // 调用then拿到promise内部的结果值
          then.call(x, y => {
            count++
            arr[i] = y
            /**
             * 这里我们采用计数器的方式是为什么？
             * 是因为我们js中的数组是有序的，如果arr[3] = xxxxx,那么我们数组的长度就变成了3
             * 这样子我们返回出去的结果就会有问题，所以采用计数器来满足这个需求
             */
            if (count === values.length) {
              resolve(arr)
            }
          }, r => {
            reject(r)
          })
        } else {
          count++
          arr[i] = x // then不是一个函数
        }
      } else {
        count++
        // 普通值
        arr[i] = x
      }
    }
  })
}
module.exports = Promise