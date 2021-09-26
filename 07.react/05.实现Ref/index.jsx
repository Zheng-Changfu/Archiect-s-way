import React from "./react";
import ReactDOM from "./react-dom";

//#region  1. react元素上的ref
class ClassTestRef extends React.Component {
  constructor(props) {
    super(props);
    this.aRef = React.createRef();
    this.bRef = React.createRef();
    this.resultRef = React.createRef();
  }
  handleAdd = () => {
    const aValue = this.aRef.current.value;
    const bValue = this.bRef.current.value;
    this.resultRef.current.value = aValue + bValue;
  };
  render() {
    return (
      <div>
        <input type="text" ref={this.aRef} />+<br />
        <input type="text" ref={this.bRef} />
        <button onClick={this.handleAdd}>=</button>
        <br />
        <input type="text" ref={this.resultRef} />
        <br />
      </div>
    );
  }
}
ReactDOM.render(<ClassTestRef />, document.getElementById("app"));
//#endregion

//#region  2. react类组件上的ref
class Instance extends React.Component {
  constructor() {
    super();
    this.aRef = React.createRef();
    this.bRef = React.createRef();
    this.resultRef = React.createRef();
  }

  handleAdd = () => {
    const aValue = this.aRef.current.value;
    const bValue = this.bRef.current.value;
    this.resultRef.current.value = aValue + bValue;
  };

  render() {
    return (
      <div>
        <input type="text" ref={this.aRef} />+<br />
        <input type="text" ref={this.bRef} />
        <br />
        <input type="text" ref={this.resultRef} />
        <br />
      </div>
    );
  }
}
class ClassInstanceTestRef extends React.Component {
  constructor(props) {
    super(props);
    this.instanceRef = React.createRef();
  }
  handleAdd = () => {
    this.instanceRef.current.handleAdd();
  };
  render() {
    return (
      <div>
        <Instance ref={this.instanceRef} />
        <button onClick={this.handleAdd}>=</button>
      </div>
    );
  }
}
ReactDOM.render(<ClassInstanceTestRef />, document.getElementById("app"));
//#endregion

//#region  3. react函数组件上的ref
function Func(props, ref) {
  // const aRef = React.createRef();
  return <input type="text" ref={ref} />;
}
const ForwardFunc = React.forwardRef(Func);
class FuncTestRef extends React.Component {
  constructor(props) {
    super(props);
    this.instanceRef = React.createRef();
  }
  handleFocus = () => {
    this.instanceRef.current.focus();
  };
  render() {
    return (
      <div>
        <ForwardFunc ref={this.instanceRef} />
        <button onClick={this.handleFocus}>获取焦点</button>
      </div>
    );
  }
}
ReactDOM.render(<FuncTestRef />, document.getElementById("app"));
//#endregion


