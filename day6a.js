const fs = require('fs')
 
var contents = fs.readFileSync('./day6xinput.txt', 'utf8');
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
    orbits[planets[1]].push(planets[0]);
  } else {
    orbits.set(planets[1], [planets[0]])
  }
});
console.log(orbits);
