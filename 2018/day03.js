const fs = require('fs');

const inputFile = fs.readFileSync('inputs/day03.txt', 'utf8');

const claimSpecs = inputFile.split('\n')
    .map(s => s.split('@ ')[1])
    .map(s => {
        const [xy, wh] = s.split(': ');
        const [x, y] = xy.split(',').map(x => parseInt(x, 10))
        const [w, h] = wh.split('x').map(x => parseInt(x, 10))
        return {
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

rect.forEach(row => row.fill(0))

const fillRect = (claim) => {
    for (let x = claim.x; x < (claim.x + claim.w); x++) {
        for (let y = claim.y; y < (claim.y + claim.h); y++) {
            rect[y][x]++;
        }
    }
}

claimSpecs.forEach(fillRect)

console.log(rect.map(row => row.filter(col => col > 1).length).reduce((a, b) => a + b, 0))