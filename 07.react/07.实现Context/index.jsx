import React from "./react";
import ReactDOM from "./react-dom";

let Context = React.createContext();
console.log(Context, "Context");
class ContextTest extends React.Component {
  state = {
    theme: "pink",
  };
  changeTheme = (color) => this.setState({ theme: color });
  render() {
    const themes = {
      color: this.state.theme,
      changeColor: this.changeTheme,
    };
    const style = {
      border: `1px solid ${themes.color}`,
    };
    return (
      <Context.Provider value={themes}>
        <div style={style}>
          <Header />
          <Main />
          <Footer />
        </div>
      </Context.Provider>
    );
  }
}

class Header extends React.Component {
  static contextType = Context;
  render() {
    const style = {
      border: `1px solid ${this.context.color}`,
    };
    return <header style={style}>header...</header>;
  }
}

class Main extends React.Component {
  static contextType = Context;
  render() {
    const style = {
      border: `1px solid ${this.context.color}`,
    };
    return (
      <main style={style}>
        <SideBar />
        <Content />
      </main>
    );
  }
}

class SideBar extends React.Component {
  static contextType = Context;
  render() {
    const style = {
      border: `1px solid ${this.context.color}`,
    };
    return (
      <div>
        <button style={style} onClick={() => this.context.changeColor("red")}>
          改变主题色 ---&gt; 红色
        </button>
      </div>
    );
  }
}

function Content() {
  return (
    <div>
      <Context.Consumer>
        {(context) => {
          const style = {
            border: `1px solid ${context.color}`,
          };
          return (
            <button style={style} onClick={() => context.changeColor("blue")}>
              改变主题色 ---&gt; 蓝色
            </button>
          );
        }}
      </Context.Consumer>
    </div>
  );
}

class Footer extends React.Component {
  static contextType = Context;
  render() {
    const style = {
      border: `1px solid ${this.context.color}`,
    };
    return <footer style={style}>footer...</footer>;
  }
}

ReactDOM.render(<ContextTest />, document.getElementById("app"));
