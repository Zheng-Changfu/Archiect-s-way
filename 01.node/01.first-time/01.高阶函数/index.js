/**
 * 什么是高阶函数?
 * 满足以下2个条件任意一个就是高阶函数
 *      1. 函数的参数是一个函数
 *      2. 函数内部返回一个函数
 * 高阶函数的应用场景:
 *      react中利用高阶函数+受控组件收集数据
 *      基于原来的代码进行扩展 ==> before
 */


// before方法 ==> 让所有函数都有这个方法，那么我们在原型上添加这个方法
Function.prototype.before = function (callback) {
  // this ==> formerCode ==> 谁调用before就指向谁
  // callback ==> before传的函数
  // fn ==> before函数返回的新函数
  return (...args) => {
    callback()
    this(...args)
  }
}


// 原来的代码 ==> formerCode
function formerCode (...args) {
  // 人家的逻辑，我们想在调用这个函数前做一些事情
  console.log('我是原来的代码 --- formerCode')
  console.log(args)
}
// 定义before函数
const fn = formerCode.before(() => {
  console.log('我是在原来代码运行前增加的 --- addCode')
})
fn(1, 2, 3, 4, 5)