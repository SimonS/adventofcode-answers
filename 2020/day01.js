const fs = require("fs");

const inputFile = fs.readFileSync("inputs/day01.txt", "utf8");
const nums = inputFile.split("\n").map((s) => parseInt(s, 10));

// assumes list is unique, if it's not,
// the answer should be the square of 1010
const part1 = nums.filter((num) => new Set(nums).has(2020 - num));

console.log(part1[0] * part1[1]);

for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    for (let k = j + 1; k < nums.length; k++) {
      if (nums[i] + nums[j] + nums[k] === 2020)
        console.log(nums[i] * nums[j] * nums[k]);
    }
  }
}
