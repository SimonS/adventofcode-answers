const inputFile = require('fs').readFileSync('inputs/day04.txt', 'utf8');

const getType = (line) => {
    if (line.endsWith('begins shift')) {
        return 'START'
    }
    if (line.endsWith('falls asleep')) {
        return 'SLEEP'
    }
    if (line.endsWith('wakes up')) {
        return 'WAKE'
    }
}

const objectifyEntry = line => {
    const type = getType(line)
    const guardIdMatches = line.match(/Guard #(\d+)/)
    const id = guardIdMatches ? guardIdMatches[1] : null
    const time = new Date(line.match(/\[(.*)\]/)[1])

    let objectifiedEntry = {
        line,
        type,
        time
    }

    if (id) {
        objectifiedEntry.id = id;
    }

    return objectifiedEntry
}

const divideIntoShifts = (collection, entry) => {
    let subCollection = collection[collection.length - 1];

    if (entry.type === 'START') {
        subCollection = [];
        collection.push(subCollection);
    }

    subCollection.push(entry);

    return collection
}

const shifts = inputFile.split('\n')
    .map(objectifyEntry)
    .sort((lineA, lineB) => lineA.time - lineB.time)
    .reduce(divideIntoShifts, []);

const getTotalSleepTime = (wakeSleeps) => {
    let totalSleepTime = 0;

    for (let i = 0; i < wakeSleeps.length; i += 2) {
        const sleep = wakeSleeps[i].time.getMinutes()
        const wake = wakeSleeps[i + 1].time.getMinutes()

        wakeSleeps[i + 1]
        totalSleepTime += (wake - sleep)
    }

    return totalSleepTime
}

const guardsAsleepTimes = shifts.reduce((guards, shift) => {
    const [shiftStart, ...wakeSleeps] = shift
    if (!(shiftStart.id in guards)) {
        guards[shiftStart.id] = {
            wakeSleeps,
            sleepTime: getTotalSleepTime(wakeSleeps)
        }
    } else {
        guards[shiftStart.id].wakeSleeps = [...guards[shiftStart.id].wakeSleeps, ...wakeSleeps]
        guards[shiftStart.id].sleepTime += getTotalSleepTime(wakeSleeps)
    }
    
    return guards
}, {});

const [sleepiestGuard] = Object.entries(guardsAsleepTimes).sort((a, b) => b[1].sleepTime - a[1].sleepTime)[0]

console.log('Part 1:')
console.log(`The sleepiest guard is #${sleepiestGuard}`);

let sleepMinutes = {};
for (let i = 0; i < 60; i++) {
    sleepMinutes[i] = 0;
}

sleepiestWakeSleeps = guardsAsleepTimes[sleepiestGuard].wakeSleeps

for (let i = 0; i < sleepiestWakeSleeps.length; i += 2) {
    const from = parseInt(sleepiestWakeSleeps[i].line.match(/:(\d\d)/)[1], 10)
    const until = parseInt(sleepiestWakeSleeps[i+1].line.match(/:(\d\d)/)[1], 10)
    for(let j = from; j < until; j++) {
        sleepMinutes[j]++;
    }
}
const [[sleepiestMinute]] = Object.entries(sleepMinutes).sort((a, b) => b[1] - a[1])

console.log(`Their sleepiest minute is ${sleepiestMinute}`)
console.log(`Therefore, ${sleepiestGuard} x ${sleepiestMinute} = ${sleepiestGuard*sleepiestMinute}`)
