/**
 * Promise解决了我们日常开发过程中产生的回调地狱问题
 * Promise是一个构造函数，接收一个执行器(executor)作为参数，executor是new Promise的时候立即执行
 * executor内部接收2个参数resolve,reject，并且他们都是函数，可以被外界调用
 * 调用resolve函数就会将Promise的状态改为成功,可以接收参数，参数作为then第一个函数的参数
 * 调用reject函数就会将Promise的状态改为失败,可以接收参数，参数作为then第二次函数的参数
 * executor内部如果出现异常那么Promise的状态就为失败
 * 一个Promise对象的状态只能被修改一次,Promise有3种状态
 *    1. pending 初始化状态 等待被执行 也可以说是pending状态的promise可以结束promise链条
 *    2. resolved 成功状态
 *    3. rejected 失败状态
 * 我们实现一下
 */
class Promise {
  constructor(executor) {
    this._status = 'pending' // 初始化状态
    this._value = undefined
    // 改变为成功状态
    const resolve = value => {
      // 为了防止状态被多次修改
      if (this._status !== 'pending') return
      this._status = 'resolved'
      this._value = value
    }
    // 改变为失败状态
    const reject = reason => {
      if (this._status !== 'pending') return
      this._status = 'rejected'
      this._value = reason
    }
    // 捕获执行器函数内部异常
    try {
      // executor立即执行
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
}


module.exports = Promise