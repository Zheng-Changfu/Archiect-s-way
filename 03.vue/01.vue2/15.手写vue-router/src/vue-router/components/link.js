export default {
  functional: true,
  props: {
    to: {
      type: String,
      required: true
    }
  },
  render: (h, context) => {
    const click = () => {
      // 点击a标签,要跳转
      context.parent.$router.push(context.props.to)
    };
    return <a onClick={click}>{context.slots().default}</a>
  }
}