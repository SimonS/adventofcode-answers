let polymer = require('fs').readFileSync('inputs/day05.txt', 'utf8');

const isMixedSame = (first, second) => first !== second && first.toUpperCase() === second.toUpperCase()

const reactPolymer = (polymer) => {
    for (let i = 0; i < polymer.length; i++) {
        if (polymer[i] && polymer[i + 1] && isMixedSame(polymer[i], polymer[i + 1])) {
            polymer = polymer.slice(0, i) + polymer.slice(i + 2)
            i -= 2;
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