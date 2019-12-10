const fs = require('fs')
var contents = fs.readFileSync('./day8input.txt', 'utf8');
const singleRows = contents.match(/.{1,150}/g);
const images = singleRows.map(row => {
  return row.match(/.{1,25}/g);
})
// console.log(images);
console.log(singleRows)
function getPixelCounts(input) {
  const counterMap = new Map();
  input.forEach(element => {
  if(counterMap.has(element)){
    counterMap.get(element).counter++;
  } else {
    counterMap.set(element, {counter: 1});
  }
  });
  return {numZeros: counterMap.get('0').counter, oneByTwo: counterMap.get('1').counter * counterMap.get('2').counter}
}

let minZero = Number.MAX_SAFE_INTEGER
let oneTwo = 0
singleRows.forEach(image => {
  const result = getPixelCounts(image.split(''));
  if(result.numZeros <= minZero) {
    minZero = result.numZeros;
    oneTwo = result.oneByTwo;
    console.log(result)
  }
})
console.log(oneTwo);