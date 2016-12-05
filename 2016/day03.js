const fs = require('fs');

const inputFile = fs.readFileSync('input/day03.txt', 'utf8');

const horizontal = inputFile.split('\n').map(line => line
    .split(' ')
    .filter(x => x != "")
    .map(x => parseInt(x)));

const isValid = tri =>
    tri[0] < tri[1] + tri[2] &&
    tri[1] < tri[0] + tri[2] &&
    tri[2] < tri[1] + tri[0];

console.log(horizontal.filter(isValid).length);
