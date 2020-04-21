import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import PropTypes from "prop-types";
import { actions, selectors } from "../../redux";
import { connect } from "react-redux";
import flow from "lodash.flow";

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.handleButtonclick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(e) {
    console.log(e);
    this.props.setEquation(e);
  }
  renderButtons() {
    console.log("Rendering buttons");
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

    console.log(buttonArray[1]);

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
        if (
          topRowButtons.includes(buttonArray[currentIndex]) ||
          operationButtons.includes(buttonArray[currentIndex])
        ) {
          buttonClass = topRowButtons.includes(buttonArray[currentIndex])
            ? "button top_row_buttons"
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
              onClick={() => this.handleButtonClick(buttonArray[currentIndex])}
            >
              {buttonArray[currentIndex]}
            </button>
          </td>
        );
      }
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
};

const enhance = flow(connect(mapStateToProps, mapDispatchToProps));
export default enhance(Buttons);
