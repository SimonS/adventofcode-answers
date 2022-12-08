const input = `30373
25512
65332
33549
35390`;

const grid = input
  .split("\n")
  .map((row) => Array.from(row).map((col) => parseInt(col, 10)));

const north = (grid, row, col) =>
  grid
    .slice(0, row)
    .map((row) => row[col])
    .reverse();
const south = (grid, row, col) => grid.slice(row + 1).map((row) => row[col]);
const east = (grid, row, col) => grid[row].slice(col + 1);
const west = (grid, row, col) => grid[row].slice(0, col).reverse();

const isClear = (line, target) => line.filter((i) => i >= target).length === 0;

const isVisible = (grid, row, col) =>
  [north, south, east, west].filter((direction) =>
    isClear(direction(grid, row, col), grid[row][col])
  ).length > 0;

const checkSightLine = (sightLine, target) => {
  let i = 0;
  while (i < sightLine.length && target > sightLine[i]) i++;

  return sightLine.slice(0, i + 1).length;
};

const getScenicScore = (grid, row, col) =>
  [north, south, east, west]
    .map((direction) =>
      checkSightLine(direction(grid, row, col), grid[row][col])
    )
    .reduce((total, direction) => total * direction, 1);

const part1 = grid.flatMap((row, y) =>
  row.filter((_, x) => isVisible(grid, y, x))
).length; //?

console.log(part1);
const part2 = Math.max(
  ...grid.flatMap((row, y) => row.map((col, x) => getScenicScore(grid, y, x)))
);

console.log(part2);
