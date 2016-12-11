const fs = require('fs');

const inputFile = fs.readFileSync('input/day04.txt', 'utf8');

let sanitisedInput = inputFile.split('\n').map(s => s.split(/(\d+)/)).map(a => {
  return {name: a[0].replace(/-/g, ''), id: parseInt(a[1]), checksum: a[2]}
});

isRealRoom = room => {
  let checksum = Object.entries(room.name.split('').sort().reduce((strs, letter) => {
    // get letter counts
    strs[letter] ? strs[letter]++ : strs[letter] = 1;
    return strs
  }, {})).sort((x, y) => {
    if (x[1] != y[1]) {
      return y[1] - x[1];
    }
    return y[0] < x[0] ? 1 : -1;
  }).slice(0,5).map(x => x[0]).join('')

  return `[${checksum}]` === room.checksum;
}

// sum real rooms
console.log(sanitisedInput.filter(isRealRoom).reduce((total, x) => total + x.id, 0));
