const fs = require('fs');

const inputFile = fs.readFileSync('inputs/day02.txt', 'utf8');

const strToFreq = s => s.split('').reduce((freq, char) => {
    freq[char] = (freq[char] || 0) + 1
    return freq
}, {});

const frequencies = inputFile.split('\n').map(strToFreq);

const twos = frequencies.filter((freqs) => Object.values(freqs).indexOf(2) !== -1);
const threes = frequencies.filter((freqs) => Object.values(freqs).indexOf(3) !== -1);

const checksum = twos.length * threes.length;

console.log(`Part 1 answer: ${checksum}`);