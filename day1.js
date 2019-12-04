const fs = require('fs')
 
var contents = fs.readFileSync('./day1input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
// Part b
const input = contents.split(/\r?\n/);
var sum = 0
input.forEach(line => {
  var add = Math.floor(line/3) - 2;
  while(add >= 0) {
    sum += add
    add = Math.floor(add/3) - 2;
  }
})
console.log(sum)