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
    const { left, showPowerUp, poweredUp } = this.state;
    this.state.left < window.screen.availWidth - 140 &&
      this.setState({ left: poweredUp ? left + 30 : left + 10 });
    showPowerUp &&
      left > 300 &&
      left < 450 &&
      this.powerUp();
  };

  movementLeft = () => {
    const { left, showPowerUp, poweredUp } = this.state;
    this.state.left > 0 &&
      this.setState({ left: poweredUp ? left - 30 : left - 10 });
    showPowerUp &&
      left > 300 &&
      left < 450 &&
      this.powerUp();
  };

  powerUp = () => {
    this.setState({ poweredUp: true })
    setTimeout(this.resetPowerUp, 7000)
  };

  resetPowerUp = () => {
    this.setState({ poweredUp: false, showPowerUp: false })
  }

  keyDownHandler = (event) => {
    if (!this.state.keyIsPressed) {
      if (event.keyCode === 39) {
        this.setState({ keyIsPressed: true });
        this.moveRight = setInterval(this.movementRight, 20);
      }
      if (event.keyCode === 37) {
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
          className={jumping && left > 230 && left < 330 ? "bumpBox" : ""}
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
