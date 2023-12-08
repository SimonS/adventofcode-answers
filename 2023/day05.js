// Part 1:

sections = input.split("\n\n");
seeds = sections[0]
  .split(" ")
  .slice(1)
  .map((seed) => parseInt(seed, 10));

mappings = sections.slice(1).map((section) =>
  section
    .split("\n")
    .slice(1)
    .map((line) => line.split(" ").map((n) => parseInt(n, 10)))
);

mapSeed = (seed, mappings) => {
  for (mapping of mappings) {
    const [destination, source, len] = mapping;
    if (seed >= source && seed <= source + len) {
      return destination + seed - source;
    }
  }
  return seed;
};

Math.min(
  ...mappings.reduce(
    (seeds, mappingSection) =>
      seeds.map((seed) => mapSeed(seed, mappingSection)),
    seeds
  )
);
