const fs = require('fs');

const inputFile = fs.readFileSync('inputs/day02.txt', 'utf8');
let nums = inputFile.split(',').map(s => parseInt(s, 10));

const processIntCode = (intCode, noun = 12, verb = 2) => {
    let i = 0;

    intCode[1] = noun;
    intCode[2] = verb;

    while(i < intCode.length && intCode[i] !== 99) {
        let opCode = intCode[i];
        
        switch (opCode) {
            case 1:
                intCode[intCode[i + 3]] = intCode[intCode[i + 1]] + intCode[intCode[i + 2]]
            break;
            case 2:
                intCode[intCode[i + 3]] = intCode[intCode[i + 1]] * intCode[intCode[i + 2]]
            break;
        }
        i += 4;
    }

    return intCode[0];
}

console.log(`Part 1 answer: ${processIntCode([...nums])}`);

const target = 19690720;
let actual = 0;

let x = 0;
let y;

while (actual !== target && x < 100) {
    y = 0;
    x++;
    
    while (actual !== target && y < 100) {
        y++;
        actual = processIntCode([...nums], x, y)
    }
}

console.log(`Part 2 answer: ${100*x+y}`);
