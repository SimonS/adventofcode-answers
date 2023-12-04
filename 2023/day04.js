cards = input
  .split("\n")
  .map((card) => card.split(": ")[1])
  .map((card) => card.split(" | "))
  .map(([winning, nums], i) => {
    const createSet = (l) =>
      new Set([...l.matchAll(/\d+/g)].map((num) => num[0]));

    // support for set.intersection is bad right now, had to use Safari to make this work
    return {
      cardNo: i + 1,
      matches: createSet(winning).intersection(createSet(nums)).size,
    };
  });

part1 = cards.reduce(
  (acc, { matches }) => (matches ? acc + Math.pow(2, matches - 1) : acc),
  0
);

getLeaves = (root, i) => {
  const leaves = root[i].matches;
  if (leaves === 0) return 1;

  let total = 1;
  for (let n = i + 1; n <= i + leaves; n++) {
    total += getLeaves(root, n);
  }
  return total;
};

// part 2
let tot = 0;
for (let i = 0; i < cards.length; i++) {
  tot += getLeaves(cards, i);
}
console.log(tot);
