const fs = require('fs')
 
var contents = fs.readFileSync('./day5input.txt', 'utf8');
const value = 1;
// test
// const contents = '3,0,4,0,99'
var commands = contents.split(',');
commands = commands.map(number => parseInt(number))
// every 4 operations perform
var sum = 0
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
    // console.log('Adding two values', paramOne, paramTwo)
    commands[commands[i+3]] = paramOne + paramTwo
    i+=4
  } else if (opCode === 2) {
    commands[commands[i+3]] = paramOne * paramTwo
    // console.log('Multiplying', paramOne, paramTwo)
    i+=4
  } else if (opCode === 3) {
    // these will come with parameterCodes
    console.log('take input and store it in addresss', commands[i+1])
    commands[i+1] = value;
    // increment output
    i+=2;
  } else if (opCode === 4) {
    const output = parameterCodes[0] === 0 ? commands[commands[i+1]] : commands[i+1]
    console.log("output with immediate", output, i, commands[i]);
    i+=2;
  } else {
    // this is where the processing functions comes in
    console.log('Youve goofed somewhere')
  }
}

try{
  while(commands[i] !== 99) {
    // current operation is opcode
    const opCode = commands[i];
    if(opCode === 1) {
      const pos1 = commands[i+1];
      const pos2 = commands[i+2];
      const resultPos = commands[i+3];
      commands[resultPos] = commands[pos1] + commands[pos2]
      i+=4
    } else if (
      opCode === 2
    ) {
      const pos1 = commands[i+1];
      const pos2 = commands[i+2];
      const resultPos = commands[i+3];
      commands[resultPos] = commands[pos1] * commands[pos2]
      i+=4
    } else if (
      opCode === 3
    ) {
      console.log('take 1 and store it in addresss', commands[i+1])
      commands[commands[i+1]] = value;
      // increment output
      i+=2;
    } else if (
      opCode === 4
    ) {
      console.log("output with 4 directly", commands[commands[i+1]]);
      i+=2;
    } else {
      // this is where the processing functions comes in
      // console.log('Youve got a longer param function')
      parameterMode()
    }
    // increases by the number in the instruction, so increase the number for the number of 
  }
} catch (e) {
  console.log("You goofed", e)
}
// console.log(commands)
console.log("done")