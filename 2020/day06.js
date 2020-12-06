const groups = fs
  .readFileSync(__dirname + "/inputs/day06.txt", "utf8")
  .split("\n\n")
  .map((s) => s.split("").filter((ch) => ch !== "\n"));

console.log(groups.map((group) => new Set(group).size).reduce((a, b) => a + b));
