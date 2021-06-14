import { track, trigger } from "./effect"
import { TrackTypes } from "packages/shared/src/opeartors"
import { hasChanged, isArray } from "@vue/shared"
import { isObject } from "@vue/shared"
import { reactive } from "./reactive"

function createRef(rawValue, shallow = false) {
  return new RefImpl(rawValue, shallow)
}
const convert = val => isObject(val) ? reactive(val) : val;
class RefImpl {
  // 声明属性
  public _v_isRef = true // 标识是一个ref属性
  public _value
  // 简写:相当于在内部 this.rawValue = rawValue;this.shallow = shallow
  constructor(public rawValue, public shallow) {
    // ref可以接收对象类型，如果接收的是对象类型，需要定义成响应式
    this._value = shallow ? rawValue : convert(rawValue)
  }
  // 类的属性访问器，编译后为Object.defineProperty
  get value() {
    // 外界: let r = ref(''); 
    // 当外界去访问 r.value 时，要收集相关依赖 ==> track
    // 当外界去设置 r.value 时，要通知更新 ==> trigger
    // r.value 访问的是 this._value
    // 这样我们使用r.value时，value就会和对应的effect进行关联
    // 关联关系: RefImpl的实例 => value => [effect]
    track(this, TrackTypes.GET, 'value')
    return this._value
  }
  set value(newValue) {
    // 通知更新
    if (hasChanged(this.rawValue, newValue)) {
      // 这次的新值当成下一次的老值
      this._value = this.shallow ? newValue : convert(newValue)
      this.rawValue = newValue
      trigger(this, TrackTypes.SET, 'value', newValue, this.rawValue)
    }
  }
}
class ObjectRefImpl {
  public _v_isRef = true
  constructor(public target, public key) {

  }
  get value() {
    return this.target[this.key]
  }
  set value(newValue) {
    this.target[this.key] = newValue
  }
}
export function ref(rawValue) {
  return createRef(rawValue)
}
export function shallowRef(rawValue) {
  return createRef(rawValue, true)
}
// 将一个值包装成ref对象，是否为响应式取决于原来的值是否是响应式
export function toRef(target, key) {
  return new ObjectRefImpl(target, key)
}
// 将多个值包装成ref对象，是否为响应式取决于原来的值是否是响应式
export function toRefs(target) {
  // const r = toRefs(state)
  // target可能是数组，可能是对象
  const res = isArray(target) ? new Array(target.length) : {}
  for (let key in target) {
    res[key] = toRef(target, key)
  }
  return res
}