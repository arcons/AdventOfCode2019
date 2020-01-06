const fs = require('fs')
 
var contents = fs.readFileSync('./day7input.txt', 'utf8');
// const contents = '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0'
// const contents = '3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0'
// const contents = '3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0'
let commands = contents.split(',').map(number => parseInt(number))
const original = commands.slice();
// every 4 operations perform
var i = 0;

var permArr = [],
  usedChars = [];

// shamelessly stole this code for permutations
function permute(input) {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr
};

var inputOptions = permute(['0', '1', '2', '3','4'])
var feedbackOptions = permute(['5', '6', '7', '8', '9'])
// Position mode '0' store values at a position, get the value at address 50
// Parameter modes are stored in the same value as the opcode . The first two are opcodes then all parameters are
// x%10, missing params are = 0
// immediate mode just take the value at that index
function parameterMode() {
  let number = parseInt(commands[i]);
  // console.log(number);
  const opCode = number % 10;
  number = parseInt(number/100);
  let parameterCodes = [];
  // number should not be larger than 3 digits
  // get the operationall codes of the next few digits
  let numberOfDigits = 0;
  while(number!==0) {
    parameterCodes.push(number%10);
    number =  Math.floor(number/10);
    numberOfDigits++;
  }
  // last position will always be 0 for this problem
  for(j=numberOfDigits; j<3; j++) {
    parameterCodes.push(0);
  }
  // check the parameter codes then perform the operation if its 0 its the position of the param
  const paramOne = parameterCodes[0] === 0 ? commands[commands[i+1]] : commands[i+1]
  const paramTwo = parameterCodes[1] === 0 ? commands[commands[i+2]] : commands[i+2]
  // perform the operation on commands
  if(opCode === 1) {
    commands[commands[i+3]] = paramOne + paramTwo
    i+=4
  } else if (opCode === 2) {
    commands[commands[i+3]] = paramOne * paramTwo
    i+=4
  } else if (opCode === 3) {
    // these will come with parameterCodes
    console.log(`take ${returnedValue} and store it in addresss`, commands[i+1])
    commands[i+1] = returnedValue;
    // increment output
    i+=2;
  } else if (opCode === 4) {
    const output = parameterCodes[0] === 0 ? commands[commands[i+1]] : commands[i+1]
    console.log("output", output);
    i+=2;
  } else if (opCode === 5) {
    if(paramOne !== 0){
      i = paramTwo;
    } else {
      i+=3
    }
  } else if (opCode === 6) {
    if(paramOne === 0){
      i = paramTwo;
    } else {
      i+=3
    }
  } else if (opCode === 7) {
    if(paramOne < paramTwo) {
      commands[commands[i+3]] = 1;
    } else {
      commands[commands[i+3]] = 0;
    }
    i+=4;
  } else if (opCode === 8) {
    if(paramOne === paramTwo) {
      commands[commands[i+3]] = 1;
    } else {
      commands[commands[i+3]] = 0;
    }
    i+=4;
  }
   else {
    // this is where the processing functions comes in
    console.log('Youve goofed somewhere')
  }
}

var usePhase = true;
var maxValue = 0;
var tempMax = 0;
var returnedValue = 0;
inputOptions.forEach(ampPhase => {
  ampPhase = ampPhase.map(number => parseInt(number))
  returnedValue = 0;
  tempMax = runWithPhaseArray(ampPhase)
  if(tempMax > maxValue) {
    maxValue = tempMax;
  }
})

function runWithPhaseArray(allThePhase) {
  for(a = 0; a < 5; a++) {
    // set valeu to the phase setting
    // reset to position 0 of the computer
    i=0;
    commands = original.slice();
    returnedValue = runIntComp(returnedValue, allThePhase[a]);
    usePhase = true;
    if (a == 4) {
      return returnedValue;
    }
  }
}


function runIntComp(returnedValue, phase) {
  try{
      while(commands[i] !== 99) {
        // current operation is opcode
        const opCode = commands[i];
        const pos1 = commands[i+1];
        const pos2 = commands[i+2];
        const resultPos = commands[i+3];
        if(opCode === 1) {
          commands[resultPos] = commands[pos1] + commands[pos2]
          i+=4
        } else if (opCode === 2) {
          commands[resultPos] = commands[pos1] * commands[pos2]
          i+=4
        } else if (opCode === 3) {
          // console.log(`take ${returnedValue} and store it in addresss`, commands[i+1])
          if(usePhase) {
            commands[pos1] = phase;
            usePhase = false;
          } else {
            commands[pos1] = returnedValue;
          }
          i+=2;
        } else if (opCode === 4) {
          return commands[commands[i+1]]
        } else if (opCode === 5) {
          if(pos1 !== 0){
            i = pos2;
          } else {
            i+=3;
          }
        } else if (opCode === 6) {
          if(pos1 === 0){
            i = pos2;
          } else {
            i+=3;
          }
        } else if (opCode === 7) {
          if(commands[pos1] < commands[pos2]) {
            commands[resultPos] = 1;
          } else {
            commands[resultPos] = 0;
          }
          i+=4;
        } else if (opCode === 8) {
          if(commands[pos1] === commands[pos2]) {
            commands[resultPos] = 1;
          } else {
            commands[resultPos] = 0;
          }
          i+=4;
        } else {
          parameterMode()
        }
        // increases by the number in the instruction, so increase the number for the number of 
      }
    } catch (e) {
      console.log("You goofed", e)
    }
  }

console.log(maxValue)

// console.log(commands)
console.log("done")