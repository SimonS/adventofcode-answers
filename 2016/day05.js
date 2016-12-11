const md5 = require('md5');
const input = 'ffykfhsq';

let srcN = 0;
let pass = '';

const isInteresting = hash => hash.slice(0,5) === '00000';

const getNext = () => {
    while (!isInteresting(md5(input + srcN))) {
        srcN++
    }
    return md5(input + srcN)[5]
}

while (pass.length < 8) {
    pass += getNext();
    srcN++;
}

// takes 23.9 seconds. Should probably look into multithreaded node.
console.log(pass);