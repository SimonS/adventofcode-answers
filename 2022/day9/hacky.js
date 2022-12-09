const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const move = (pos, dir) => {
  const [head, tail] = pos;

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

  if (
    ((head.y !== tail.y || head.x !== tail.x) &&
      Math.abs(head.x - tail.x) > 1) ||
    Math.abs(head.y - tail.y) > 1
  ) {
    if (dir === "L" || dir === "R") {
      tail.y = head.y;
    } else {
      tail.x = head.x;
    }
  }

  if (head.x - tail.x > 1) tail.x += 1;
  if (head.x - tail.x < -1) tail.x -= 1;
  if (head.y - tail.y > 1) tail.y += 1;
  if (head.y - tail.y < -1) tail.y -= 1;

  return [head, tail];
};

const part1 = input
  .split("\n")
  .map((cmd) => [cmd.split(" ")[0], parseInt(cmd.split(" ")[1], 10)])
  .reduce(
    (state, cmd) => {
      const [dir, steps] = cmd;

      for (let i = 0; i < steps; i++) {
        state.pos = move(state.pos, dir);
        state.history.add(JSON.stringify(state.pos[1]));
      }

      return state;
    },
    {
      pos: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
      history: new Set([JSON.stringify({ x: 0, y: 0 })]),
    }
  ).history.size; //?
