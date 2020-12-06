const groups = fs
  .readFileSync(__dirname + "/inputs/day06.txt", "utf8")
  .split("\n\n");

const uniqueAnswers = groups
  .map((s) => s.split("").filter((ch) => ch !== "\n"))
  .map((group) => new Set(group).size);
console.log(uniqueAnswers.reduce((a, b) => a + b));

const sharedAnswers = groups.map(
  (group) =>
    group.split("\n").reduce((shared, current) =>
      shared
        .split("")
        .filter((ch) => current.indexOf(ch) > -1)
        .join("")
    ).length
);
console.log(sharedAnswers.reduce((a, b) => a + b));
