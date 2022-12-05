const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const [setup, instructions] = input.split("\n\n");

const getBuckets = (i) => {
  const stacks = (i.split("\n")[0].length + 1) / 4;
  const buckets = new Array(stacks).fill().map((_) => []);

  const processLine = (line) => {
    for (let i = 0; i < (line.length + 1) / 4; i++) {
      const char = line[i * 4 + 1].trim();
      if (char.length) buckets[i].push(char);
    }
  };

  i.split("\n").forEach(processLine);

  buckets.map((stack) => stack.reverse());
  return buckets;
};

let buckets = getBuckets(setup.split("\n 1")[0]);

const processInstruction = (line) => {
  const groups = line.match(
    /move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/
  ).groups;

  for (let i = 0; i < groups.count; i++) {
    let item = buckets[groups.from - 1].pop();
    buckets[groups.to - 1].push(item);
  }
};
instructions.split("\n").forEach(processInstruction);
const part1 = buckets.map((bucket) => bucket.pop()).join("");

buckets = getBuckets(setup.split("\n 1")[0]);

const processInstructionPart2 = (line) => {
  const groups = line.match(
    /move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/
  ).groups;

  const fromBucket = buckets[groups.from - 1];
  const toBucket = buckets[groups.to - 1];
  const moving = fromBucket.splice(
    fromBucket.length - groups.count,
    groups.count
  );
  toBucket.splice(toBucket.length, 0, ...moving);
};

instructions.split("\n").forEach(processInstructionPart2);
const part2 = buckets.map((bucket) => bucket.pop()).join("");

console.log(part1);
console.log(part2);
