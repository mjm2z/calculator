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
  // - Add color effect to selected operators
  // - Add functionality for top buttons
  // - Add functionality for equals
  // - Update button text to what they were before making them dynamic
  // - Add symbol to indicate negative that isn't affected by operation overriding
  // - Add percent functionality -> need to think through this
  // Clean up code / extra files
  // Add tests
  // - Bug at 099=. -> doesn't show 99. shows 0
  // - Maybe put current value in redux to make it easier for negative/positive state
  // - Clicking pos/neg causes negative button to highlight
  // Update readme
  // Document code
  // Remove console statements, extra comments, and format code

  // When the equals is triggered calculate the equation and update the redux state
  handleEquals() {
    let eq = this.props.equation;
    // Check if there is a dangling operation, if so remove it by shrinking the string
    if(isNaN(eq.charAt(eq.length-1)) && eq.charAt(eq.length-1) !== "." && eq.charAt(eq.length-1) !== ")"){
      eq = eq.substring(0, eq.length-2)
    }
    // Use mathjs to evaluate the expression while adding a closing parenthesis if necessary
    let result = evaluate(eq + this.getCloseParen());
    // If negative result add opening parenthesis but not closing
    if ( result < 0) {
      result = `(${result}`
    }
    this.props.setEquation(result);
  }

  handleButtonClick(e) {
    console.log(`BUTTON CLICKED ${e}`)
    const { equation, setEquation, setPercent  } = this.props;
    switch (e) {
      case "AC": 
        setEquation("0");
        break;
      case "+/-":
        this.setSign();
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
        if (isNaN(e) && e!=="="){
          if (isNaN(equation[equation.length - 1])) {
            console.log(`Equation: ${equation.slice(0, equation.length - 1) + this.getCloseParen() + e}`);
    
            setEquation(equation.slice(0, equation.length - 1) + this.getCloseParen() + e);
          } else {
            console.log(`Equation: ${equation + this.getCloseParen() + e}`);
    
            setEquation(equation + this.getCloseParen() + e);
          }
        }
    
        // Handle equals or append number 
        else {
          console.log(`Equation: ${equation + e}`);
    
          setEquation(equation + e);
        }

    }
  }
  checkDecimal(){
    let eq = this.props.equation;
    if (isNaN(eq.charAt(eq.length-1))){
      this.props.setEquation(eq + "0.");
    } else {
      for(let index=eq.length-1; index >= 0; index--) {
        if(isNaN(eq.charAt(index))){
          if(eq.charAt(index)!=="."){
            console.log(`Equation: ${eq+"."}`);

            this.props.setEquation(eq+".");
          }
          return;
        }
      }
      console.log(`Equation: ${eq}.`);

      this.props.setEquation(eq+".");
    }
  }
  setSign(){
    let eq = this.props.equation;
    let index = eq.length-1;
    for (index; index>0; index--){
      if(isNaN(eq.charAt(index))){
        break;
      }
    }
    console.log("Pos/Neg Index: " + index)
    if (index === 0){
      console.log(`Equation: (-${eq}`);

      this.props.setEquation("(-" + eq)
    } else if ( index === eq.length -1) {
      if(eq.charAt(index-1)==="("){
        console.log(`Equation: ${eq.substring(0, index-1)}`);

        this.props.setEquation(eq.substring(0, index-1));
      } else {
        console.log(`Equation: ${eq + "(-"}`);

        this.props.setEquation(eq + "(-")
      }
    } else {
      if(eq.charAt(index-1)==="("){
        console.log(`Equation: ${eq + "(-"}`);
        this.props.setEquation(eq.substring(0, index-1)+ eq.substring(index+1));
      } else {
        console.log(`Equation: ${eq.substring(0, index) + eq.charAt(index) + "(-" + eq.substring(index+1) }`);
        this.props.setEquation(eq.substring(0, index) + eq.charAt(index) + "(-" + eq.substring(index+1) )
      }
    }

  }
  getCloseParen() {
    const { equation } = this.props;
    const opCount = (equation.match(/\(/g) || []).length;
    const clCount = (equation.match(/\)/g) || []).length;
    return opCount > clCount ? ")" : "";
  }
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
  renderButtons() {
    const topRowButtons = ["AC", "+/-", "%"];
    // Order or numbers as they'll be added to table
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
      let buttonCellArray = [];
      for (
        let innerIndex = 0;
        innerIndex < colCount &&
        4 * outerIndex + innerIndex < buttonArray.length;
        innerIndex++
      ) {
        let currentIndex = 4 * outerIndex + innerIndex;
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
      htmlArray.push(<tr key={outerIndex}>{buttonCellArray}</tr>);
    }
    return <tbody >{htmlArray}</tbody>;
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
  equation: PropTypes.string
};
export const mapStateToProps = (state) => ({
  equation: selectors.getEquation(state)
});

const mapDispatchToProps = {
  setEquation: actions.setEquation,
  setPercent: actions.setPercent
};

const enhance = flow(connect(mapStateToProps, mapDispatchToProps));
export default enhance(Buttons);
