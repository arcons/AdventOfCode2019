var someObject = require('./day11player2019.json')
const _  = require('lodash');
let total = 0;

Object.keys(someObject.members).map(element => {
  total += someObject.members[element].stars;
});

console.log(total);