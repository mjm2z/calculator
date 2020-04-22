const initialSign = "positive";
export const currentSign = (state = initialSign, action) => {
  if (action.type === "SIGN") {
    state = action.getSign();
  }
  return state;
};

function getDisplayValue(equation){
  // Have to account for "" "09" "09*" "*09*"
  let eq = equation;
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

  return Number(currentValue).toString();
}

const initialState = { currentEquation: "0", displayValue:"0"};
export const equation = (state = initialState, action) => {
  console.log("in reducer")
  console.timeLog(action);
  if (action.type === "EQUATION") {
    console.log(`Here: ${action.equation}`);
    const draft = {
      currentEquation: action.equation.toString(),
      displayValue: getDisplayValue(action.equation.toString())
    }
    console.log(draft)
    console.log("AFTER")
    return draft;
  }
  return state;
};
