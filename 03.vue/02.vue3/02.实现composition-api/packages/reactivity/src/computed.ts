import { isFunc, warn } from "@vue/shared"
import { effect, track, trigger } from "./effect"
import { TrackTypes } from "packages/shared/src/opeartors"

/*
      计算属性特点:
        默认不会执行，当取值时才会执行
        有缓存，如果状态没有发生变化，不会重新执行函数，会返回上一次值
        可以传入一个函数，这个函数就是getter函数
        也可以传入一个配置项，配置项中包含get和set
        computed(() =>{})
        computed({get(){},set(){}})
*/
export function computed(getterOrOptions) {
  let getter, setter
  if (isFunc(getterOrOptions)) {
    // 是函数的情况
    getter = getterOrOptions
    setter = () => warn('Write operation failed: computed value is readonly')
  } else {
    // 是配置项的情况
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }
  return new ComputedRefImpl(getter, setter)
}
class ComputedRefImpl {
  // 标识计算属性getter的返回值
  public _value
  // 标识是一个Ref
  public _v_isRef = true
  // 默认是脏的，通过此变量来控制是否需要缓存
  public _dirty = true
  public effect
  constructor(public getter, public setter) {
    // 默认getter不会执行,只有取值时才会执行
    this.effect = effect(getter, {
      lazy: true, // 默认不执行
      scheduler: () => {
        // 说明变化过
        if (!this._dirty) {
          this._dirty = true
          // 通知更新
          trigger(this, TrackTypes.SET, 'value')
        }
      }
    })
  }
  /**
   * 外界是这么访问的
   * const state = reactive({age:10})
   * const c = computed(() => state.age + 10)
   * c.value ==> 20
   */
  // 当读取c.value时，要调用我们的getter函数，函数的返回值作为我们的_value值
  get value() {
    // 要看一下依赖是否变化过，依赖变化过我们的dirty变量就为false
    // 计算属性中依赖的响应式数据如果发生变化了，当我们再次取值时会重新执行getter函数
    // 那么我们需要收集getter中的依赖
    if (this._dirty) {
      // effect的返回值就是用户回调的返回值
      this._value = this.effect()
      // 缓存，下一次在取值就进入不到此判断中，会返回上一次的值
      this._dirty = false
    }
    // 收集依赖
    track(this, TrackTypes.GET, 'value')
    return this._value
  }
  set value(newVal) {
    this.setter(newVal)
  }
}