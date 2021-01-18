/**
 * 核心函数
 * @param {*} p2 then方法应该返回的promise,状态还未确定 ==> pending
 * @param {*} x then方法内部的返回值
 * @param {*} resolve 改变p2状态为成功的函数
 * @param {*} reject 改变p2状态为失败的函数
 */
function corePromise (p2, x, resolve, reject) {
  // then方法的返回值如果和p2相等,那么返回一个失败状态的promise
  if (x === p2) {
    reject(new TypeError('孩子,别干傻事'))
  }
  /**
   * 判断x是否为一个Promise对象，应该怎么判断呢？用instanceOf?
   *    不应该用instanceOf,因为这虽然是我们自己实现的promise,
   *    但是有可能混入别人实现的Promise，那么这样的话，一旦用到了别人的Promise，我们无法估测结果
   *    我们就应该传统的去判断 x 是否是一个对象并且不为null，或者x是一个函数,因为a+规范规定，then可能为一个对象或者函数
   * 
   * 我们实现一下
   */
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // 可以确定为一个对象
    // 我们取一下then，但是取这个then有可能报错
    try {
      const then = x.then
      if (typeof then === 'function') {
        /**
         * 这里我们确定x是一个promise对象,那么我们应该拿到该promise内部的值，怎么拿呢?
         * 如果外面代码是这样的
         * let p = new Promise((resolve,reject) =>{
         *    resolve()
         * })
         * let p1 = p.then((resolve,reject) =>{
         *    return new Promise((resolve,reject) =>{ 
         *        resolve(11)
         *    })
         * })
         * p1.then(value =>{
         *    console.log(value) // 这里的value应该为11，那么怎么拿到11这个值呢?
         * })
         * 
         * 是不是可以在 let p1 = p.then((resolve,reject) =>{
         *    return new Promise((resolve,reject) =>{ 
         *        resolve(11)
         *    }).then(data =>{
         *        console.log(data) // 这里的data就是11，是不是，我们只需要加一个.then方法就可以了
         *    })
         * })
         * 
         * 好，我们实现一下
         */

        // 这里为什么不x.then，是因为防止他第二次报错，用之前取到的没问题的then方法在这里使用就行

        // 这样我们是不是就给他加了一个then方法，如果x内部返回的是一个promise，我们就加一层.then获取到promise内部的状态值
        // 并且让他自动的调用2个函数中的某一个
        then.call(x, y => {
          // resolve(y)
          corePromise(p2, y, resolve, reject) // 递归解析
        }, r => {
          reject(r) // 失败状态不需要递归解析
        })

      } else {
        resolve(x)
      }
    } catch (error) {
      reject(error)
    }
  } else {
    // 如果不是一个对象，说明是普通值
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
  /**
   * 
   * 怎么才能链式调用?
   *    then是一个函数,同时也是new Promise得到的实例化对象原型上的方法
   *    也就是说我们需要返回一个Promise的实例化对象才可以继续调用then方法
   *    确定一个函数的返回值就是return的值
   *  
   * 我们实现一下
   */
  then (onResolved, onRejected) {
    // 返回一个promise实例
    /**
     * 那么问题来了，我返回的p2的状态应该为什么？也就是说我们then方法返回的promise状态应该是什么?
     * then方法返回的promise遵循以下规定:
     *    1. then方法内部如果抛错，那么返回一个失败状态的promise
     *    2. then方法的返回值如果和p2相等,那么返回一个失败状态的promise
     *    3. then方法内部的返回值如果是promise对象，那么我们就取这个promise内部的结果值,返回成功还是失败取决于这个promise的内部状态
     *    4. 排除以上可能，其他返回的都是一个成功状态的promise
     */
    let p2 = new Promise((resolve, reject) => {
      if (this._status === 'resolved') {
        setTimeout(() => {
          // 拿到then方法内部的返回值
          const x = onResolved(this._value)
          // 因为下面其他代码也要进行相同逻辑的判断，所以我们封装一个函数
          // 因为在执行这些代码的时候变量p2还未定义，所以我们需要包装一个定时器，异步拿到p2
          corePromise(p2, x, resolve, reject)
        })
      }
      if (this._status === 'rejected') {
        setTimeout(() => {
          const x = onRejected(this._value)
          corePromise(p2, x, resolve, reject)
        })
      }
      if (this._status === 'pending') {
        this._callbacks.onResolved.push(() => {
          setTimeout(() => {
            const x = onResolved(this._value)
            corePromise(p2, x, resolve, reject)
          })
        })
        this._callbacks.onRejected.push(() => {
          setTimeout(() => {
            const x = onRejected(this._value)
            corePromise(p2, x, resolve, reject)
          })
        })
      }
    })
    return p2
  }
}
module.exports = Promise