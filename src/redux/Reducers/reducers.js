// Get the indices for the current/last number in the array
function getCurrentIndices(equation){
  let lastNum = equation.length-1;
  let firstNum = 0;
  let lastFound = false;
  // Start at the end and traverse the string backwards while storing the last and first indice of the number
  for ( let index = equation.length -1; index >0; index--){
    if (!lastFound && (!isNaN(equation.charAt(index)) || equation.charAt(index) === ".")){
      lastNum = index +1;
      lastFound = true;
    } else if ( lastFound && isNaN(equation.charAt(index)) && equation.charAt(index) !== "."){
      firstNum = index +1;
      break;
    }
  }
  return {first: firstNum, last: lastNum}
}
// Get the value to display in the text area
function getDisplayValue(equation) {
  let currIndices = getCurrentIndices(equation);
  let currentValue = equation.substring(currIndices.first, currIndices.last);
  // Checking for negative at beginning of number
  if (currIndices.first > 1 && equation.charAt(currIndices.first-1)==="-" && equation.charAt(currIndices.first-2)==="(" ){
    currentValue = `-${currentValue}`;
  }
  const displayNum = Number(currentValue).toString();  
  return currentValue.charAt(currentValue.length-1) === "." ? displayNum + "." : displayNum;
}
// Set the current number to it's percent value expressed as decimal
function setPercent(equation) {
  let currIndices = getCurrentIndices(equation);
  const currentValue = Number(equation.substring(currIndices.first, currIndices.last));
  const updatedValue = currentValue/100;
  return equation.substring(0, currIndices.first) + updatedValue + equation.substring(currIndices.last);
}
// The initial state in redux holds the current written equation and the current displayed number
const initialState = { currentEquation: "0", displayValue: "0" };
export const equation = (state = initialState, action) => {
  if (action.type === "EQUATION") {
    const draft = {
      currentEquation: action.equation.toString(),
      displayValue: getDisplayValue(action.equation.toString()),
    };
    return draft;
  } else if (action.type === "PERCENT") {
    const updatedEquation = (setPercent(state.currentEquation));
    const draft = {
      currentEquation: updatedEquation,
      displayValue: getDisplayValue(updatedEquation.toString())
    }
    return draft
  }
  return state;
};
