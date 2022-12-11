const input = `Monkey 0:
  Starting items: 78, 53, 89, 51, 52, 59, 58, 85
  Operation: new = old * 3
  Test: divisible by 5
    If true: throw to monkey 2
    If false: throw to monkey 7

Monkey 1:
  Starting items: 64
  Operation: new = old + 7
  Test: divisible by 2
    If true: throw to monkey 3
    If false: throw to monkey 6

Monkey 2:
  Starting items: 71, 93, 65, 82
  Operation: new = old + 5
  Test: divisible by 13
    If true: throw to monkey 5
    If false: throw to monkey 4

Monkey 3:
  Starting items: 67, 73, 95, 75, 56, 74
  Operation: new = old + 8
  Test: divisible by 19
    If true: throw to monkey 6
    If false: throw to monkey 0

Monkey 4:
  Starting items: 85, 91, 90
  Operation: new = old + 4
  Test: divisible by 11
    If true: throw to monkey 3
    If false: throw to monkey 1

Monkey 5:
  Starting items: 67, 96, 69, 55, 70, 83, 62
  Operation: new = old * 2
  Test: divisible by 3
    If true: throw to monkey 4
    If false: throw to monkey 1

Monkey 6:
  Starting items: 53, 86, 98, 70, 64
  Operation: new = old + 6
  Test: divisible by 7
    If true: throw to monkey 7
    If false: throw to monkey 0

Monkey 7:
  Starting items: 88, 64
  Operation: new = old * old
  Test: divisible by 17
    If true: throw to monkey 2
    If false: throw to monkey 5`;

let monkeys = input.split("\n\n").reduce((monkeys, monkey) => {
  const monkeyNo = monkey.match(/Monkey (\d+):/)[1];

  const items = monkey
    .match(/Starting items: (\d*([, ]*\d*)*)/)[1]
    .split(", ")
    .map((x) => parseInt(x, 10));

  const operation = monkey.match(/Operation: new = (old .*)/)[1];
  const divisibleBy = parseInt(monkey.match(/Test: divisible by (\d+)/)[1], 10);

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

const performOperation = (old, operation) => eval(operation);

const inspectionRound = (monkeys) => {
  const monkeyCount = Object.entries(monkeys).length;

  for (let i = 0; i < monkeyCount; i++) {
    const monkey = monkeys[i];

    while (monkey.items.length) {
      const item = monkey.items.shift();
      const worryLevel = Math.floor(
        performOperation(item, monkey.operation) / 3
      );
      const targetMonkey =
        worryLevel % monkey.divisibleBy ? monkey.ifFalse : monkey.ifTrue;

      monkeys[targetMonkey].items.push(worryLevel);
      monkey.inspections += 1;
    }
  }
  return monkeys;
};

for (let i = 0; i < 20; i++) {
  monkeys = inspectionRound(monkeys);
}

const [active1, active2] = Object.values(monkeys)
  .map((monkey) => monkey.inspections)
  .sort((a, b) => b - a)
  .slice(0, 2);

const part1 = active1 * active2;

console.log(`Part 1: ${part1}`);
