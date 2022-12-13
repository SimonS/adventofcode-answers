const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const getData = () =>
  input.split("\n").map((row, i) =>
    Array.from(row).map((location, j) => ({
      visited: false,
      elevation:
        location === "S"
          ? "a".charCodeAt(0)
          : location === "E"
          ? "z".charCodeAt(0)
          : location.charCodeAt(0),
      start: location === "S",
      end: location === "E",
      location: [i, j],
    }))
  );

let data = getData();

const start = data
  .flatMap((location) => location)
  .filter((location) => location.start === true)[0];

const yMax = data.length;
const xMax = data[0].length;

const getNeighbours = ([y, x], grid) =>
  [
    [y - 1, x],
    [y + 1, x],
    [y, x - 1],
    [y, x + 1],
  ]
    .filter(([y, x]) => y >= 0 && x >= 0 && y < yMax && x < xMax)
    .map(([y, x]) => grid[y][x])
    .filter(
      (cell) => !cell.visited && cell.elevation < grid[y][x].elevation + 2
    );

const search = (root) => {
  data = getData();
  let queue = [root];
  let steps = 0;

  while (queue.length > 0) {
    if (queue.filter((location) => location.end).length) {
      return steps;
    }

    queue.forEach((item) => {
      item.visited = true;
    });

    let neighbours = Array.from(
      new Set(queue.flatMap((item) => getNeighbours(item.location, data)))
    );
    queue = neighbours;

    steps += 1;
  }
  return -1;
};

const part1 = search(start);

const ground = getData()
  .flatMap((location) => location)
  .filter((location) => location.elevation === "a".charCodeAt(0));

const part2 = Math.min(...ground.map(search).filter((x) => x !== -1));

console.log(`part 1: ${part1}`);
console.log(`part 2: ${part2}`);
