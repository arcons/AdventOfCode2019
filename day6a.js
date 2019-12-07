const fs = require('fs')
 
var contents = fs.readFileSync('./day6input.txt', 'utf8');
// write function to grab all attendees
// example parse
// function mode
const value = 1;
const input = contents.split(/\r?\n/);
// create a tree and traverse the tree and count to find the total number of inputs
let orbits = new Map();
input.forEach(element => {
  const planets = element.split(')') // this contains the two orbits, 1 orbits around 0
  // if planets 1 already exists add it to the child list of orbits otherwise push it to the map
  if(orbits.has(planets[1])){
    orbits.get(planets[1]).push(planets[0]);
  } else {
    orbits.set(planets[1], [planets[0]])
  }
});

let totalOrbits = 0;
// recursively loop through and get all of the parents
function getIndirectOrbits(indirectOrbits, indirectCounter) {
  //create a stack for the
  if(Array.isArray(indirectOrbits)) {
    indirectOrbits.map(direct => {
      if(orbits.has(direct)) {
        return indirectCounter+= getIndirectOrbits(direct, indirectCounter);
      }
    });
  }
  // if it's not an array then it's a key and find the number of indirect orbits for that key
  else if(orbits.has(indirectOrbits)) {
    return indirectCounter += getIndirectOrbits(orbits.get(indirectOrbits), indirectCounter);
  }
  return indirectCounter+=1;
}

let directOrbitsCounter = 0;
let indirectOrbitCounter = 0;
function mapLoop(value, key, map) {
  const directOrbits = value
  directOrbitsCounter += value.length;
  // console.log(`This planet ${key} has direct orbits`,value.length)
  directOrbits.forEach(element => {
    if(orbits.has(element)) {
      const ind = getIndirectOrbits(orbits.get(element), 0);
      // console.log(`This planet ${key} has indirect orbits`, ind)
      indirectOrbitCounter += ind;
    }
  });
  // console.log(`This planet ${key} has total orbits`, directOrbitsCounter+indirectOrbitCounter);
}

orbits.forEach(mapLoop);
console.log(directOrbitsCounter+indirectOrbitCounter)

