const input = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

const getStarterMonkeys = (input) =>
  input.split("\n\n").reduce((monkeys, monkey) => {
    const monkeyNo = monkey.match(/Monkey (\d+):/)[1];

    const items = monkey
      .match(/Starting items: (\d*([, ]*\d*)*)/)[1]
      .split(", ")
      .map((x) => parseInt(x, 10));

    const operation = monkey.match(/Operation: new = (old .*)/)[1];
    const divisibleBy = parseInt(
      monkey.match(/Test: divisible by (\d+)/)[1],
      10
    );

    const ifTrue = monkey.match(/If true: throw to monkey (\d+)/)[1];
    const ifFalse = monkey.match(/If false: throw to monkey (\d+)/)[1];

    monkeys[monkeyNo] = {
      items,
      operation,
      divisibleBy,
      ifTrue,
      ifFalse,
      inspections: 0,
    };

    return monkeys;
  }, {});

const inspectionRound = (monkeys, worryLimiter) => {
  const performOperation = (old, operation) => eval(operation);

  const product = Object.values(monkeys)
    .map((m) => m.divisibleBy)
    .reduce((acc, div) => acc * div, 1);

  const monkeyCount = Object.entries(monkeys).length;

  for (let i = 0; i < monkeyCount; i++) {
    const monkey = monkeys[i];

    while (monkey.items.length) {
      const item = monkey.items.shift();
      let worryLevel =
        Math.floor(performOperation(item, monkey.operation) / worryLimiter) %
        product;

      const targetMonkey =
        worryLevel % monkey.divisibleBy ? monkey.ifFalse : monkey.ifTrue;

      monkeys[targetMonkey].items.push(worryLevel);
      monkey.inspections += 1;
    }
  }
  return monkeys;
};

const inspectMonkeys = (rounds, worryLimiter) => {
  let monkeys = getStarterMonkeys(input);

  for (let i = 0; i < rounds; i++) {
    monkeys = inspectionRound(monkeys, worryLimiter);
  }

  const [active1, active2] = Object.values(monkeys)
    .map((monkey) => monkey.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2);

  return active1 * active2;
};

const part1 = inspectMonkeys(20, 3);
const part2 = inspectMonkeys(10000, 1);

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
