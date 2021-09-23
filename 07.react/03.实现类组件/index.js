import React from './react'
import ReactDOM from './react-dom'

class ClassComponent extends React.Component {
  constructor(props) {
    super(props) // 调用父类的constructor方法
  }
  render () {
    console.log(this, 'this')
    return <h1>hello {this.props.title}</h1>
  }
}

ReactDOM.render(<ClassComponent title='world' />, document.getElementById('app'))