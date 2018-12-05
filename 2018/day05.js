let polymer = require('fs').readFileSync('inputs/day05.txt', 'utf8');

const isMixedSame = (pair) => pair[0] !== pair[1] && pair[0].toUpperCase() === pair[1].toUpperCase()

const reactPolymer = (polymer) => {
    for (let i = 0; i < polymer.length; i++) {
        const pair = polymer[i] + polymer[i + 1]

        if (pair.length === 2 && isMixedSame(pair)) {
            polymer = polymer.slice(0, i) + polymer.slice(i + 2)
            i = i - 2;
        }
    }

    return polymer
}

const reactedPolymerLength = reactPolymer(polymer).length

console.log(`Part 1: ${reactedPolymerLength}`)

const leastStableLength = "abcdefghijklmnopqrstuvwxyz"
    .split('')
    .reduce((max, letter) => Math.min(max,
        reactPolymer(polymer.replace(new RegExp(letter, 'gi'), '')).length), reactedPolymerLength);

console.log(`Part 2: ${leastStableLength}`)