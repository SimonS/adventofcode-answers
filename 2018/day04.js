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

const initialiseSleepMinutes = () => {
    let sleepMinutes = {}
    for (let i = 0; i < 60; i++) {
        sleepMinutes[i] = 0;
    }
    return sleepMinutes
}

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

const getSleepMinutes = (wakeSleeps, sleepMinutes) => {
    for (let i = 0; i < wakeSleeps.length; i += 2) {
        const from = parseInt(wakeSleeps[i].line.match(/:(\d\d)/)[1], 10)
        const until = parseInt(wakeSleeps[i+1].line.match(/:(\d\d)/)[1], 10)
        for(let j = from; j < until; j++) {
            sleepMinutes[j]++;
        }
    }

    return sleepMinutes
}

const guardsAsleepTimes = shifts.reduce((guards, shift) => {
    const [shiftStart, ...wakeSleeps] = shift
    if (!(shiftStart.id in guards)) {
        guards[shiftStart.id] = {
            wakeSleeps,
            sleepTime: getTotalSleepTime(wakeSleeps),
            sleepMinutes: getSleepMinutes(wakeSleeps, initialiseSleepMinutes())
        }
    } else {
        guards[shiftStart.id].wakeSleeps = [...guards[shiftStart.id].wakeSleeps, ...wakeSleeps]
        guards[shiftStart.id].sleepTime += getTotalSleepTime(wakeSleeps)
        guards[shiftStart.id].sleepMinutes = getSleepMinutes(wakeSleeps, guards[shiftStart.id].sleepMinutes)
    }
    
    return guards
}, {});

const [sleepiestGuard] = Object.entries(guardsAsleepTimes).sort((a, b) => b[1].sleepTime - a[1].sleepTime)[0]

console.log('Part 1:')
console.log(`The sleepiest guard is #${sleepiestGuard}`);

let sleepMinutes = initialiseSleepMinutes();

const sleepiestWakeSleeps = guardsAsleepTimes[sleepiestGuard].wakeSleeps

sleepMinutes = getSleepMinutes(sleepiestWakeSleeps, sleepMinutes)

const [[sleepiestMinute]] = Object.entries(sleepMinutes).sort((a, b) => b[1] - a[1])

console.log(`Their sleepiest minute is ${sleepiestMinute}`)
console.log(`Therefore, ${sleepiestGuard} x ${sleepiestMinute} = ${sleepiestGuard*sleepiestMinute}`)

const [guardWithTheSleepiestMinute] = Object.entries(guardsAsleepTimes).map((guard) => {
    const [id, {sleepMinutes}] = guard
    return [id, Object.entries(sleepMinutes).sort((a, b) => b[1] - a[1])[0]]
}).sort((a, b) => b[1][1] - a[1][1])

const [guardId, [guardsSleepyMinute]] = guardWithTheSleepiestMinute

console.log(`Part 2:`)
console.log(`Guard ${guardId} has the sleepiest individual minute of ${guardsSleepyMinute}`)
console.log(`Therefore, ${guardId} x ${guardsSleepyMinute} = ${guardId*guardsSleepyMinute}`)
