const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/inputs/day11.txt", "utf8")
  .split("\n");

const DIRECTIONS = [
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
];

const getXY = (arr, x, y) =>
  x >= 0 && y >= 0 && y < arr.length && x < arr[y].length && arr[y][x];

const getAdjacentOccupiedSeats = (layout, targetRow, targetCol) =>
  DIRECTIONS.reduce(
    (total, [dirX, dirY]) =>
      total + (getXY(layout, targetCol + dirX, targetRow + dirY) === "#"),
    0
  );

const processSeats = (
  layout,
  crowding = 4,
  countFn = getAdjacentOccupiedSeats
) =>
  layout.map((row, i) =>
    row
      .split("")
      .map((seat, j) => {
        if (seat === ".") return ".";
        const adj = countFn(layout, i, j);
        if (seat === "L" && adj === 0) return "#";
        if (seat === "#" && adj >= crowding) return "L";
        return seat;
      })
      .join("")
  );

const findEquilibrium = (crowding, fn) => {
  let last = [...input];
  while (
    JSON.stringify(processSeats(last, crowding, fn)) !== JSON.stringify(last)
  ) {
    last = processSeats(last, crowding, fn);
  }
  return last
    .join("")
    .split("")
    .filter((l) => l === "#").length;
};

console.log(findEquilibrium(4, getAdjacentOccupiedSeats));

const getVisibleSeats = (layout, targetRow, targetCol) =>
  DIRECTIONS.reduce((total, direction) => {
    const [dirY, dirX] = direction;
    let y = targetRow + dirY,
      x = targetCol + dirX;
    while (getXY(layout, x, y) === ".") {
      y += dirY;
      x += dirX;
    }

    return total + (getXY(layout, x, y) === "#");
  }, 0);

console.log(findEquilibrium(5, getVisibleSeats));
