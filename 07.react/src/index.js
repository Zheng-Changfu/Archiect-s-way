import React from './react'
import ReactDOM from './react-dom'

class ClassComponent extends React.Component {
  constructor(props) {
    super(props) // 调用父类的constructor方法
    this.state = {
      num: 0
    }
  }
  handleClick = (e) => {
    console.log(e, 'e')
    console.log(this, 'this')
    console.log(this.state.num, '0')
    this.setState({
      num: this.state.num + 1
    })
    console.log(this.state.num, '1')
    this.setState({
      num: this.state.num + 1
    })
    console.log(this.state.num, '2')


    // console.log(this.state.num, '0')
    // this.setState(state => ({ num: state.num + 1 }))
    // console.log(this.state.num, '1')
    // this.setState(state => ({ num: state.num + 1 }))
    // console.log(this.state.num, '2')

    // setTimeout(() => {
    //   console.log(this.state.num, '0')
    //   this.setState({
    //     num: this.state.num + 1
    //   })
    //   console.log(this.state.num, '1')
    //   this.setState({
    //     num: this.state.num + 1
    //   })
    //   console.log(this.state.num, '2')
    // })
  }
  render () {
    return <div>
      <h1>{this.state.num}</h1>
      <button onClick={this.handleClick}>+</button>
    </div>
  }
}

ReactDOM.render(<ClassComponent title='world' />, document.getElementById('app'))