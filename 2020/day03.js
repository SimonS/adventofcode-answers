const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/inputs/day03.txt", "utf8")
  .split("\n");

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
        trees: (trees += line[xPos] === "#" ? 1 : 0),
      }
    : { xPos, yPos, trees };

const treesPerSlope = slopes.map(
  (velocity) =>
    input.reduce(traverseSlope(velocity), { xPos: 0, yPos: 0, trees: 0 }).trees
);

console.log(treesPerSlope[1]);
console.log(treesPerSlope.reduce((a, b) => a * b, 1));
