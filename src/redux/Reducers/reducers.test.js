import * as reducers from "./reducers";

const initialState = { currentEquation: "0", displayValue: "0" };

describe("Reducer Tests", () => {
  it("Given the reducer is called with an empty action, it should return the initial state", () => {
    const stateAfter = reducers.equation(initialState, {});
    expect(stateAfter).toEqual(initialState);
  });
  it("Given the reducer is called with an action with type EQUATION and an invalid equation, it should return the correct equation and display value", () => {
    const expectedState1 = { currentEquation: "", displayValue: "0" };
    let stateAfter = reducers.equation(initialState, {
      type: "EQUATION",
      equation: "",
    });
    expect(stateAfter).toEqual(expectedState1);
    const expectedState2 = { currentEquation: "abc", displayValue: "NaN" };
    stateAfter = reducers.equation(initialState, {
      type: "EQUATION",
      equation: "abc",
    });
    expect(stateAfter).toEqual(expectedState2);
  });
  it("Given the reducer is called with an action with type EQUATION and valid equation, it should return the correct equation and display value", () => {
    const expectedState1 = {
      currentEquation: "123+456-(-78)*9",
      displayValue: "9",
    };
    let stateAfter = reducers.equation(initialState, {
      type: "EQUATION",
      equation: "123+456-(-78)*9",
    });
    expect(stateAfter).toEqual(expectedState1);
    const expectedState2 = {
      currentEquation: "123456789",
      displayValue: "123456789",
    };
    stateAfter = reducers.equation(initialState, {
      type: "EQUATION",
      equation: "123456789",
    });
    expect(stateAfter).toEqual(expectedState2);
    const expectedState3 = { currentEquation: "0.004", displayValue: "0.004" };
    stateAfter = reducers.equation(initialState, {
      type: "EQUATION",
      equation: "0.004",
    });
    expect(stateAfter).toEqual(expectedState3);
    const expectedState4 = {
      currentEquation: "18*(-0.008",
      displayValue: "-0.008",
    };
    stateAfter = reducers.equation(initialState, {
      type: "EQUATION",
      equation: "18*(-0.008",
    });
    expect(stateAfter).toEqual(expectedState4);
    const expectedState5 = {
      currentEquation: "(-123.45)+(-18)",
      displayValue: "-18",
    };
    stateAfter = reducers.equation(initialState, {
      type: "EQUATION",
      equation: "(-123.45)+(-18)",
    });
    expect(stateAfter).toEqual(expectedState5);
  });
  it("Given the reducer is called with an action with type PERCENT and valid equation, it should return the correct equation and display value", () => {
    let startState = { currentEquation: "09", displayValue: "9" };
    const expectedState1 = { currentEquation: "0.09", displayValue: "0.09" };
    let stateAfter = reducers.equation(startState, { type: "PERCENT" });
    expect(stateAfter).toEqual(expectedState1);

    startState = { currentEquation: "12*13(-14)+15", displayValue: "15" };
    const expectedState2 = {
      currentEquation: "12*13(-14)+0.15",
      displayValue: "0.15",
    };
    stateAfter = reducers.equation(startState, { type: "PERCENT" });
    expect(stateAfter).toEqual(expectedState2);

    startState = { currentEquation: "100", displayValue: "100" };
    const expectedState3 = { currentEquation: "1", displayValue: "1" };
    stateAfter = reducers.equation(startState, { type: "PERCENT" });
    expect(stateAfter).toEqual(expectedState3);

    startState = { currentEquation: "100.5", displayValue: "100.5" };
    const expectedState4 = { currentEquation: "1.005", displayValue: "1.005" };
    stateAfter = reducers.equation(startState, { type: "PERCENT" });
    expect(stateAfter).toEqual(expectedState4);

    startState = { currentEquation: "100.5+(-6)*(-0", displayValue: "-6" };
    const expectedState5 = {
      currentEquation: "100.5+(-6)*(-0",
      displayValue: "-0",
    };
    stateAfter = reducers.equation(startState, { type: "PERCENT" });
    expect(stateAfter).toEqual(expectedState5);
  });
  it("Given the reducer is called with an action with type SIGN and valid equation, it should switch the sign of the current number and return the correct equation and display value", () => {
    let startState = { currentEquation: "09", displayValue: "9" };
    const expectedState1 = { currentEquation: "(-09", displayValue: "-9" };
    let stateAfter = reducers.equation(startState, { type: "SIGN" });
    expect(stateAfter).toEqual(expectedState1);

    startState = { currentEquation: "12*13(-14)+15", displayValue: "15" };
    const expectedState2 = {
      currentEquation: "12*13(-14)+(-15",
      displayValue: "-15",
    };
    stateAfter = reducers.equation(startState, { type: "SIGN" });
    expect(stateAfter).toEqual(expectedState2);

    startState = { currentEquation: "100", displayValue: "100" };
    const expectedState3 = { currentEquation: "(-100", displayValue: "-100" };
    stateAfter = reducers.equation(startState, { type: "SIGN" });
    expect(stateAfter).toEqual(expectedState3);

    startState = { currentEquation: "100.5", displayValue: "100.5" };
    const expectedState4 = {
      currentEquation: "(-100.5",
      displayValue: "-100.5",
    };
    stateAfter = reducers.equation(startState, { type: "SIGN" });
    expect(stateAfter).toEqual(expectedState4);

    startState = { currentEquation: "100.5+(-6)*(-0", displayValue: "-6" };
    const expectedState5 = {
      currentEquation: "100.5+(-6)*0",
      displayValue: "0",
    };
    stateAfter = reducers.equation(startState, { type: "SIGN" });
    expect(stateAfter).toEqual(expectedState5);
  });
});
