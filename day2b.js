const fs = require('fs')
 
const contents = fs.readFileSync('./day2input.txt', 'utf8');
// Format
// Part b
// contents = '1,1,1,4,99,5,6,0,99'
let input = contents.split(',').map(number => parseInt(number));
const originalInput = contents.split(',').map(number => parseInt(number));
// every 4 operations perform
// find an input for position 1 noun and 2 pos 2 that = 19690720 for pos 0
// Possible to brute force while input != 19690720
// use recursion with a possible dp solution
let i = 0;
let noun = 0;
let verb = 0;
try{
// brute force option
while(verb < 100) {
  noun = 0;
  while(noun < 100) {
      const input = originalInput.concat();
      input[1] = noun;
      input[2] = verb;
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
      if(input[0] === 19690720) {
        console.log("Found you")
        console.log(noun, verb)
      }
      i = 0;
      noun++;
    }
    verb++;
  }
} catch (e){
  console.log(e);
  console.log("You goofed")
}
console.log("No luck")
