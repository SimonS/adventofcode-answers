const input = fs
  .readFileSync(__dirname + "/inputs/day08.txt", "utf8")
  .split("\n")
  .map((instruction) => instruction.split(" "))
  .map(([_, n]) => [_, parseInt(n, 10)]);

const executeInstructions = (instructions) => {
  let i = 0;
  let found = false;
  let acc = 0;

  instructions = instructions.map((i) => [...i, false]);

  while (!found && i < instructions.length) {
    let [instruction, n, seen] = instructions[i];

    if (!seen) {
      instructions[i][2] = true;
      ({
        acc: () => {
          acc += n;
          i++;
        },
        jmp: () => {
          i += n;
        },
        nop: () => {
          i++;
        },
      }[instruction]());
    } else found = true;
  }

  return { terminated: !found, acc };
};

console.log(executeInstructions([...input]).acc);

const jumps = input.reduce(
  (jmps, [ins], idx) =>
    ins === "jmp" || ins === "nop" ? [...jmps, idx] : jmps,
  []
);

const flipInstruction = (instructions, change) =>
  [...instructions].map((i, idx) =>
    idx === change ? [i[0] === "nop" ? "jmp" : "nop", i[1]] : i
  );

let terminated = false,
  i = 0,
  executed;

while (!terminated && i <= jumps.length) {
  executed = executeInstructions(flipInstruction([...input], jumps[i++]));
  terminated = executed.terminated;
}

console.log(executed.acc);
