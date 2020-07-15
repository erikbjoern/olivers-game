import React, { Component } from "react";
import logo from "./figur.png";
import "./App.css";

class App extends Component {
  state = {
    left: 0,
    keyIsPressed: false,
  };

  componentDidMount() {
    document.addEventListener("keydown", this.keyDownHandler);
    document.addEventListener("keyup", this.keyUpHandler);
  }

  keyDownHandler = () => {
    this.setState({ left: this.state.left + 10 })
  };

  keyUpHandler = () => {
    this.setState({ keyIsPressed: false })
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{ position: "absolute", left: this.state.left }}
          />
        </header>
      </div>
    );
  }
}

export default App;
