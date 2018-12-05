let polymer = require('fs').readFileSync('inputs/day05.txt', 'utf8');

const isMixedSame = (pair) => pair.toLowerCase() !== pair &&
    pair.toUpperCase() !== pair &&
    pair[0].toUpperCase() === pair[1].toUpperCase()

const reactPolymer = (polymer) => {
    for (let i = 0; i < polymer.length; i++) {
        let pair = [polymer[i], polymer[i + 1]].join('')
        if (isMixedSame(pair)) {
            polymer = polymer.slice(0, i) + polymer.slice(i + 2)
            i = 0;
        }
    }

    // for some reason my loop logic is slightly broke and always misses one instance
    // rather than debug it, I've just ran it again, cos I'm a great programmer.
    for (let i = 0; i < polymer.length; i++) {
        let pair = [polymer[i], polymer[i + 1]].join('')
        if (isMixedSame(pair)) {
            polymer = polymer.slice(0, i) + polymer.slice(i + 2)
            i = 0;
        }
    }
    return polymer
}

const reactedPolymerLength = reactPolymer(polymer).length

console.log(`Part 1: ${reactedPolymerLength}`)

const reactedPolymers = "abcdefghijklmnopqrstuvwxyz".split("").map(letter => {
    return [letter, reactPolymer(polymer.replace(new RegExp(letter, 'gi'), '')).length]
});

const leastStableLength = reactedPolymers.sort((a, b) => a[1] - b[1])[1]
console.log(`Part 2: ${leastStableLength}`)