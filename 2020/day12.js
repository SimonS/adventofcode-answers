const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/inputs/day12.txt", "utf8")
  .split("\n")
  .map((instruction) => [instruction[0], parseInt(instruction.slice(1), 10)]);

const DIRECTIONS = { N: [0, 1], E: [1, 0], S: [0, -1], W: [-1, 0] };

const rotate = (direction, degs) => {
  const dirs = ["N", "E", "S", "W"];
  const current = dirs.indexOf(direction);
  const newDir = current + degs / 90;

  return dirs[newDir > 3 ? newDir - 4 : newDir < 0 ? 4 - -newDir : newDir];
};

const move = ([x, y], [dx, dy], amount) => [x + amount * dx, y + amount * dy];

const final = input.reduce(
  ({ pos, dir }, [instruction, amount]) => {
    if (instruction in DIRECTIONS)
      return { pos: move(pos, DIRECTIONS[instruction], amount), dir };

    if (instruction === "F")
      return { pos: move(pos, DIRECTIONS[dir], amount), dir };

    if (instruction === "R") return { pos, dir: rotate(dir, amount) };
    return { pos, dir: rotate(dir, -amount) };
  },
  {
    pos: [0, 0],
    dir: "E",
  }
);

console.log(Math.abs(final.pos[0]) + Math.abs(final.pos[1]));
