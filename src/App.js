import React, { Component } from "react";
import figur from "./images/stjerne.png";
import box from "./images/box.png";
import powerup from "./images/powerup.png";
import "./App.css";

class App extends Component {
  state = {
    left: 0,
    jumping: false,
    keyIsPressed: false,
    powerup: false,
  };

  componentDidMount() {
    document.addEventListener("keydown", (event) => this.keyDownHandler(event));
    document.addEventListener("keyup", (event) => this.keyUpHandler(event));
  }

  movementRight = () => {
    this.setState({ left: this.state.left + 10 });
  };

  movementLeft = () => {
    this.setState({ left: this.state.left - 10 });
  };

  keyDownHandler = (event) => {
    if (!this.state.keyIsPressed) {
      if (event.keyCode === 39 && this.state.left < 990) {
        this.setState({ keyIsPressed: true });
        this.moveRight = setInterval(this.movementRight, 20);
      }
      if (event.keyCode === 37 && this.state.left >= 10) {
        this.setState({ keyIsPressed: true });
        this.moveLeft = setInterval(this.movementLeft, 20);
      }
    }

    if (event.keyCode === 38 && !this.state.jumping) {
      this.state.left > 230 &&
        this.state.left < 330 &&
        this.setState({ powerup: true });
      this.setState({ jumping: true });
      onanimationend = () => {
        this.setState({ jumping: false });
      };
    }
  };

  keyUpHandler = (event) => {
    if (event.keyCode === 39) {
      this.setState({
        keyIsPressed: false,
      });
      clearInterval(this.moveRight);
    }
    if (event.keyCode === 37) {
      this.setState({
        keyIsPressed: false,
      });
      clearInterval(this.moveLeft);
    }
  };

  render() {
    return (
      <>
        <img
          src={figur}
          className={this.state.jumping ? "jumping" : ""}
          id="figur"
          alt="figur"
          style={{ left: this.state.left }}
        />
        <img
          src={box}
          id="box-one"
          className={this.state.powerup ? "bumpBox" : ""}
          alt="box"
        />
        <img
          src={powerup}
          className={this.state.powerup ? "powerup" : "hidden"}
          alt="powerup"
        />
        <div className="ground"></div>
      </>
    );
  }
}

export default App;
