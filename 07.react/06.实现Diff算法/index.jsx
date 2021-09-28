import React from "./react";
import ReactDOM from "./react-dom";

class Diff extends React.Component {
  state = { list: ["A", "B", "C", "D", "E", "F", "G"] };
  handleAdd = () => {
    this.setState({ list: ["A", "C", "E", "B", "G"] });
  };
  renderList = (list) => {
    return list.map((item) => <li key={item}>{item}</li>);
  };
  render() {
    const { list } = this.state;
    return (
      <div>
        <ul>{this.renderList(list)}</ul>
        <button onClick={this.handleAdd}>click me </button>
      </div>
    );
  }
}

ReactDOM.render(<Diff />, document.getElementById("app"));
