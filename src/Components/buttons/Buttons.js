import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import PropTypes from "prop-types";
import { actions, selectors } from "../../redux";
import { connect } from "react-redux";
import flow from "lodash.flow";
import { evaluate } from "mathjs";

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.handleButtonclick = this.handleButtonClick.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
  }
  // ToDo
  // Remove console statements, extra comments
  // format code using prettier
  // Clean up code / extra files

  // When the equals is triggered calculate the equation and update the redux state
  handleEquals() {
    let eq = this.props.equation;
    // Check if there is a dangling operation, if so remove it by shrinking the string
    if (
      isNaN(eq.charAt(eq.length - 1)) &&
      eq.charAt(eq.length - 1) !== "." &&
      eq.charAt(eq.length - 1) !== ")"
    ) {
      eq = eq.substring(0, eq.length - 1);
    }
    // Use mathjs to evaluate the expression while adding a closing parenthesis if necessary
    let result = evaluate(eq + this.getCloseParen());
    // If negative result add opening parenthesis but not closing
    if (result < 0) {
      result = `(${result}`;
    }
    this.props.setEquation(result);
  }
  // Handle each button click appropriately
  handleButtonClick(e) {
    const { equation, setEquation, setPercent, setSign } = this.props;
    switch (e) {
      case "AC":
        setEquation("0");
        break;
      case "+/-":
        setSign();
        break;
      case ".":
        this.checkDecimal();
        break;
      case "%":
        setPercent();
        break;
      case "=":
        this.handleEquals();
        break;
      default:
        // Append operation
        if (isNaN(e)) {
          // Remove existing trailing operation and close open parenthesis if previous number is negative
          if (isNaN(equation[equation.length - 1])) {
            setEquation(
              equation.slice(0, equation.length - 1) + this.getCloseParen() + e
            );
          } else {
            setEquation(equation + this.getCloseParen() + e);
          }
        }
        // Append number
        else {
          setEquation(equation + e);
        }
    }
  }
  // Check for a decimal in the current number and do not add if one already exists
  checkDecimal() {
    let eq = this.props.equation;
    if (isNaN(eq.charAt(eq.length - 1)) && eq.charAt(eq.length - 1) !== ".") {
      this.props.setEquation(eq + "0.");
    } else {
      for (let index = eq.length - 1; index >= 0; index--) {
        if (isNaN(eq.charAt(index))) {
          if (eq.charAt(index) !== ".") {
            this.props.setEquation(eq + ".");
          }
          return;
        }
      }
      this.props.setEquation(eq + ".");
    }
  }
  // Return closing parenthesis if current number contains open parenthesis (indicating number is negative), otherwise return empty string
  getCloseParen() {
    const { equation } = this.props;
    const opCount = (equation.match(/\(/g) || []).length;
    const clCount = (equation.match(/\)/g) || []).length;
    return opCount > clCount ? ")" : "";
  }
  // Return unique button text for necessary buttons
  getButtonDisplayText(value) {
    switch (value) {
      case "AC":
        return this.props.equation === "0" ? "AC" : "C";
      case "/":
        return "÷";
      case "*":
        return "×";
      default:
        return value;
    }
  }
  // Create and render buttons onto page
  renderButtons() {
    // Top row buttons
    const topRowButtons = ["AC", "+/-", "%"];
    // Number array and decimal in the order they will be added to the page
    const numberButtons = [
      "7",
      "8",
      "9",
      "4",
      "5",
      "6",
      "1",
      "2",
      "3",
      "0",
      ".",
    ];
    // Operations array
    const operationButtons = ["/", "*", "-", "+", "="];

    // Building entire array
    let buttonArray = numberButtons;
    buttonArray = topRowButtons.concat(buttonArray);
    for (let index = 0; index < operationButtons.length; index++) {
      buttonArray.splice(4 * index + 3, 0, operationButtons[index]);
    }

    // Create array for all the cells in the table
    const rowCount = 5;
    const colCount = 4;
    let htmlArray = [];
    for (let outerIndex = 0; outerIndex < rowCount; outerIndex++) {
      // Empty button cell array for new buttons to be added
      let buttonCellArray = [];
      for (
        let innerIndex = 0;
        innerIndex < colCount &&
        4 * outerIndex + innerIndex < buttonArray.length;
        innerIndex++
      ) {
        let currentIndex = 4 * outerIndex + innerIndex;
        // Get class of the current button for styling
        let buttonClass = "button number_buttons";
        if (topRowButtons.includes(buttonArray[currentIndex])) {
          buttonClass = "button top_row_buttons";
        } else if (operationButtons.includes(buttonArray[currentIndex])) {
          buttonClass =
            this.props.equation.charAt(this.props.equation.length - 1) ===
              buttonArray[currentIndex] && buttonArray[currentIndex] !== "="
              ? "button operation_buttons active"
              : "button operation_buttons";
        } else if (buttonArray[currentIndex] === "0") {
          buttonClass = "zero_button number_buttons";
        }
        // Add the new button to the button cell array with applicable tags and attributes
        buttonCellArray.push(
          <td
            className="button_cell"
            colSpan={buttonArray[currentIndex] === "0" ? "2" : "1"}
            key={innerIndex}
          >
            <button
              className={buttonClass}
              id={`bt${currentIndex}`}
              onClick={() => this.handleButtonClick(buttonArray[currentIndex])}
              active="true"
            >
              {this.getButtonDisplayText(buttonArray[currentIndex])}
            </button>
          </td>
        );
      }
      // Add buttons to current table row
      htmlArray.push(<tr key={outerIndex}>{buttonCellArray}</tr>);
    }
    return <tbody>{htmlArray}</tbody>;
  }
  render() {
    return (
      <div className="button_container">
        <table className="button_table">{this.renderButtons()}</table>
      </div>
    );
  }
}

Buttons.propTypes = {
  equation: PropTypes.string,
};
export const mapStateToProps = (state) => ({
  equation: selectors.getEquation(state),
});

const mapDispatchToProps = {
  setEquation: actions.setEquation,
  setPercent: actions.setPercent,
  setSign: actions.setSign,
};

const enhance = flow(connect(mapStateToProps, mapDispatchToProps));
export default enhance(Buttons);
