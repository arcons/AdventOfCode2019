const fs = require('fs')
 
var contents = fs.readFileSync('./day3input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
// const wires = contents.split(/\r?\n/);
const wires = ['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7']
const wireOne = wires[0].split(',')
const wireTwo = wires[1].split(',')

// create a set of both wiretraces
let wireOneTrace = new Set();
let wireTwoTrace = new Set();

function getCommand(input) {
  const direction = input.substring(0,1);
  const numberOfMoves = parseInt(input.substring(1));
  return {direction, numberOfMoves}
}

function getCoordinates(direction, numberOfMoves, startPosition) {
  const moveSet = new Set();
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
    lastLocation = {x: startPosition.x, y: startPosition.y};
    moveSet.add(JSON.stringify(lastLocation))
  }
  return {moveSet, lastLocation};
}
// set initial position at 0,0
let currentPosition = {x: 0, y: 0};
wireOne.forEach(element => {
  const {direction, numberOfMoves} = getCommand(element)
  const {moveSet, lastLocation} = getCoordinates(direction, numberOfMoves, currentPosition)
  currentPosition = lastLocation;
  wireOneTrace = new Set([...wireOneTrace, ...moveSet])
});

currentPosition = {x: 0, y: 0};
wireTwo.forEach(element => {
  const {direction, numberOfMoves} = getCommand(element)
  const {moveSet, lastLocation} = getCoordinates(direction, numberOfMoves, currentPosition)
  currentPosition = lastLocation;
  wireTwoTrace = new Set([...wireTwoTrace, ...moveSet])
});
let intersect = new Set([...wireOneTrace].filter(i => wireTwoTrace.has(i)));
console.log("intersection....")
let min = 10000000;
// Im lazy this can be done with math.min and after coverting with .map
intersect.forEach(element => {
  const point = JSON.parse(element);
  if(Math.abs(point.x)+Math.abs(point.y) <= min) {
    min = Math.abs(point.x)+Math.abs(point.y) 
  }
})
console.log(min);

