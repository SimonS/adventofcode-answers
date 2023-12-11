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

// Part 1:

Math.min(
  ...mappings.reduce(
    (seeds, mappingSection) =>
      seeds.map((seed) => mapSeed(seed, mappingSection)),
    seeds
  )
);

// Part 2:

// (naive as hell, it's no way going to work with the real data)
convertRange = (seeds) =>
  seeds.reduce((nums, seed, i) => {
    if (i % 2 !== 0) return nums;
    const len = seeds[i + 1];
    for (let i = seed; i < seed + len; i++) {
      nums.push(i);
    }
    return nums;
  }, []);

Math.min(
  ...mappings.reduce(
    (seeds, mappingSection) =>
      seeds.map((seed) => mapSeed(seed, mappingSection)),
    convertRange(seeds)
  )
);
