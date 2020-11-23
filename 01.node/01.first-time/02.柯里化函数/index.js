/**
 * 什么是柯里化函数？
 *    将一个函数的功能更具体一点，分批传入参数
 * 什么时候用柯里化函数？
 *    如果一个函数的参数是固定不变的，那么就使用柯里化函数
 */

// 这是一个求和的函数
function sum (a, b, c, d) {
  return a + b + c + d
}
// 那么我们调用的时候就是这么传参的
// const res = sum(1, 2, 3, 4)
// console.log(res)

// 我们可以实现一个通用的柯里化函数，自动的将函数转成可以多次传递参数
function currie (fn) {
  function currfn (args = []) {
    // fn.length === sum的形参个数
    // args.length === 每次调用传进来的参数
    return args.length === fn.length ? fn(...args) : (...subargs) => currfn([...args, ...subargs])
  }
  return currfn()
}
console.log(currie(sum)(1)(2)(3)(4))
