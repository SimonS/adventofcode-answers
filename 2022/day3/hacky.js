// playing catch up, so just hacked this one in dev tools again.
// nasty, but it works.

const intersection = (mySet1, mySet2) =>
  new Set([...mySet1].filter((x) => mySet2.has(x)));

const getPriority = (c) =>
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(c) + 1;

const groupBy3 = (arr) =>
  Array.from({ length: arr.length / 3 }, () => arr.splice(0, 3));

const part1 = actual
  .split("\n")
  .map((rucksack) => [
    new Set(rucksack.slice(0, rucksack.length / 2)),
    new Set(rucksack.slice(rucksack.length / 2, rucksack.length)),
  ])
  .map(([compartment1, compartment2]) =>
    intersection(compartment1, compartment2)
  )
  .reduce((acc, shared) => getPriority([...shared][0]) + acc, 0);

const part2 = groupBy3(input.split("\n"))
  .map((rucksacks) =>
    rucksacks
      .map((r) => new Set(r))
      .reduce((acc, rucksack) => (acc ? intersection(rucksack, acc) : rucksack))
  )
  .reduce((acc, r) => getPriority([...r]) + acc, 0);
