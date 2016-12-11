const fs = require('fs');

const inputFile = fs.readFileSync('input/day04.txt', 'utf8');

let sanitisedInput = inputFile.split('\n').map(s => s.split(/(\d+)/)).map(a => {
  return {name: a[0], id: parseInt(a[1]), checksum: a[2]}
});

const isRealRoom = room => {
  let checksum = Object.entries(room.name.replace(/-/g, '').split('').sort().reduce((strs, letter) => {
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

const rotate = x => x == ' ' ? x : String.fromCharCode(x.charCodeAt(0)+1 > 'z'.charCodeAt(0) ? 'a'.charCodeAt(0) : x.charCodeAt(0)+1);

// this is nasty and not very functional, but I'm sick of looking at this problem now.
const rotx = (str, x) => {
    for (i = 0; i < x; i++) {
        str = rotate(str);
    }
    return str;
}

const rotStringX = (str, x) => str.replace(/-/g, ' ').split('').map(letter => rotx(letter, x)).join('')

console.log(sanitisedInput.map(x => [rotStringX(x.name, x.id), x.id]).filter(x => x[0].indexOf('north') !== -1));