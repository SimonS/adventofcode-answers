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
  bagList
    .map(([colour]) => colour)
    .some((colour) => findBag(target, rules[colour]));

const countBags = () => {
  return Object.keys(rules).filter((bag) => findBag("shiny gold", rules[bag]))
    .length;
};

console.log(countBags());
