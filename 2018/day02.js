const fs = require('fs');

const inputFile = fs.readFileSync('inputs/day02.txt', 'utf8');
const boxIDs = inputFile.split('\n');

const strToFreq = s => s.split('').reduce((freq, char) => {
    freq[char] = (freq[char] || 0) + 1
    return freq
}, {});

const frequencies = boxIDs.map(strToFreq);

const twos = frequencies.filter((freqs) => Object.values(freqs).indexOf(2) !== -1);
const threes = frequencies.filter((freqs) => Object.values(freqs).indexOf(3) !== -1);

const checksum = twos.length * threes.length;

console.log(`Part 1 answer: ${checksum}`);

const strDiff = (strA, strB) => {
    let diffCount = 0;
    let diffPlaces = []
    strA.split('').forEach((l, i) => {
        if (strB[i] !== l) {
            diffCount++;
            diffPlaces.push(i)
        }
    });
    return {
        diffCount,
        diffPlaces
    };
}

const diffedString = boxIDs.map((boxIdA) => {
    let matches = boxIDs.filter((boxIdB) => strDiff(boxIdB, boxIdA).diffCount === 1)
    if (matches.length) {
        const pos = strDiff(matches[0], boxIdA).diffPlaces[0]
        return boxIdA.slice(0, pos) + boxIdA.slice(pos + 1)
    }

}).filter(id => typeof id === 'string')[0];

console.log(`Part 2 answer: ${diffedString}`);