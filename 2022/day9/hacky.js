const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const move = (pos, dir) => {
  const [head, ...rest] = pos;

  switch (dir) {
    case "R":
      head.x += 1;
      break;
    case "L":
      head.x -= 1;
      break;
    case "U":
      head.y += 1;
      break;
    case "D":
      head.y -= 1;
      break;
  }

  const movedRest = rest.map((curr, i) => {
    const front = i === 0 ? head : rest[i - 1];

    const touching = (a, b) => {
      if (a.x === b.x) return Math.abs(a.y - b.y) <= 1;
      if (a.y === b.y) return Math.abs(a.x - b.x) <= 1;

      return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) <= 2;
    };

    if (!touching(front, curr)) {
      if (front.x > curr.x) curr.x += 1;
      if (front.x < curr.x) curr.x -= 1;
      if (front.y > curr.y) curr.y += 1;
      if (front.y < curr.y) curr.y -= 1;
    }

    return curr;
  });

  return [head, ...movedRest];
};

const processCommand = (state, cmd) => {
  const [dir, steps] = cmd;

  for (let i = 0; i < steps; i++) {
    state.pos = move(state.pos, dir);
    state.history.add(JSON.stringify(state.pos[state.pos.length - 1]));
  }

  return state;
};

const cmds = input
  .split("\n")
  .map((cmd) => [cmd.split(" ")[0], parseInt(cmd.split(" ")[1], 10)]);

const part1 = cmds.reduce((acc, cmd) => processCommand(acc, cmd), {
  pos: [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ],
  history: new Set(),
}).history.size;

const part2 = cmds.reduce((acc, cmd) => processCommand(acc, cmd), {
  pos: [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ],
  history: new Set(),
}).history.size;

console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);
