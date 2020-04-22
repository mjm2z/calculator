import React, { Component } from "react";
import { selectors } from "../../redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import flow from "lodash.flow";


import "bootstrap/dist/css/bootstrap.css";
class Display extends Component {
  displayValue(){
    // Have to account for "" "09" "09*" "*09*"
    let eq = this.props.equation;
    if (isNaN(eq.charAt(eq.length-1))) {
      eq = eq.substring(0,eq.length - 1);
    }
    let index = 0;
    let currentValue = eq;
    for (index = eq.length -1; index > 0; index --){
      if (isNaN(eq.charAt(index)) && eq.charAt(index) !== ".") {
        currentValue = eq.substring(index+1);
        break;
      }
    }
    console.log(this.props.equation);
    console.log(currentValue);
    return Number(currentValue).toString();
  }
  render() {
    return (
      <div className="display_container">
        <input type="text" placeholder={this.displayValue()} disabled></input>
      </div>
    );
  }
}


Display.propTypes = {
  equation: PropTypes.string,
};
export const mapStateToProps = (state) => ({
  equation: selectors.getEquation(state),
});

const enhance = flow(connect(mapStateToProps));
export default enhance(Display);
