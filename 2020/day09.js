const input = fs
  .readFileSync(__dirname + "/inputs/day09.txt", "utf8")
  .split("\n")
  .map((n) => parseInt(n));

const preamble = 25;

const isSumFrom = (target, previousX) =>
  previousX.some((n) => new Set(previousX).has(target - n));

const invalidNumber = input.filter((n, index) =>
  index >= preamble
    ? !isSumFrom(n, input.slice(index - preamble, index))
    : false
)[0];

console.log(invalidNumber);

const limit = input.indexOf(invalidNumber);

// It's not pretty, but it gets the job done.
let windowSize = 2,
  found,
  window;
while (!found) {
  let i = limit;
  while (i > windowSize && !found) {
    window = input.slice(i - windowSize, i--);
    if (window.reduce((a, b) => a + b) === invalidNumber) found = true;
  }
  windowSize++;
}

console.log(Math.min(...window) + Math.max(...window));
