import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
class Numbers extends Component {
  render() {
    return (
      <div className="button_container">
        <table className="button_table">
          <tr>
              <td className="button_cell">
                <button className="button top_row_buttons">AC</button>
              </td>
              <td className="button_cell">
              <button className="button top_row_buttons">+/-</button>
              </td>
              <td className="button_cell">
              <button className="button top_row_buttons">%</button>
              </td>
              <td className="button_cell">
              <button className="button operation_buttons">÷</button>
              </td>
            </tr>
            <tr>
              <td className="button_cell">
                <button className="button number_buttons">7</button>
              </td>
              <td className="button_cell">
              <button className="button number_buttons">8</button>
              </td>
              <td className="button_cell">
              <button className="button number_buttons">9</button>
              </td>
              <td className="button_cell">
              <button className="button operation_buttons">×</button>
              </td>
            </tr>
            <tr>
              <td className="button_cell">
                <button class="button number_buttons">4</button>
              </td>
              <td className="button_cell">
                <button className="button number_buttons">5</button>
              </td>
              <td className="button_cell">
                <button className="button number_buttons">6</button>
              </td>
              <td className="button_cell">
              <button className="button operation_buttons">-</button>
              </td>
            </tr> 
            <tr>
              <td className="button_cell">
                <button className="button number_buttons">1</button>
              </td>
              <td className="button_cell">
                <button className="button number_buttons">2</button>
              </td>
              <td className="button_cell">
                <button className="button number_buttons">3</button>
              </td>
              <td className="button_cell">
              <button className="button operation_buttons">+</button>
              </td>
            </tr>
              <tr>
              <td className="button_cell" colSpan="2">
                <button className="zero_button number_buttons">0</button>
              </td>
              <td className="button_cell">
                <button className="button number_buttons">.</button>
              </td>
              <td className="button_cell">
              <button className="button operation_buttons">=</button>
              </td>
            </tr>
        </table>
      </div>
    );
  }
}

export default Numbers;
