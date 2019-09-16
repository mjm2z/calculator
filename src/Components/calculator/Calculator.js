import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Buttons from "../buttons/Buttons";
import Display from "../display/Display";

class Calculator extends Component {
  render() {
    return (
      <div className="calculator_container">
        <Display />
        <Buttons />
      </div>
    );
  }
}

export default Calculator;
