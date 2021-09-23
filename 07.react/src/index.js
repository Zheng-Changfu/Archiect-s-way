import React from './react'
import ReactDOM from './react-dom'

function FunctionComponent (props) {
  return <h1>hello {props.title}</h1>
}

ReactDOM.render(<FunctionComponent title='world' />, document.getElementById('app'))