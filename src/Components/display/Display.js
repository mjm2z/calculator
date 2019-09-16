import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
class Display extends Component {
  render() {
    return (
      <div className="display_container">
          <input type="text" placeholder="0" disabled></input>
      </div>
    );
  }
}

export default Display;
