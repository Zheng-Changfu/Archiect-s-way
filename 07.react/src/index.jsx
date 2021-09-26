import React from "./react";
import ReactDOM from "./react-dom";

class LifeCycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
    console.log("1. LifeCycle constructor");
  }
  handleAdd = () => this.setState({ number: this.state.number + 1 });

  componentWillMount() {
    console.log("2. LifeCycle componentWillMount");
  }

  shouldComponentUpdate() {
    console.log("5. LifeCycle shouldComponentUpdate");
    return !(this.state.num & 1);
  }

  componentWillUpdate() {
    console.log("6. LifeCycle componentWillUpdate");
  }

  componentDidUpdate() {
    console.log("7. LifeCycle componentDidUpdate");
  }

  render() {
    console.log("3. LifeCycle render");
    return (
      <div>
        <h1>{this.state.number}</h1>
        <button onClick={this.handleAdd}>click me </button>
      </div>
    );
  }
  componentDidMount() {
    console.log("4. LifeCycle componentDidMount");
  }
}
