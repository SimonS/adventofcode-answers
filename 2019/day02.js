const fs = require('fs');

const inputFile = fs.readFileSync('inputs/day02.txt', 'utf8');
let nums = inputFile.split(',').map(s => parseInt(s, 10));

nums[1] = 12;
nums[2] = 2;

let i = 0;
while(i < nums.length && nums[i] !== 99) {
    let opCode = nums[i];
    
    switch (opCode) {
        case 1:
            nums[nums[i + 3]] = nums[nums[i + 1]] + nums[nums[i + 2]]
        break;
        case 2:
            nums[nums[i + 3]] = nums[nums[i + 1]] * nums[nums[i + 2]]
        break;
    }
    i += 4;
}

console.log(`Part 1 answer: ${nums[0]}`);
