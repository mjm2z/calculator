import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import PropTypes from 'prop-types';
import { actions, selectors } from '../../redux'
import { connect } from 'react-redux';
import flow from 'lodash.flow';

class Buttons extends Component {
  constructor(props){
    super(props)
    this.handleButtonclick = this.handleButtonClick.bind(this)
  }

  handleButtonClick(e){
    console.log(e);
    this.props.setEquation(e)
  }
  render() {
    return (
      <div className="button_container">
        <table className="button_table">
          <tbody>
            <tr>
                <td className="button_cell">
                  <button className="button top_row_buttons" onClick={() => this.handleButtonClick('AC')}>AC</button>
                </td>
                <td className="button_cell">
                <button className="button top_row_buttons" onClick={() => this.handleButtonClick('+/-')}>+/-</button>
                </td>
                <td className="button_cell">
                <button className="button top_row_buttons" onClick={() => this.handleButtonClick('%')}>%</button>
                </td>
                <td className="button_cell">
                <button className="button operation_buttons" onClick={() => this.handleButtonClick('/')}>÷</button>
                </td>
              </tr>
              <tr>
                <td className="button_cell">
                  <button className="button number_buttons" onClick={() => this.handleButtonClick('7')}>7</button>
                </td>
                <td className="button_cell">
                <button className="button number_buttons" onClick={() => this.handleButtonClick('8')}>8</button>
                </td>
                <td className="button_cell">
                <button className="button number_buttons" onClick={() => this.handleButtonClick('9')}>9</button>
                </td>
                <td className="button_cell">
                <button className="button operation_buttons" onClick={() => this.handleButtonClick('*')}>×</button>
                </td>
              </tr>
              <tr>
                <td className="button_cell">
                  <button className="button number_buttons" onClick={() => this.handleButtonClick('4')}>4</button>
                </td>
                <td className="button_cell">
                  <button className="button number_buttons" onClick={() => this.handleButtonClick('5')}>5</button>
                </td>
                <td className="button_cell">
                  <button className="button number_buttons" onClick={() => this.handleButtonClick('6')}>6</button>
                </td>
                <td className="button_cell">
                <button className="button operation_buttons" onClick={() => this.handleButtonClick('-')}>-</button>
                </td>
              </tr> 
              <tr>
                <td className="button_cell">
                  <button className="button number_buttons" onClick={() => this.handleButtonClick('1')}>1</button>
                </td>
                <td className="button_cell">
                  <button className="button number_buttons" onClick={() => this.handleButtonClick('2')}>2</button>
                </td>
                <td className="button_cell">
                  <button className="button number_buttons" onClick={() => this.handleButtonClick('3')}>3</button>
                </td>
                <td className="button_cell">
                <button className="button operation_buttons" onClick={() => this.handleButtonClick('+')}>+</button>
                </td>
              </tr>
                <tr>
                <td className="button_cell" colSpan="2">
                  <button className="zero_button number_buttons" onClick={() => this.handleButtonClick('0')}>0</button>
                </td>
                <td className="button_cell">
                  <button className="button number_buttons" onClick={() => this.handleButtonClick('.')}>.</button>
                </td>
                <td className="button_cell">
                <button className="button operation_buttons" onClick={() => this.handleButtonClick('=')}>=</button>
                </td>
              </tr>
            </tbody>
        </table>
      </div>
    );
  }
}

Buttons.propTypes = {
  
  equation: PropTypes.string


}
export const mapStateToProps = (state) => ({
  equation: selectors.getEquation(state)
});

const mapDispatchToProps = {
  setEquation: actions.setEquation
}

const enhance = flow(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)
export default enhance(Buttons);
