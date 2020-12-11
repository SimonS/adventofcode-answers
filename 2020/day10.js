const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/inputs/day10.txt", "utf8")
  .split("\n")
  .map((n) => parseInt(n));

const res = input
  .sort((a, b) => a - b)
  .reduce(
    (acc, n) =>
      n - acc.lastNumber === 3
        ? { ...acc, threes: acc.threes + 1, lastNumber: n }
        : { ...acc, ones: acc.ones + 1, lastNumber: n },
    {
      ones: 0,
      threes: 1,
      lastNumber: 0,
    }
  );

console.log(res.ones * res.threes);

const maxAdapterLine = input.sort((a, b) => a - b);
const allPaths = [0, ...maxAdapterLine, maxAdapterLine.slice(-1)[0] + 3].map(
  (loc, i, arr) => ({
    num: loc,
    candidates: arr.slice(i + 1, i + 4).filter((n) => n <= loc + 3),
  })
);
console.log(allPaths);

const getNumChildPaths = (n) => {
  if (this[n]) return this[n];

  const path = allPaths.find((path) => path.num == n);
  if (path.candidates.length === 0) return 1;

  this[n] = path.candidates.reduce((acc, n) => acc + getNumChildPaths(n), 0);
  return this[n];
};

console.log(getNumChildPaths(0));
