const lowerBound = 359282
const upperBound = 820401;

/*
It is a six-digit number.
The value is within the range given in your puzzle input.
Two adjacent digits are the same (like 22 in 122345).
Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).

Other than the range rule, the following are true:

111111 meets these criteria (double 11, never decreases).
223450 does not meet these criteria (decreasing pair of digits 50).
123789 does not meet these criteria (no double).
How many different passwords within the range given in your puzzle input meet these criteria?
*/
function isValid(arrayOfDigits) {
  let addCounter = false;
  let matchNumber;
  for(j=1; j<arrayOfDigits.length; j++) {
    if(arrayOfDigits[j-1] > arrayOfDigits[j]) {
      return {index: j, addToCounter: false};
    }
    if(arrayOfDigits[j-1] === arrayOfDigits[j]) {
      const number = arrayOfDigits[j].toString() + arrayOfDigits[j].toString() + arrayOfDigits[j].toString();
      if(!arrayOfDigits.map(String).join("").includes(number)){// && matchNumber === arrayOfDigits[j]){
        addCounter = true;
        // matchNumber = arrayOfDigits[j]
      // } else {
      //   addCounter = true;
      //   matchNumber = arrayOfDigits[j]
      }
    }
  }
  return {index: j, addToCounter: addCounter};
}
const test = 111122
console.log(isValid(test.toString(10).split('').map(element => parseInt(element))))

let counter = 0;
for(i=lowerBound; i<=upperBound; i++){
  // split into characters
  // digits cannot decreases
  const arrayOfDigits = i.toString(10).split('').map(element => parseInt(element))
  let {index, addToCounter} = isValid(arrayOfDigits);
  if(addToCounter) {
    counter++;
  } else {
    
  }
}
console.log(counter)