import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
class Numbers extends Component {
  render() {
    return (
      <div className="button_container">
        <table className="button_table">
          <tr>
              <td className="button_cell">
                <button className="button">AC</button>
              </td>
              <td className="button_cell">
              <button className="button">+/-</button>
              </td>
              <td className="button_cell">
              <button className="button">%</button>
              </td>
              <td className="button_cell">
              <button className="button">÷</button>
              </td>
            </tr>
            <tr>
              <td className="button_cell">
                <button className="button">7</button>
              </td>
              <td className="button_cell">
              <button className="button">8</button>
              </td>
              <td className="button_cell">
              <button className="button">9</button>
              </td>
              <td className="button_cell">
              <button className="button">×</button>
              </td>
            </tr>
            <tr>
              <td className="button_cell">
                <button class="button">4</button>
              </td>
              <td className="button_cell">
                <button className="button">5</button>
              </td>
              <td className="button_cell">
                <button className="button">6</button>
              </td>
              <td className="button_cell">
              <button className="button">-</button>
              </td>
            </tr> 
            <tr>
              <td className="button_cell">
                <button className="button">1</button>
              </td>
              <td className="button_cell">
                <button className="button">2</button>
              </td>
              <td className="button_cell">
                <button className="button">3</button>
              </td>
              <td className="button_cell">
              <button className="button">+</button>
              </td>
            </tr>
              <tr>
              <td className="button_cell" colSpan="2">
                <button className="zero_button">0</button>
              </td>
              <td className="button_cell">
                <button className="button">.</button>
              </td>
              <td className="button_cell">
              <button className="button">=</button>
              </td>
            </tr>
        </table>
      </div>
    );
  }
}

export default Numbers;
