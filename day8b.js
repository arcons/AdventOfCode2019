const fs = require('fs')
var contents = fs.readFileSync('./day8input.txt', 'utf8');
const singleRows = contents.match(/.{1,150}/g);
const images = singleRows.map(row => {
  return row.match(/.{1,25}/g);
})

function updatedRow(original, newRow) {
  const updateMe = []
  for(i=0; i<original.length; i++) {
    // if it's transparent leave it the same or if the previous is already black or white
    if(original[i] == 2) { // && original[i] != 1 && original[i] != 0) {
      updateMe.push(newRow[i]);
    } else {
      updateMe.push(original[i])
    }
  }
  return updateMe;
}

let minZero = Number.MAX_SAFE_INTEGER
let oneTwo = 0
let finalImage = images[0];
images.forEach(image => {
  image.forEach((row, index)=> {
    imageRow = updatedRow(finalImage[index].split(''), row.split('')).join("");
    finalImage[index] = imageRow;
    // this splits the image
  })
})
finalImage = finalImage.map(e => e.replace(/1/g, " "))
finalImage = finalImage.map(e => e.replace(/0/g, "▉"))

console.log(finalImage)