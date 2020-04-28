import React from "react";
import Buttons from "./Buttons";
import { shallow } from "enzyme";
import configureStore from "../../redux";

describe("Button Tests", () => {
  let shallowButtons = null;
  let store = configureStore();

  const buttons = () => {
    if (!shallowButtons) {
      shallowButtons = shallow(<Buttons store={store} />);
    }
    return shallowButtons;
  };
  function reset() {
    shallowButtons = null;
  }
  afterEach(() => {
    reset();
  });

  it("Given the calculator, when any number is clicked, then it should be appended to the current equation", () => {
    const currentEquation = "0";
    store.dispatch({ type: "EQUATION", equation: currentEquation });
    const wrapper = buttons();
    const btAC = wrapper.dive().dive().find("#bt0");
    const btZero = wrapper.dive().dive().find("#bt16");
    const btOne = wrapper.dive().dive().find("#bt12");
    const btTwo = wrapper.dive().dive().find("#bt13");
    const btThree = wrapper.dive().dive().find("#bt14");
    const btFour = wrapper.dive().dive().find("#bt8");
    const btFive = wrapper.dive().dive().find("#bt9");
    const btSix = wrapper.dive().dive().find("#bt10");
    const btSeven = wrapper.dive().dive().find("#bt4");
    const btEight = wrapper.dive().dive().find("#bt5");
    const btNine = wrapper.dive().dive().find("#bt6");

    btAC.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "0", displayValue: "0" },
    });
    btOne.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "01", displayValue: "1" },
    });
    btTwo.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "02", displayValue: "2" },
    });
    btThree.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "03", displayValue: "3" },
    });
    btFour.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "04", displayValue: "4" },
    });
    btFive.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "05", displayValue: "5" },
    });
    btSix.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "06", displayValue: "6" },
    });
    btSeven.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "07", displayValue: "7" },
    });
    btEight.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "08", displayValue: "8" },
    });
    btNine.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "09", displayValue: "9" },
    });
    btZero.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "00", displayValue: "0" },
    });
  });
  it("Given the calculator, when the AC button is clicked, then the equation should be reset to 0", () => {
    store.dispatch({ type: "EQUATION", equation: "(-0123)*44.678/0.05" });
    const wrapper = buttons();
    const btAC = wrapper.dive().dive().find("#bt0");

    btAC.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "0", displayValue: "0" },
    });
  });
  it("Given the calculator, when the positive/negative button is clicked, then the sign of the current number should be switched", () => {
    store.dispatch({ type: "EQUATION", equation: "0" });
    let btPosNeg = buttons().dive().dive().find("#bt1");
    btPosNeg.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "(-0", displayValue: "-0" },
    });

    store.dispatch({ type: "EQUATION", equation: "099*9" });
    reset();
    btPosNeg = buttons().dive().dive().find("#bt1");
    btPosNeg.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "099*(-9", displayValue: "-9" },
    });

    store.dispatch({ type: "EQUATION", equation: "09+" });
    reset();
    btPosNeg = buttons().dive().dive().find("#bt1");
    btPosNeg.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "09+(-0", displayValue: "-0" },
    });

    store.dispatch({ type: "EQUATION", equation: "5.123" });
    reset();
    btPosNeg = buttons().dive().dive().find("#bt1");
    btPosNeg.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "(-5.123", displayValue: "-5.123" },
    });

    store.dispatch({ type: "EQUATION", equation: "(-5.123" });
    reset();
    btPosNeg = buttons().dive().dive().find("#bt1");
    btPosNeg.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "5.123", displayValue: "5.123" },
    });

    store.dispatch({ type: "EQUATION", equation: "099*8.90123+" });
    reset();
    btPosNeg = buttons().dive().dive().find("#bt1");
    btPosNeg.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "099*8.90123+(-0", displayValue: "-0" },
    });
  });

  it("Given the calculator, when the decimal button is clicked, then it should be appended to the current equation if applicable", () => {
    store.dispatch({ type: "EQUATION", equation: "0" });
    let btDecimal = buttons().dive().dive().find("#bt17");
    btDecimal.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "0.", displayValue: "0." },
    });

    store.dispatch({ type: "EQUATION", equation: "0.18/6+(-1" });
    reset();
    btDecimal = buttons().dive().dive().find("#bt17");
    btDecimal.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "0.18/6+(-1.", displayValue: "-1." },
    });

    store.dispatch({ type: "EQUATION", equation: "0.18/6+" });
    reset();
    btDecimal = buttons().dive().dive().find("#bt17");
    btDecimal.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "0.18/6+0.", displayValue: "0." },
    });

    store.dispatch({ type: "EQUATION", equation: "0.5*15" });
    reset();
    btDecimal = buttons().dive().dive().find("#bt17");
    btDecimal.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "0.5*15.", displayValue: "15." },
    });

    store.dispatch({ type: "EQUATION", equation: "01*15.6" });
    reset();
    btDecimal = buttons().dive().dive().find("#bt17");
    btDecimal.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "01*15.6", displayValue: "15.6" },
    });

    store.dispatch({ type: "EQUATION", equation: "01*15." });
    reset();
    btDecimal = buttons().dive().dive().find("#bt17");
    btDecimal.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "01*15.", displayValue: "15." },
    });
  });

  it("Given the calculator, when the percent button is clicked, then the current number should be divided by 100", () => {
    store.dispatch({ type: "EQUATION", equation: "01" });
    let btPercent = buttons().dive().dive().find("#bt2");
    btPercent.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "0.01", displayValue: "0.01" },
    });

    store.dispatch({ type: "EQUATION", equation: "01*15.6" });
    reset();
    btPercent = buttons().dive().dive().find("#bt2");
    btPercent.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "01*0.156", displayValue: "0.156" },
    });

    store.dispatch({ type: "EQUATION", equation: "01*0.156" });
    reset();
    btPercent = buttons().dive().dive().find("#bt2");
    btPercent.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "01*0.00156", displayValue: "0.00156" },
    });
  });

  it("Given the calculator, when an operation is clicked and there are no operators at the end of the equation, then the operator should be appeneded to the end of the equation", () => {
    store.dispatch({ type: "EQUATION", equation: "0123" });
    const wrapper = buttons();
    const btAdd = wrapper.dive().dive().find("#bt15");
    const btSubtract = wrapper.dive().dive().find("#bt11");
    const btMultiply = wrapper.dive().dive().find("#bt7");
    const btDivide = wrapper.dive().dive().find("#bt3");

    expect(store.getState()).toEqual({
      equation: { currentEquation: "0123", displayValue: "123" },
    });
    btAdd.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "0123+", displayValue: "123" },
    });
    btSubtract.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "0123-", displayValue: "123" },
    });
    btMultiply.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "0123*", displayValue: "123" },
    });
    btDivide.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "0123/", displayValue: "123" },
    });
  });
  it("Given the calculator, when an operation is clicked and there is an operator at the end of the equation, then the new operator should be appeneded and replace the previous", () => {
    // Multiply and Divide
    store.dispatch({ type: "EQUATION", equation: "0123+" });
    const wrapper = buttons();
    const btMultiply = wrapper.dive().dive().find("#bt7");
    const btDivide = wrapper.dive().dive().find("#bt3");

    btMultiply.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "0123*", displayValue: "123" },
    });
    btDivide.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "0123/", displayValue: "123" },
    });
  });
  it("Given the calculator, when an operation is clicked and there is an operator at the end of the equation, then the new operator should be appeneded and replace the previous", () => {
    // Add and Subtract
    store.dispatch({ type: "EQUATION", equation: "0123*" });
    const wrapper = buttons();
    const btAdd = wrapper.dive().dive().find("#bt15");
    const btSubtract = wrapper.dive().dive().find("#bt11");

    btAdd.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "0123+", displayValue: "123" },
    });
    btSubtract.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "0123-", displayValue: "123" },
    });
  });
  it("Given the calculator, when an operation is clicked and the previous number is negative and has an opening parenthesis, then a close parenthesis is appeneded before the operator", () => {
    store.dispatch({ type: "EQUATION", equation: "(-0123" });
    const wrapper = buttons();
    const btAdd = wrapper.dive().dive().find("#bt15");

    btAdd.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "(-0123)+", displayValue: "-123" },
    });
  });
  it("Given the calculator, when the equation is complete and the equal button is clicked, the correct solution should display and replace the equation", () => {
    store.dispatch({ type: "EQUATION", equation: "0123" });
    let btEqual = buttons().dive().dive().find("#bt18");
    btEqual.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "123", displayValue: "123" },
    });

    store.dispatch({ type: "EQUATION", equation: "01234+" });
    reset();
    btEqual = buttons().dive().dive().find("#bt18");
    btEqual.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "1234", displayValue: "1234" },
    });

    store.dispatch({ type: "EQUATION", equation: "01234-234" });
    reset();
    btEqual = buttons().dive().dive().find("#bt18");
    btEqual.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "1000", displayValue: "1000" },
    });

    store.dispatch({ type: "EQUATION", equation: "01234+4321 + 0.003" });
    reset();
    btEqual = buttons().dive().dive().find("#bt18");
    btEqual.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "5555.003", displayValue: "5555.003" },
    });

    store.dispatch({ type: "EQUATION", equation: "(-123)*0.123+123" });
    reset();
    btEqual = buttons().dive().dive().find("#bt18");
    btEqual.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "107.871", displayValue: "107.871" },
    });

    store.dispatch({ type: "EQUATION", equation: "(-123)*0.123+" });
    reset();
    btEqual = buttons().dive().dive().find("#bt18");
    btEqual.simulate("click");
    expect(store.getState()).toEqual({
      equation: { currentEquation: "(-15.129", displayValue: "-15.129" },
    });
  });
});
