const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/inputs/day12.txt", "utf8")
  .split("\n")
  .map((instruction) => [instruction[0], parseInt(instruction.slice(1), 10)]);

const DIRECTIONS = { N: [0, 1], E: [1, 0], S: [0, -1], W: [-1, 0] };

const rotateRight = ([x, y], degs) =>
  degs === 0 ? [x, y] : rotateRight([y, -x], degs - 90);

const rotateLeft = ([x, y], degs) =>
  degs === 0 ? [x, y] : rotateLeft([-y, x], degs - 90);

const move = ([x, y], [dx, dy], amount) => [x + amount * dx, y + amount * dy];

const final = input.reduce(
  ({ shipPos, waypointPos }, [instruction, amount]) => {
    if (instruction in DIRECTIONS)
      return {
        shipPos,
        waypointPos: move(waypointPos, DIRECTIONS[instruction], amount),
      };

    if (instruction === "F")
      return { shipPos: move(shipPos, waypointPos, amount), waypointPos };

    if (instruction === "R")
      return { shipPos, waypointPos: rotateRight(waypointPos, amount) };
    return { shipPos, waypointPos: rotateLeft(waypointPos, amount) };
  },
  {
    shipPos: [0, 0],
    waypointPos: [10, 1],
  }
);

console.log(Math.abs(final.shipPos[0]) + Math.abs(final.shipPos[1]));
