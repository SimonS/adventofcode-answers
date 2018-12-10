let input = require('fs').readFileSync('inputs/day07.txt', 'utf8');

let tree = {}
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
let order = ''

const resetTree = () => {
    alphabet.forEach(letter => tree[letter] = {
        deps: new Set(),
        processed: false,
        processing: false
    })

    input.split('\n').forEach(line => {
        [res, dependency, letter] = line.match(/Step (.*) must be finished before step (.*) can begin./)
        tree[letter].deps.add(dependency)
    })
}

const freeLetters = () => Object.entries(tree).filter(([_, {
    deps,
    processed,
    processing
}]) => !processed && !processing && deps.size === 0)

const getNextFreeLetter = () => freeLetters()[0][0]

const processLetter = (letter) => {
    tree[letter].processed = true
    tree[letter].processing = false
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

let workers = []
const workerLimit = 5
let tickCount = 0;

const processWorkers = () => {
    const getLetterTime = (ch) => ch.charCodeAt(0) - 4

    while (workers.length < workerLimit && freeLetters().length) {
        const activeLetter = getNextFreeLetter();
        tree[activeLetter].processing = true
        workers.push([activeLetter, getLetterTime(activeLetter)])
    }

    workers = workers.map(([letter, workerTime]) => [letter, workerTime - 1])

    workers.forEach(([letter, count], index) => {
        if (count === 0) {
            processLetter(letter);
            workers.splice(index, 1)
        }
    })

    tickCount++
}

while (!finished()) processWorkers()

console.log(`Part 2: ${tickCount}`)