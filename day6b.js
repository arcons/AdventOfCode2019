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

// for part b find the min transfers to have the same parent
// create a set of YOU parents and SAN parents and find their intersection the last intersection will be their direct connection
// find the number of direct and indirect orbits between the parent, then sum the two - 1 for the min transfers
// modify the recursive function to get all the parents and push them to an array
function getIndirectOrbitPlanets(indirectOrbits, parentOrbits) {
  if(Array.isArray(indirectOrbits)) {
    indirectOrbits.map(direct => {
      if(orbits.has(direct)) {
        parentOrbits.add(getIndirectOrbitPlanets(direct, parentOrbits))
      }
    });
  }
  // if it's not an array then it's a key and find the number of indirect orbits for that key
  else if(orbits.has(indirectOrbits)) {
    parentOrbits.add(getIndirectOrbitPlanets(orbits.get(indirectOrbits), parentOrbits))
  }
  // last and only position otherwise add the actual word. it doesn't matter since it won't add duplicates to the set
  if(Array.isArray(indirectOrbits))
    return indirectOrbits[0];
  return indirectOrbits;
}

const youOrbits = new Set();
const sanOrbits = new Set();
orbits.get('YOU').forEach(directOrbit => {
  if(orbits.has(directOrbit)) {
    youOrbits.add(getIndirectOrbitPlanets(orbits.get(directOrbit), youOrbits))
  }
  youOrbits.add(directOrbit);
})
console.log('You', youOrbits)
orbits.get('SAN').forEach(directOrbit => {
  if(orbits.has(directOrbit)) {
    sanOrbits.add(getIndirectOrbitPlanets(orbits.get(directOrbit), sanOrbits))
  }
  sanOrbits.add(directOrbit);
})
console.log("Santa", sanOrbits)
// too low 280
// combine the two sets with exclusive or, there is definitely a better way
let intersect = new Set([...youOrbits].filter(i => !sanOrbits.has(i)));
let intersect2 = new Set([...sanOrbits].filter(i => !youOrbits.has(i)));
let combined = new Set([...intersect, ...intersect2])
console.log(combined)
console.log(combined.size)


