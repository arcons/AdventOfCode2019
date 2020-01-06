const fs = require('fs')
 
// var contents = fs.readFileSync('./day9input.txt', 'utf8');
var contents = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99'
const value = 0;
// Test cases
var commands = contents.split(',');
commands = commands.map(number => parseInt(number))
// every 4 operations perform
var i = 0;

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
    console.log('take input and store it in addresss', commands[i+1])
    commands[i+1] = value;
    // increment output
    i+=2;
  } else if (opCode === 4) {
    const output = parameterCodes[0] === 0 ? commands[commands[i+1]] : commands[i+1]
    console.log("output", output);//, i, commands[i]);
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
  } else if (opCode === 9) {
    relativeBase += commands[pos1];
    i+=2
  }
   else {
    // this is where the processing functions comes in
    console.log('Youve goofed somewhere')
  }
}

var relativeBase = 0;
function relativeMode() {
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
    commands[commands[i+3]+relativeBase] = paramOne + paramTwo
    i+=4
  } else if (opCode === 2) {
    commands[commands[i+3]+relativeBase] = paramOne * paramTwo
    i+=4
  } else if (opCode === 3) {
    // these will come with parameterCodes
    console.log('take input and store it in addresss', commands[i+1])
    commands[i+1] = value;
    // increment output
    i+=2;
  } else if (opCode === 4) {
    const output = parameterCodes[0] === 0 ? commands[commands[i+1]+relativeBase] : commands[i+1]+relativeBase
    console.log("output", output);//, i, commands[i]);
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
      commands[commands[i+3]+relativeBase] = 1;
    } else {
      commands[commands[i+3]+relativeBase] = 0;
    }
    i+=4;
  } else if (opCode === 8) {
    if(paramOne === paramTwo) {
      commands[commands[i+3]+relativeBase] = 1;
    } else {
      commands[commands[i+3]+relativeBase] = 0;
    }
    i+=4;
  } else if (opCode === 9) {
    relativeBase += commands[i+1];
    i+=2
  }
   else {
    // this is where the processing functions comes in
    console.log('Youve goofed somewhere')
  }
}

function runIntComputer(value) {
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
        commands[commands[i+1]] = value;
        i+=2;
      } else if (opCode === 4) {
        console.log("output with 4 directly", commands[commands[i+1]]);
        i+=2;
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
      } else if (opCode === 9) {
        relativeBase += pos1;
        i+=2
      }
      else {
        relativeMode()
      }
      // increases by the number in the instruction, so increase the number for the number of 
    }
  } catch (e) {
    console.log("You goofed", e)
  }
}

runIntComputer(0);

// console.log(commands)
console.log("done")