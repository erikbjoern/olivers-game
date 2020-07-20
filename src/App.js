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
    showPowerUp: false,
    poweredUp: false,
  };

  componentDidMount() {
    document.addEventListener("keydown", (event) => this.keyDownHandler(event));
    document.addEventListener("keyup", (event) => this.keyUpHandler(event));
  }

  movementRight = () => {
    const left = this.state.left
    this.setState({ left: this.state.left + 10 });
    this.state.showPowerUp && left > 300 && left < 450 && this.setState({ poweredUp: true })
  };

  movementLeft = () => {
    const left = this.state.left
    this.setState({ left: left - 10 });
    this.state.showPowerUp && left > 300 && left < 450 && this.setState({ poweredUp: true })
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
        this.setState({ showPowerUp: true });
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
    const { jumping, showPowerUp, poweredUp, left } = this.state;
    return (
      <>
        <div
          id="characterContainer"
          className={jumping ? "jumping" : ""}
          style={{ left: left }}
        >
          <img
            src={figur}
            className={poweredUp ? "poweredUp" : ""}
            id="figur"
            alt="figur"
          />
        </div>
        <img
          src={box}
          id="box-one"
          className={showPowerUp ? "bumpBox" : ""}
          alt="box"
        />
        <img
          src={powerup}
          className={showPowerUp && !poweredUp ? "powerup" : "hidden"}
          alt="powerup"
        />
        <div className="ground"></div>
      </>
    );
  }
}

export default App;
