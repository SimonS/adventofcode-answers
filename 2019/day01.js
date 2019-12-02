const fs = require('fs');

const inputFile = fs.readFileSync('inputs/day01.txt', 'utf8');
const nums = inputFile.split('\n').map((s) => Math.floor(parseInt(s, 10) / 3) - 2);
const part1 = nums.reduce((a, b) => a + b, 0);

console.log(`Part 1 answer: ${part1}`);
