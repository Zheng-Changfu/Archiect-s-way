import React from "./react";
import ReactDOM from "./react-dom";

class Fragment extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>hello</h1>
        <h1>world</h1>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<Fragment />, document.getElementById("app"));
