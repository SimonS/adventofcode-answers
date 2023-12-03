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
    const neighbours = getNeighbours(y, i, grid.length, grid[0].length).filter(
      ([y, x]) => isPart(grid[y][x])
    );
    if (neighbours.length) {
      return neighbours;
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

let getAdjacentParts = (y, x, len, str) => {
  const isPart = (char) => /[^.\d]/.test(char);
  const grid = str.split("\n").map((line) => line.split(""));

  // registered parts and their neighbours
  let parts = {};
  for (let i = x; i < x + len; i++) {
    const neighbourParts = getNeighbours(
      y,
      i,
      grid.length,
      grid[0].length
    ).filter(([y, x]) => isPart(grid[y][x]));
    if (neighbourParts.length) {
      neighbourParts.forEach(([v, h]) => {
        parts[`${v},${h}`] = [y, x];
      });
    }
  }
  return parts;
};

const parts = input
  .split("\n")
  .map((line, i) => {
    return { nums: [...line.matchAll(/(\d+)/g)], y: i };
  })
  .filter((line) => line.nums.length)
  .map((line) =>
    line.nums
      .filter((num) => adjacentToPart(line.y, num.index, num[0].length, input))
      .reduce((totalParts, num) => {
        const adjParts = getAdjacentParts(
          line.y,
          num.index,
          num[0].length,
          input
        );
        Object.keys(adjParts).forEach((part) => {
          if (part in totalParts)
            totalParts[part].push({
              coord: `${line.y}, ${num.index}`,
              val: num[0],
            });
          else
            totalParts[part] = [
              { coord: `${line.y}, ${num.index}`, val: num[0] },
            ];
        });
        return totalParts;
      }, {})
  )
  .reduce((totalParts, part) => {
    Object.entries(part).forEach(([k, v]) => {
      if (!(k in totalParts)) {
        totalParts[k] = [];
      }

      for (num of v) {
        totalParts[k].push(num.val);
      }
    });
    return totalParts;
  }, {});

Object.values(parts)
  .filter((part) => part.length == 2)
  .map(([a, b]) => a * b)
  .reduce((a, b) => a + b);
