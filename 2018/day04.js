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

        totalSleepTime += (wake - sleep)
    }

    return totalSleepTime
}

const guardsAsleepTimes = shifts.reduce((guards, shift) => {
    const [shiftStart, ...wakeSleeps] = shift
    guards[shiftStart.id] = {
        wakeSleeps,
        sleepTime: getTotalSleepTime(wakeSleeps)
    }
    return guards
}, {});

console.log(guardsAsleepTimes) //.sort((guardA, guardB) => guardB.sleepTime - guardA.sleepTime))