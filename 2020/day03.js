const fs = require("fs");

const input = fs.readFileSync("inputs/day03.txt", "utf8").split("\n");

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const traverseSlope = ([across, down]) => ({ xPos, yPos, trees }, line, idx) =>
  idx === yPos
    ? {
        xPos: (xPos + across) % line.length,
        yPos: yPos + down,
        trees: line[xPos] === "#" ? trees + 1 : trees,
      }
    : { xPos, yPos, trees };

const treesPerSlope = slopes.map(
  (direction) =>
    input.reduce(traverseSlope(direction), { xPos: 0, yPos: 0, trees: 0 }).trees
);

console.log(treesPerSlope[1]);
console.log(treesPerSlope.reduce((a, b) => a * b, 1));
