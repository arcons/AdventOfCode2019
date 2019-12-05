const fs = require('fs')
 
var contents = fs.readFileSync('./day3input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const wires = contents.split(/\r?\n/);
// const wires = ['R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83'] // should be 610
// const wires = ['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'] //410
// const wires = ['R8,U5,L5,D3', 'U7,R6,D4,L4'] // 30
const wireOne = wires[0].split(',') // 'R8,U5,L5,D3'
const wireTwo = wires[1].split(',') // 'U7,R6,D4,L4'

// create a set of both wiretraces
let wireOneTrace = new Set();
let wireTwoTrace = new Set();

function getCommand(input) {
  const direction = input.substring(0,1);
  const numberOfMoves = parseInt(input.substring(1));
  return {direction, numberOfMoves}
}

function getCoordinates(direction, numberOfMoves, startPosition, set, moveCount) {
  let lastLocation = {}
  for(let i =0; i < numberOfMoves; i++){
    if(direction === 'L'){
      startPosition.x -= 1;
    } else if(direction === 'U') {
      startPosition.y += 1;
    } else if(direction === 'R') {
      startPosition.x += 1;
    } else if(direction === 'D') {
      startPosition.y -= 1;
    }
    moveCount++;
    if(startPosition.x === 444 && startPosition.y===0) {
      console.log(moveCount)
    }
    lastLocation = {x: startPosition.x, y: startPosition.y}// moveCount:moveCount};
    set.add(JSON.stringify(lastLocation))
  }
  return {moveSet:set, lastLocation, moveCount};
}
// set initial position at 0,0
let currentPosition = {x: 0, y: 0};
let numMoves = 0
wireOne.forEach(element => {
  const {direction, numberOfMoves} = getCommand(element)
  const {moveSet, lastLocation, moveCount} = getCoordinates(direction, numberOfMoves, currentPosition, wireOneTrace, numMoves)
  numMoves = moveCount;
  currentPosition = lastLocation;
  wireOneTrace = moveSet;
});

currentPosition = {x: 0, y: 0};
numMoves = 0;
wireTwo.forEach(element => {
  const {direction, numberOfMoves} = getCommand(element)
  const {moveSet, lastLocation, moveCount} = getCoordinates(direction, numberOfMoves, currentPosition, wireTwoTrace, numMoves)
  numMoves = moveCount;
  currentPosition = lastLocation;
  wireTwoTrace = moveSet;
  // wireTwoTrace = new Set([...wireTwoTrace, ...moveSet])
});
let intersect = new Set([...wireTwoTrace].filter(i => wireOneTrace.has(i)));
// for partB

let wireOneArray = [...wireOneTrace];
let wireTwoArray = [...wireTwoTrace];
let minSumToPoint = 10000000000;
intersect.forEach(element => {
  // add two for the start
  const steps = wireOneArray.indexOf(element) + wireTwoArray.indexOf(element) + 2; 
  if(minSumToPoint > steps) {
    console.log('new minimum')
    minSumToPoint = steps;
    // the last one is the close between two points plug it into the if for the counter, in case there were previous matches that didn't get added to the set
    console.log(element)
    // console.log('index 1', wireOneArray.indexOf(element))
    // console.log('index 2', wireTwoArray.indexOf(element))
  }
})
//22999 too high
//19228 too low
console.log(minSumToPoint);
