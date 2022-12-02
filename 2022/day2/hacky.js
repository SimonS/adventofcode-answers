// I accidentally solved this playing around with the data in devtools.
// Storing that here for posterity/a reference implementation for Rust,
// if I get around to it.
const scoringPart1 = {
  X: { value: 1, additionals: { A: 3, B: 0, C: 6 } },
  Y: { value: 2, additionals: { A: 6, B: 3, C: 0 } },
  Z: { value: 3, additionals: { A: 0, B: 6, C: 3 } },
};

const scoringPart2 = {
  X: { value: 0, additionals: { A: 3, B: 1, C: 2 } },
  Y: { value: 3, additionals: { A: 1, B: 2, C: 3 } },
  Z: { value: 6, additionals: { A: 2, B: 3, C: 1 } },
};

const applyScoring = (item, scoring) => {
  const [col1, col2] = item.split(" ");
  return scoring[col2].value + scoring[col2].additionals[col1];
};

const part1 = input
  .split("\n")
  .map((c) => applyScoring(c, scoringPart1))
  .reduce((a, b) => a + b, 0);

const part2 = input
  .split("\n")
  .map((c) => applyScoring(c, scoringPart2))
  .reduce((a, b) => a + b, 0);

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
