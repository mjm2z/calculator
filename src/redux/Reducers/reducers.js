const initialSign = "positive";
export const currentSign = (state = initialSign, action) => {
  if (action.type === "SIGN") {
    console.log("Flip sign");
    state = action.getSign();
  }
  return state;
};

function getDisplayValue(equation) {
  

// Negative number check (-09)
// Decimal check 0.
// Operation check


  // Have to account for "" "09" "09*" "*09*"
  let eq = equation;
  let lastNum = eq.length-1;
  let firstNum = 0;
  let lastFound = false;
  for ( let index = eq.length -1; index > 0; index--){
    if (!lastFound && (!isNaN(eq.charAt(index)) || eq.charAt(index) === ".")){
      lastNum = index +1;
      lastFound = true;
    } else if ( lastFound && isNaN(eq.charAt(index)) && eq.charAt(index) !== "."){
      firstNum = index +1;
      break;
    }
  }


  let currentValue = eq.substring(firstNum, lastNum);
  // Checking for negative
  if (firstNum > 1 && eq.charAt(firstNum-1)==="-" && eq.charAt(firstNum-2)==="(" ){
    currentValue = `-${currentValue}`;
  }
  const displayNum = Number(currentValue).toString();  
  return currentValue.charAt(currentValue.length-1) === "." ? displayNum + "." : displayNum;
}

const initialState = { currentEquation: "0", displayValue: "0" };
export const equation = (state = initialState, action) => {
  if (action.type === "EQUATION") {
    const draft = {
      currentEquation: action.equation.toString(),
      displayValue: getDisplayValue(action.equation.toString()),
    };
    console.log(draft);
    console.log("AFTER");
    return draft;
  }
  return state;
};
