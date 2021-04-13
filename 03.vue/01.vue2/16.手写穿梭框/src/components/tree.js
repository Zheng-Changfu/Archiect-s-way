import './tree.css'
export default {
  data () {
    return {
      checkValue: {}
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    renderTree (data) {
      return data.map(item => {
        return item.children && item.children.length > 0
          ? <li class='inner'>
            <input type='checkbox' v-model={this.checkValue[item.title]} />
            {item.title}
            <ul>
              {this.renderTree(item.children)}
            </ul>
          </li>
          : <li class='inner'>
            <input type='checkbox' v-model={this.checkValue[item.title]} />
            {item.title}
          </li>
      })
    }
  },
  render () {
    return <div class='outer'>
      <ul class='tree-container'>
        {
          this.renderTree(this.data)
        }
        {/* <li>1111</li>
        <li>
          <ul>
            <li>2222</li>
            <li>2222</li>
            <li>2222</li>
            <li>2222</li>
          </ul>
        </li>
        <li>1111</li>
        <li>1111</li>
        <li>1111</li> */}
      </ul>
    </div>
  }
}