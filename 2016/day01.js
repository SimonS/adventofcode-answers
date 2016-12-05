// I'm not even sure if this still works. Just copypasted off my JS console.
// It gives an idea of the nasty way I attacked it.

const input = 'R5, R4, R2, L3, R1, R1, L4, L5, R3, L1, L1, R4, L2, R1, R4, R4, L2, L2, R4, L4, R1, R3, L3, L1, L2, R1, R5, L5, L1, L1, R3, R5, L1, R4, L5, R5, R1, L185, R4, L1, R51, R3, L2, R78, R1, L4, R188, R1, L5, R5, R2, R3, L5, R3, R4, L1, R2, R2, L4, L4, L5, R5, R4, L4, R2, L5, R2, L1, L4, R4, L4, R2, L3, L4, R2, L3, R3, R2, L2, L3, R4, R3, R1, L4, L2, L5, R4, R4, L1, R1, L5, L1, R3, R1, L2, R1, R1, R3, L4, L1, L3, R2, R4, R2, L2, R1, L5, R3, L3, R3, L1, R4, L3, L3, R4, L2, L1, L3, R2, R3, L2, L1, R4, L3, L5, L2, L4, R1, L4, L4, R3, R5, L4, L1, L1, R4, L2, R5, R1, R1, R2, R1, R5, L1, L3, L5, R2';

let directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];

function right() {
    directions.push(directions[0]);
    directions.shift();
    return directions[0]
}

function left() {
    directions.unshift(directions[3]);
    return directions.pop();
}

let locations = [];

var output = input.split(', ').reduce(function(position, instruction) {
    let d = instruction[0] === 'R' ? right() : left();
    let distance = instruction.substr(1);
    var steps = 0;
    while (steps++ < distance) {
        locations.push([position[0] + (d[0] * steps), position[1] + (d[1] * steps)]);
    }

    return [position[0] + (d[0] * distance), position[1] + (d[1] * distance)]
}, [0 ,0]).map(Math.abs).reduce((a, b) => a + b)

console.log('part 1', output);

// we use side effects everywhere for this bit.
// and I believe I derived the answer by manually looking for the first
// occurrence of a dupe. ([-137, -10] = 147)
console.log('part 2', locations.map(JSON.stringify)
    .filter((val, idx, self) => self.filter(x => x===val).length > 1));

