class Promise {
  /**
   * @param {*} executor 执行器函数:要求立即调用
   */
  constructor(executor) {
    this._status = 'pending'
    this._value = undefined
    // 容器数组,装载异步回调
    let callbacks = {
      onResolved: [], // 成功的数组
      onRejected: [] // 失败的数组
    }
    const resolve = value => {
      if (this._status !== 'pending') return
      this._status = 'resolved'
      this._value = value
    }
    const reject = reason => {
      if (this._status !== 'pending') return
      this._status = 'rejected'
      this._value = reason
    }
    // 执行器函数要求立即调用
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  // 成功回调
  then (onResolved, onRejected) {
    if (this._status === 'resolved') {
      setTimeout(() => {
        onResolved(this._value)
      })
    }
    if (this._status === 'rejected') {
      setTimeout(() => {
        onRejected(this._value)
      })
    }
    if (this._status === 'pending') {
      console.log(this.callbacks)
    }
  }
  // 失败回调
  catch (onRejected) {

  }
  // 不管成功还是失败都会执行
  finally () {

  }
  // 全部执行完成合并结果在执行，一旦一个出错，退出执行
  all () {

  }
  race () {

  }
}
module.exports = Promise