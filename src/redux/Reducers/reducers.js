const initialSign = "positive";
export const currentSign = (state = initialSign, action) => {
  if (action.type === "SIGN") {
    state = action.getSign();
  }
  return state;
};

const initialEquation = "0";
export const equation = (state = initialEquation, action) => {
  if (action.type === "EQUATION") {
    console.log(`Here: ${action.equation}`);
    return action.equation;
  }
  return state;
};
