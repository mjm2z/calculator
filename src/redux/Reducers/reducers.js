// Get the indices for the current/last number in the array
function getCurrentIndices(equation){
  let lastNum = equation.length;
  let firstNum = 0;
  let lastFound = false;
  // Start at the end and traverse the string backwards while storing the last and first index of the number
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
// Get the current value to display on the calculator
function getDisplayValue(equation) {
  let currIndices = getCurrentIndices(equation);
  let currentValue = equation.substring(currIndices.first, currIndices.last);
  let displayNum = Number(currentValue).toString();  
  // Checking for negative at beginning of number
  if (currIndices.first > 1 && equation.charAt(currIndices.first-1)==="-" && equation.charAt(currIndices.first-2)==="(" ){
    displayNum = `-${displayNum}`;
  }

  return currentValue.charAt(currentValue.length-1) === "." ? displayNum + "." : displayNum;
}
// Set the current number to it's percent value expressed as decimal
function setPercent(equation) {
  let currIndices = getCurrentIndices(equation);
  const currentValue = Number(equation.substring(currIndices.first, currIndices.last));
  const updatedValue = currentValue/100;
  return equation.substring(0, currIndices.first) + updatedValue + equation.substring(currIndices.last);
}
// Switch the sign of the current number
function setSign(equation) {
    const currIndices = getCurrentIndices(equation)
    if (currIndices.last !== 0 && currIndices.last !== equation.length) {
      return `${equation}(-0`
    } else if (currIndices.first > 1 && equation.charAt(currIndices.first-2) === '(') {
      return `${equation.substring(0, currIndices.first-2)}${equation.substring(currIndices.first)}`
    } else {
      return `${equation.substring(0, currIndices.first)}(-${equation.substring(currIndices.first)}`
    }
}
// The initial state in redux holds the current written equation and the current displayed number
const initialState = { currentEquation: "0", displayValue: "0" };
export const equation = (state = initialState, action) => {
  let draft = state;
  let updatedEquation = state.currentEquation
  switch(action.type) {
    case 'EQUATION':
      draft = {
        currentEquation: action.equation.toString(),
        displayValue: getDisplayValue(action.equation.toString()),
      };
      return draft;
    case 'PERCENT':
      updatedEquation = setPercent(state.currentEquation);
      draft = {
        currentEquation: updatedEquation,
        displayValue: getDisplayValue(updatedEquation.toString())
      }
      return draft;
    case 'SIGN':
      updatedEquation = setSign(state.currentEquation);
      draft = {
        currentEquation: updatedEquation,
        displayValue: getDisplayValue(updatedEquation.toString())
      }
      return draft;
    default: 
      return state
  }
};
