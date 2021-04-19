// 当动态加载组件时，因为是异步加载，所以可能会造成白屏，我们在白屏的时候给一个loading
import LoadingComponent from '../components/loadingComponent.vue'
export default function loadable (asyncfunc) {
  // 来一次切片
  let component = () => ({
    component: asyncfunc(),
    loading: LoadingComponent
  })

  // 返回值要是一个组件
  return {
    render (h) {
      return h(component)
    }
  }
}
