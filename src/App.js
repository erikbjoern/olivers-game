import React, { Component } from "react";
import figur from "./figur.png";
import "./App.css";

class App extends Component {
  state = {
    left: 0,
  };

  componentDidMount() {
    document.addEventListener("keydown", (event) => this.keyDownHandler(event));
  }

  keyDownHandler = (event) => {
    if (event.keyCode === 39 && this.state.left < 990) {
      this.setState({ left: this.state.left + 10 });
    }
    if (event.keyCode === 37 && this.state.left >= 10) {
      this.setState({ left: this.state.left - 10})
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img
            src={figur}
            className="App-logo"
            alt="figur"
            style={{ position: "absolute", left: this.state.left }}
          />
        </header>
      </div>
    );
  }
}

export default App;
