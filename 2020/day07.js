const input = fs.readFileSync(__dirname + "/inputs/day07.txt", "utf8");

const rules = input
  .split(".\n")
  .map((rule) => rule.split(" bags contain "))
  .filter(([_, contain]) => contain !== /no other bags\.?/)
  .reduce((acc, [bag, contain]) => {
    acc[bag] = Array.from(
      contain.matchAll(/(\d) (\w+\s\w+) bags?(?:, )?/g)
    ).map(([_, num, colour]) => [colour, num]);
    return acc;
  }, {});

const findBag = (target, bagList) =>
  bagList.filter(([colour]) => colour === target).length ||
  bagList.some(([colour]) => findBag(target, rules[colour]));

const countBagsContainingShiny = () => {
  return Object.keys(rules).filter((bag) => findBag("shiny gold", rules[bag]))
    .length;
};

const countBagsIn = (bagColour) =>
  rules[bagColour].reduce(
    (acc, [bag, count]) => acc + count * countBagsIn(bag),
    1
  );

// that `-1` is gross, but nicer than either wrapping my function or putting in conditionals
console.log(countBagsContainingShiny());
console.log(countBagsIn("shiny gold") - 1);
