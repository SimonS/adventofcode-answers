let input = require('fs').readFileSync('inputs/day07.txt', 'utf8');

let tree = {}
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
let order = ''

const resetTree = () => {
    alphabet.forEach(letter => tree[letter] = {
        deps: new Set(),
        processed: false
    })

    input.split('\n').forEach(line => {
        [res, dependency, letter] = line.match(/Step (.*) must be finished before step (.*) can begin./)
        tree[letter].deps.add(dependency)
    })
}

const freeLetters = () => Object.entries(tree).filter(([_, {
    deps,
    processed
}]) => !processed && deps.size === 0)

const getNextFreeLetter = () => freeLetters()[0][0]

const processLetter = (letter) => {
    tree[letter].processed = true
    alphabet.forEach(ch => tree[ch].deps.delete(letter))
    order += letter
}

const finished = () => Object.values(tree).every(({
    processed
}) => processed)

resetTree()
while (!finished()) processLetter(getNextFreeLetter(tree))

console.log(`Part 1: ${order}`)

resetTree()

const getLetterTime = (ch) => ch.charCodeAt(0) - 4
let workers = []
const workerLimit = 5

const tick = () => {
    if (workers.length < workerLimit - 1) {

    }
}

// while (!finished()) {
//     tick()
// }

console.log(freeLetters())

console.log(getLetterTime('Z'))