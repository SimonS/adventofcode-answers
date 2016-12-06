const fs = require('fs');

const inputFile = fs.readFileSync('input/day03.txt', 'utf8');

const horizontal = inputFile.split('\n').map(line => line
    .split(' ')
    .filter(x => x != "")
    .map(x => parseInt(x)));

const isValid = tri =>
    tri[0] < tri[1] + tri[2] &&
    tri[1] < tri[0] + tri[2] &&
    tri[2] < tri[1] + tri[0];

console.log(horizontal.filter(isValid).length);

// my god this is nasty:
let columns = [];
[0, 1, 2].forEach(x => {
    horizontal.forEach(y => {
        columns.push(y[x])
    })
})
columns = columns.filter(x => typeof x !== 'undefined'); // don't ask me where the undefineds come from

// chunk the aggregated columns
const verticals = columns.reduce((total, n) => {
    while (!total.length || total[total.length - 1].length === 3) total.push([]);

    let last = total[total.length - 1];
    last.push(n)
    return total
}, [])

console.log(verticals.filter(isValid).length);
