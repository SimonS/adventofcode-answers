const md5 = require('md5');
const input = 'ffykfhsq';

let srcN = 0;
let pass = '';

const isInteresting = hash => hash.slice(0,5) === '00000';

let getNext = () => {
    while (!isInteresting(md5(input + srcN))) {
        srcN++
    }
    return md5(input + srcN).slice(5, 7)
}

while (pass.length < 8) {
    pass += getNext()[0];
    srcN++;
}

// takes 23.9 seconds. Should probably look into multithreaded node.
console.log(pass);

pass = {0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false};

while (!Object.values(pass).every(x => x !== false)) {
    const next = getNext();

    if (pass[next[0]] === false) {
        pass[next[0]] = next[1];
    }

    srcN++;
}

console.log(Object.values(pass).join(''));