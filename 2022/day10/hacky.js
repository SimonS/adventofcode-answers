const input = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

const parsed = input
  .split("\n")
  .map((line) =>
    line.split(" ").map((part, i) => (i == 1 ? parseInt(part, 10) : part))
  );

const getSignalStrength = (instructions) => {
  let cycle = 0;
  let x = 1;
  let i = 0;
  let signalStrength = 0;

  const getTargetCycle = (cycle) =>
    cycle % 20 === 0 && cycle % 40 !== 0 ? cycle : 0;

  while (i < instructions.length) {
    const [instruction, val] = instructions[i];
    if (instruction === "noop") {
      cycle += 1;
      signalStrength += getTargetCycle(cycle) * x;
    } else {
      cycle += 1;
      signalStrength += getTargetCycle(cycle) * x;
      cycle += 1;
      signalStrength += getTargetCycle(cycle) * x;
      x += val;
    }
    i++;
  }
  return signalStrength;
};

const getOutput = (parsed) => {
  let cycle = 0;
  let x = 1;
  let i = 0;
  let rendered = "";

  const drawAndAdvance = (rendered, cycle, x) => {
    const col = cycle % 40;
    rendered += col === x || col === x - 1 || col === x + 1 ? "#" : ".";
    cycle += 1;
    return [rendered, cycle];
  };

  while (i < parsed.length) {
    const [instruction, val] = parsed[i];

    if (instruction === "noop") {
      [rendered, cycle] = drawAndAdvance(rendered, cycle, x);
    } else {
      [rendered, cycle] = drawAndAdvance(rendered, cycle, x);
      [rendered, cycle] = drawAndAdvance(rendered, cycle, x);
      x += val;
    }
    i++;
  }

  return rendered.match(/.{1,40}/g).join("\n");
};

console.log(`Part 1: ${getSignalStrength(parsed)}`);
console.log(`Part 2: ${getOutput(parsed)}`);
