import React, { Component } from "react";
import { selectors } from "../../redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import flow from "lodash.flow";

import "bootstrap/dist/css/bootstrap.css";
class Display extends Component {
  displayValue() {}
  render() {
    return (
      <div className="display_container">
        <input
          type="text"
          placeholder={this.props.displayText}
          disabled
        ></input>
      </div>
    );
  }
}

Display.propTypes = {
  equation: PropTypes.string,
};
export const mapStateToProps = (state) => ({
  equation: selectors.getEquation(state),
  displayText: selectors.getDisplayValue(state),
});

const enhance = flow(connect(mapStateToProps));
export default enhance(Display);
