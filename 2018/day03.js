const fs = require('fs');

const inputFile = fs.readFileSync('inputs/day03.txt', 'utf8');

const claimSpecs = inputFile.split('\n')
    .map(s => s.split('@ '))
    .map(s => {
        const [id, dimensions] = s
        const [xy, wh] = dimensions.split(': ');
        const [x, y] = xy.split(',').map(x => parseInt(x, 10))
        const [w, h] = wh.split('x').map(x => parseInt(x, 10))
        return {
            id,
            x,
            y,
            w,
            h,
            r: x + w,
            b: y + h
        }
    });

let rect = new Array(Math.max(...claimSpecs.map(spec => spec.r)));

// NOTETOSELF: DO NOT rect.fill(Array.new(...)) - INCREMENTING THE POINTER TO
// THE SAME ROW MAKES SIMON SWEAR A LOT

for (let i = 0; i < rect.length; i++) {
    rect[i] = new Array(Math.max(...claimSpecs.map(spec => spec.b)))
}

const fillRect = (claim) => {
    for (let x = claim.x; x < (claim.x + claim.w); x++) {
        for (let y = claim.y; y < (claim.y + claim.h); y++) {
            if (rect[y][x] === undefined) {
                rect[y][x] = new Set([]);
            }

            rect[y][x].add(claim.id);
        }
    }
}

claimSpecs.forEach(fillRect);

const overSubscribed = rect.map(row => row.filter(col => col.size > 1))
const overSubscribedNums = overSubscribed.map(row => row.length)
const totalOverSubscribed = overSubscribedNums.reduce((a, b) => a + b, 0)

console.log(`part 1: ${totalOverSubscribed}`);

// I actually intended to use Set arithmatic here, but es6 Sets are so primitive, it
// was unlikely to finish running in time for AOC 2019.
const allIDs = new Set(claimSpecs.map(spec => spec.id))
overSubscribed.forEach(row => row.forEach(col => [...col].forEach(id => allIDs.delete(id))))

const uniqueID = [...allIDs][0];
console.log(`part 2: ${uniqueID}`);