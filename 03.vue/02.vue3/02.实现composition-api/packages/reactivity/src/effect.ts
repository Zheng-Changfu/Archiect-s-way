import { isArray } from "@vue/shared"
import { TriggerTypes } from "packages/shared/src/opeartors"

// effect(() =>{},{flush:'sync'}) 立即执行一次
export const effect = function (fn, options: any = {}) {
  // 高阶函数返回新的effect函数
  const effect = createReactiveEffect(fn, options)
  if (!options.lazy) {
    // 因为一上来就执行了一次，所以我们这里执行了effect调用就是相当于执行了createReactiveEffect中的effect函数
    effect()
  }
  return effect
}
let uid = 0, activeEffect, effectStack = []
function createReactiveEffect(fn, options) {
  const effect = function () {
    /**
     * 我们可能会写出这样的代码
     * effect(() =>{  ---> effect1
     *    state.name
     *    effect(() =>{ ---> effect2
     *         state.age
     *    })
     *    state.address
     * })
     * 当我们进行第一次取值state.name时,name和effect1进行关联
     * 当我们进行第二次取值state.age时,age和effect2进行关联
     * 但是当我们进行第三次取值state.address时,此时的address和effect2关联了,就不对了
     * 因为effect的调用就是一个类似函数的调用栈，所以我们可以用一个栈形结构来维护key和effect的关系
     * 我们调用用户的函数可能会发生异常
     */
    try {
      effectStack.push(effect)
      activeEffect = effect
      // const fn = () => {
      //   console.log(state.name + state.age)
      // }
      // effect(fn)
      // 函数调用，会进行取值，我们需要收集对应的依赖关系，后续当状态发生改变，我们可以通知视图去更新，类似于Vue2中的 Dep / Watcher
      // effect的返回值就是函数调用的返回值
      // 取值走get
      return fn()
    } finally {
      // 调用完函数从栈中抛出
      effectStack.pop()
      // 让我们下一个的effect指向正确的effect
      activeEffect = effectStack[effectStack.length - 1]
    }
  }
  effect.uid = uid++ // effect的唯一标识
  effect._isEffect = true // 标识是否为响应式effect
  effect.raw = fn // 将用户回调函数和effect做一个关联
  effect.options = options // 储存用户的配置选项
  return effect
}
let targetMap = new WeakMap;
/**
 * 
 * @param target 目标对象
 * @param type 唯一标识
 * @param key 对象的key
 */
export function track(target, type, key) {
  // 要将key和对应的effect进行关联，我们用一个全局变量
  // 因为我们只有在effect中使用状态才会进行依赖收集,在外界使用我们是不管的,而每次get时都会触发此方法，所以我们需要判断一下activeEffect是否有值
  // 有值就说明是在effect中使用的状态
  if (activeEffect) {
    // 我们需要将key和effect进行关联，而key也应该和对应的目标对象进行关联，effect可能有多个，也有可能会重复，所以这里的关系是这样的
    // (WeakMap target) => (Map key => Set effect)
    let depsMap = targetMap.get(target)
    // 第一次WeakMap中肯定没有target目标对象
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map))
    }
    let deps = depsMap.get(key)
    // 第一次Map中肯定没有key
    if (!deps) {
      depsMap.set(key, (deps = new Set))
    }
    // 第一次Set中肯定没有effect
    if (!deps.has(key)) {
      deps.add(activeEffect)
    }
    // 这样我们的关系就建立了,等到用户修改数据时，我们通知对应的effect重新执行即可
  }
}
/**
 * 
 * @param target 目标对象
 * @param type 标识是新增还是修改,0新增,1修改
 * @param key 要对哪个key进行操作
 * @param value 操作后的结果值
 * @param oldValue 操作前的结果值
 */
export function trigger(target, type, key, value?, oldValue?) {
  // 如果没有收集过对应的依赖，那么是不需要进行更新的
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  // 用于存放要执行的effect函数集合
  const effects = new Set
  const add = (deps) => {
    if (deps) {
      deps.forEach(effect => effects.add(effect))
    }
  }
  // 说明改的是数组的length
  if (key === 'length' && isArray(target)) {
    // 我们需要循环depsMap,将要执行的effect全部添加到容器中
    depsMap.forEach((dep, key) => {
      // key > value 是这种情况
      /**
       * const state = reactive({arr:[1,2,3]})
      *  effect(() => console.log(state.arr[2]))
      *  setTimeout(() =>{ state.arr.length = 1 },1000)
      * 此时的key为2, value是1 ,也要进行更新
       */
      if (typeof key !== 'symbol') {
        if (key === 'length' || key > value) {
          add(dep)
        }
      }
    })
  } else {
    // 对象
    if (key !== undefined) {
      add(depsMap.get(key))
    }
    // 如果修改数组中的某一个索引，也要更新
    switch (type) {
      case TriggerTypes.ADD:
        // 表示是新增，通知length的effect去更新
        add(depsMap.get('length'))
    }
  }
  // 让effect更新
  effects.forEach((effect: any) => {
    if (effect.options.scheduler) {
      return effect.options.scheduler()
    }
    return effect()
  })
}

