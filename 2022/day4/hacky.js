// At this I don't know why I'm continuing with the charade of coming back
// later to do this all correctly. My current workflow is open dev tools ->
// get an answer -> submit -> do next day 🤷‍♂️

const containsEither = (a, b) =>
  (a.min <= b.min && a.max >= b.max) || (b.min <= a.min && b.max >= a.max);

const overlaps = (a, b) =>
  (a.min <= b.max && a.max >= b.min) || (b.min <= a.max && b.max >= a.min);

const mappedRanges = input.split("\n").map((pair) =>
  pair.split(",").map((range) => ({
    min: parseInt(range.split("-")[0], 10),
    max: parseInt(range.split("-")[1], 10),
  }))
);

const part1 = mappedRanges.filter(([x, y]) => containsEither(x, y)).length;

const part2 = mappedRanges.filter(([x, y]) => overlaps(x, y)).length;
