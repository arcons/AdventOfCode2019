const fs = require('fs')
 
var contents = fs.readFileSync('./day2input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
// Part b
// contents = '1,1,1,4,99,5,6,0,99'
// change the pos 1 to 12 and 2 to 2
var input = contents.split(',');
input = input.map(number => parseInt(number))
// every 4 operations perform
var sum = 0
var i = 0;
try{
  while(input[i] !== 99) {
    const opCode = input[i];
    const pos1 = input[i+1];
    const pos2 = input[i+2];
    const resultPos = input[i+3];
    i+=4;
    if(opCode === 1) {
      input[resultPos] = input[pos1] + input[pos2]
    } else if (
      opCode === 2
    ) {
      input[resultPos] = input[pos1] * input[pos2]
    }
  }
} catch {
  console.log("You goofed")
}
console.log(input);
