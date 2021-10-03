import React from "react";
import ReactDOM from "react-dom";

class Test1 extends React.Component {
  render() {
    const style = {
      width: "300px",
      height: "200px",
      border: "1px solid #ccc",
    };
    return <div style={style}>{this.props.title}</div>;
  }
}

class Test2 extends React.Component {
  render() {
    const style = {
      width: "300px",
      height: "200px",
      border: "1px solid #ccc",
    };
    return <div style={style}>{this.props.title}</div>;
  }
}

class RenderProps extends React.Component {
  state = {
    x: 0,
    y: 0,
  };
  dragContainer = React.createRef();
  handleMouseEnter = (e) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    this.setState({ x: clientX, y: clientY });
    this.dragContainer.current.addEventListener(
      "mousemove",
      this.handleMouseMove
    );
    this.dragContainer.current.addEventListener("mouseup", this.handleMouseUp);
  };
  handleMouseMove = (e) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    const moveX = clientX - this.state.x;
    const moveY = clientY - this.state.y;
    this.dragContainer.current.style.left = moveX + "px";
    this.dragContainer.current.style.top = moveY + "px";
  };
  handleMouseUp = (e) => {
    this.dragContainer.current.removeEventListener(
      "mousemove",
      this.handleMouseMove
    );
    this.dragContainer.current.removeEventListener(
      "mouseup",
      this.handleMouseUp
    );
  };
  render() {
    const style = {
      position: "relative",
    };
    return (
      <div
        ref={this.dragContainer}
        style={style}
        onMouseDown={this.handleMouseEnter}
      >
        {this.props.children(this.state)}
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <>
        <RenderProps>
          {(props) => (
            <>
              <Test1 title={"拖拽1"} {...props} />
              <Test2 title={"拖拽2"} {...props} />
            </>
          )}
        </RenderProps>
      </>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
