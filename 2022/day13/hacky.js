let input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

const parsed1 = input
  .split("\n\n")
  .map((pairs) => pairs.split("\n").map((tree) => JSON.parse(tree)));

const parsed2 = input
  .split("\n")
  .filter((line) => line !== "")
  .map((tree) => JSON.parse(tree));

const isCorrect = (left, right) => {
  left = !Array.isArray(left) ? [left] : left;
  right = !Array.isArray(right) ? [right] : right;

  let i = 0;

  const maxLength = Math.max(left.length, right.length);
  while (i < maxLength) {
    if (left[i] === undefined) return 1;
    if (right[i] === undefined) return -1;

    if (typeof left[i] === "number" && typeof right[i] === "number") {
      if (left[i] < right[i]) return 1;
      if (left[i] > right[i]) return -1;
    }

    if (Array.isArray(left[i]) || Array.isArray(right[i])) {
      const result = isCorrect(left[i], right[i]);

      if (result !== 0) {
        return result;
      }
    }

    i++;
  }
  return 0;
};

const part1 = parsed1
  .map(([left, right], i) => (isCorrect(left, right) === 1 ? i + 1 : 0))
  .reduce((acc, i) => acc + i, 0);

const sorted = [...parsed2, [[2]], [[6]]].sort((packet1, packet2) =>
  isCorrect(packet2, packet1)
);

const decoderKey = (arr) => {
  const two =
    arr.findIndex((el) => JSON.stringify(el) === JSON.stringify([[2]])) + 1;
  const six =
    arr.findIndex((el) => JSON.stringify(el) === JSON.stringify([[6]])) + 1;

  return two * six;
};

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${decoderKey(sorted)}`);
