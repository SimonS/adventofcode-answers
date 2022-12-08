const input = `30373
25512
65332
33549
35390`;

const grid = input
  .split("\n")
  .map((row) => Array.from(row).map((col) => parseInt(col, 10)));

const directions = [
  (y, x) =>
    grid
      .slice(0, y)
      .map((y) => y[x])
      .reverse(),
  (y, x) => grid.slice(y + 1).map((y) => y[x]),
  (y, x) => grid[y].slice(x + 1),
  (y, x) => grid[y].slice(0, x).reverse(),
];

const isClear = (line, target) => line.filter((i) => i >= target).length === 0;

const isVisible = (row, col) =>
  directions.filter((dir) => isClear(dir(row, col), grid[row][col])).length > 0;

const checkSightLine = (sightLine, target) => {
  let i = 0;
  while (i < sightLine.length && target > sightLine[i]) i++;

  return sightLine.slice(0, i + 1).length;
};

const getScenicScore = (y, x) =>
  directions
    .map((direction) => checkSightLine(direction(y, x), grid[y][x]))
    .reduce((total, direction) => total * direction, 1);

const part1 = grid.flatMap((row, y) =>
  row.filter((_, x) => isVisible(y, x))
).length;
console.log(part1);

const part2 = Math.max(
  ...grid.flatMap((row, y) => row.map((_, x) => getScenicScore(y, x)))
);
console.log(part2);
