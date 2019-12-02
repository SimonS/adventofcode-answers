const fs = require('fs');

const inputFile = fs.readFileSync('inputs/day01.txt', 'utf8');
const nums = inputFile.split('\n').map(s => parseInt(s, 10));

const calculateFuel = (n) => Math.floor(n / 3) - 2

const part1 = nums.map(calculateFuel).reduce((a, b) => a + b, 0);

console.log(`Part 1 answer: ${part1}`);

const calculateAllFuels = (acc, i) => {
    const fuelCost = calculateFuel(i)
    if (fuelCost < 0) return acc
    
    return calculateAllFuels(acc + fuelCost, fuelCost)
}

const part2 = nums.map(n => calculateAllFuels(0, n)).reduce((a, b) => a + b, 0);

console.log(`Part 2 answer: ${part2}`);
