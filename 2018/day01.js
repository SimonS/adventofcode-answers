const fs = require('fs');

const inputFile = fs.readFileSync('inputs/day01.txt', 'utf8');

const nums = inputFile.split('\n').map((s) => parseInt(s, 10));

const part1 = nums.reduce((a, b) => a + b, 0);

console.log(`Part 1 answer: ${part1}`);

// warning - completely non-functional solution ahoy. I'm behind and playing catch up.

let foundNumbers = new Set();
let currentFrequency = 0

let i = 0;

while (!foundNumbers.has(currentFrequency)) {
    foundNumbers.add(currentFrequency);
    currentFrequency += nums[i];

    i = i < nums.length - 1 ? i + 1 : 0
}

console.log(`Part 2 answer: ${currentFrequency}`);