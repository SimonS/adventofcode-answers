const fs = require('fs');

const inputFile = fs.readFileSync('inputs/day01.txt', 'utf8');

const part1 = inputFile.split('\n').map((s) => parseInt(s, 10)).reduce((a, b) => a + b, 0);

console.log(part1);