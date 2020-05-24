import React from "react";
import "./styles.css";

// buttons collections
// button: id, key name, key code, sound url
const buttonCollection = [
  {
    id: "Heater-1",
    keyName: "Q",
    keyCode: 81,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    id: "Heater-2",
    keyName: "W",
    keyCode: 87,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    id: "Heater-3",
    keyName: "E",
    keyCode: 69,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    id: "Heater-4",
    keyName: "A",
    keyCode: 65,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    id: "Clap",
    keyName: "S",
    keyCode: 83,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    id: "Open-HH",
    keyName: "D",
    keyCode: 68,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    id: "Kick-n'-Hat",
    keyName: "Z",
    keyCode: 90,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    id: "Kick",
    keyName: "X",
    keyCode: 88,
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    id: "Closed-HH",
    keyName: "C",
    keyCode: 67,
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

export default class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Sound Id"
    };
    // bind mehtods to component
    this.updateDisplay = this.updateDisplay.bind(this);
  }

  // displays sounds id
  updateDisplay(text) {
    this.setState({ text: text });
  }

  render() {
    const drumMachineStyle =
      "w3-theme-d5 w3-container w3-round-large w3-padding-24 w3-display-middle";
    const displayStyle = "w3-theme-l4 w3-center w3-padding w3-xlarge";
    const buttonArea = "w3-padding-small";
    const buttonStyle =
      "w3-theme-d1 w3-button w3-round-large w3-padding-large w3-ripple";

    const generateButtons = buttonCollection.map(button => {
      return (
        <DrumButton
          id={button.id}
          keyName={button.keyName}
          keyCode={button.keyCode}
          url={button.url}
          style={buttonStyle}
          updateDisplay={this.updateDisplay}
        />
      );
    });

    return (
      <div id="drum-machine" className={drumMachineStyle}>
        <section id="display" className={displayStyle}>
          <p id="display-text">{this.state.text}</p>
        </section>
        <section id="buttons" className={buttonArea}>
          {generateButtons[0]}
          {generateButtons[1]}
          {generateButtons[2]}
          {generateButtons[3]}
          {generateButtons[4]}
          {generateButtons[5]}
          {generateButtons[6]}
          {generateButtons[7]}
          {generateButtons[8]}
        </section>
      </div>
    );
  }
}

class DrumButton extends React.Component {
  constructor(props) {
    super(props);
    // bind methods to component
    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKey);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey);
  }
  // plays buttons sound and displays buttons id
  handleClick(e) {
    this.sound.play();
    this.props.updateDisplay(e.target.id);
  }
  // plays buttons sound
  handleKey(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound(e);
    }
    // why does it not display the button id??
  }
  // sound playing method
  playSound(e) {
    // select sound
    const sound = document.querySelector(`#${this.props.keyCode}`)[0];
    // reset sound time to start
    sound.currentTime = 0;
    // play the sound
    sound.play();
    // update display
    this.props.updateDisplay(this.props.id);
  }

  render() {
    const button = `drum-pad ${this.props.style}`;
    const audio = `clip ${this.props.keyCode}`;
    return (
      <button id={this.props.id} className={button} onClick={this.handleClick}>
        {this.props.keyName}
        <audio
          id={this.props.keyName}
          className={audio}
          preload="auto"
          ref={audio => {
            this.sound = audio;
          }}
          src={this.props.url}
        />
      </button>
    );
  }
}
