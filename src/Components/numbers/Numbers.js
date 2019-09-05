import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
class Numbers extends Component {
  render() {
    return (
      <div className="button_container">
        <table>
        <tr>
            <td className="clear_cell">
              <button className="button">AC</button>
            </td>
            <td className="negate_cell">
            <button className="button">+/-</button>
            </td>
            <td className="percentage_cell">
            <button className="button">%</button>
            </td>
          </tr>
          <tr>
            <td className="seven_cell">
              <button className="button">7</button>
            </td>
            <td className="eight_cell">
            <button className="button">8</button>
            </td>
            <td className="nine_cell">
            <button className="button">9</button>
            </td>
          </tr>
          <tr>
            <td className="four_cell">
              <button class="button">4</button>
            </td>
            <td className="five_cell">
              <button className="button">5</button>
            </td>
            <td className="six_cell">
              <button className="button">6</button>
            </td>
          </tr> 
          <tr>
            <td className="one_cell">
              <button className="button">1</button>
            </td>
            <td className="two_cell">
              <button className="button">2</button>
            </td>
            <td className="three_cell">
              <button className="button">3</button>
            </td>
          </tr>
            <tr>
            <td className="zero_cell" colSpan="2">
              <button className="zero_button">0</button>
            </td>
            <td class="decimal_cell">
              <button class="button">.</button>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Numbers;
