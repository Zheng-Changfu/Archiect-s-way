class Component {
  // 此标识用来区分为类组件还是函数式组件
  static isReactComponent = true
  constructor(props) {
    this.props = props // 添加props属性
  }
}
export default Component