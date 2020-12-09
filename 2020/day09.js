// const input = fs
//   .readFileSync(__dirname + "/inputs/day09.txt", "utf8")
const input = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`
  .split("\n")
  .map((n) => parseInt(n));

const preamble = 5;

const isSumFrom = (target, previousX) =>
  previousX.some((n) => new Set(previousX).has(target - n));

const invalidNumber = input.filter((n, index) =>
  index >= preamble
    ? !isSumFrom(n, input.slice(index - preamble, index))
    : false
)[0];

console.log(invalidNumber);

// start of part 2
console.log(input.filter((n) => n < invalidNumber));
