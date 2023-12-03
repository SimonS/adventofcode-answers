let getNeighbours = (y, x, height, width) =>
  [
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
    [y, x - 1],
    [y, x + 1],
    [y + 1, x - 1],
    [y + 1, x],
    [y + 1, x + 1],
  ].filter(([y, x]) => y >= 0 && x >= 0 && y < height && x < width);

let adjacentToPart = (y, x, len, str) => {
  const isPart = (char) => /[^.\d]/.test(char);
  const grid = str.split("\n").map((line) => line.split(""));

  for (let i = x; i < x + len; i++) {
    if (
      getNeighbours(y, i, grid.length, grid[0].length).filter(([y, x]) =>
        isPart(grid[y][x])
      ).length
    ) {
      return true;
    }
  }
  return false;
};

input
  .split("\n")
  .map((line, i) => {
    return { nums: [...line.matchAll(/(\d+)/g)], y: i };
  })
  .filter((line) => line.nums.length)
  .map((line) =>
    line.nums
      .filter((num) => adjacentToPart(line.y, num.index, num[0].length, input))
      .map((num) => parseInt(num[0]))
      .reduce((a, b) => a + b, 0)
  )
  .reduce((a, b) => a + b, 0);
