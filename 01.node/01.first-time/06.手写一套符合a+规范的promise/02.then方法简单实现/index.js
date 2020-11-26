class Promise {
  constructor(executor) {
    this._status = 'pending'
    this._value = undefined
    // 定义一个容器
    this._callbacks = {
      // 放置成功的回调
      onResolved: [],
      // 放置失败的回调
      onRejected: []
    }
    const resolve = value => {
      if (this._status !== 'pending') return
      this._status = 'resolved'
      this._value = value
      // 我们把容器中的成功回调拿出来去执行，就可以实现异步调用then的相关回调
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
  /**
   * 
   * @param {*} onResolved 成功的回调
   * @param {*} onRejected 失败的回调
   */
  then (onResolved, onRejected) {
    // 判断Promise的状态,成功调用onResolved，失败调用onRejected
    if (this._status === 'resolved') {
      onResolved(this._value)
    }
    if (this._status === 'rejected') {
      onRejected(this._value)
    }
    if (this._status === 'pending') {
      // 把then的两个回调放入容器中
      this._callbacks.onResolved.push(() => {
        onResolved(this._value)
      })
      this._callbacks.onRejected.push(() => {
        onRejected(this._value)
      })
    }
  }
}
module.exports = Promise