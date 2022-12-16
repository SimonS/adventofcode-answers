let input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

const pathToCoords = (path) =>
  path
    .split(" -> ")
    .map((coord) => coord.split(",").map((coord) => parseInt(coord, 10)))
    .reduce((generated, next) => {
      if (generated.length === 0) return [next];
      const last = generated[generated.length - 1];
      if (last[0] < next[0]) {
        for (let i = last[0] + 1; i <= next[0]; i++)
          generated.push([i, last[1]]);
      }
      if (last[1] < next[1]) {
        for (let i = last[1] + 1; i <= next[1]; i++)
          generated.push([last[0], i]);
      }
      if (last[0] > next[0]) {
        for (let i = last[0] - 1; i >= next[0]; i--)
          generated.push([i, last[1]]);
      }
      if (last[1] > next[1]) {
        for (let i = last[1] - 1; i >= next[1]; i--)
          generated.push([last[0], i]);
      }
      return generated;
    }, []);

const rockLocations = input.split("\n").flatMap(pathToCoords);

const arrayEqual = (a, b) =>
  a.length == b.length &&
  a.every(function (el, index) {
    return el === b[index];
  });

const arrayHas = (arr, target) =>
  arr.filter(([y, x]) => y === target[0] && x === target[1]).length > 0;

let cave = { rock: rockLocations, sand: [] };

const addSand = ({ rock, sand, lastDropPoint }, x) => {
  const canGoThere = ([x, y]) =>
    !arrayHas(rock, [x, y]) && !arrayHas(sand, [x, y]);

  const maxDepth = Math.max(...rock.map(([_, y]) => y)) + 1;

  let xPos = lastDropPoint ? lastDropPoint[0] : x;
  let yPos = lastDropPoint ? lastDropPoint[1] : 0;

  while (yPos <= maxDepth) {
    if (canGoThere([xPos, yPos + 1])) {
      yPos += 1;
    } else if (canGoThere([xPos - 1, yPos + 1])) {
      xPos -= 1;
      yPos += 1;
    } else if (canGoThere([xPos + 1, yPos + 1])) {
      yPos += 1;
      xPos += 1;
    } else {
      break;
    }
  }
  sand.push([xPos, yPos]);

  return { rock, sand, lastDropPoint };
};

const isSandFalling = (sand, maxDepth) =>
  sand.filter(([x, y]) => y >= maxDepth).length;

const render = ({ rock, sand }) => {
  let grid = [];

  const maxDepth = Math.max(...rock.map(([_, y]) => y)) + 1;
  const minWidth = Math.min(...rock.map(([x, _]) => x)) - 1;
  const maxWidth = Math.max(...rock.map(([x, _]) => x)) + 1;

  for (let row = 0; row <= maxDepth; row++) {
    let newRow = [];
    for (let col = minWidth; col <= maxWidth; col++) {
      newRow.push(
        rock.some((coord) => arrayEqual(coord, [col, row]))
          ? "#"
          : sand.some((coord) => arrayEqual(coord, [col, row]))
          ? "o"
          : "."
      );
    }
    grid.push(newRow);
  }
  return grid.map((row) => row.join("")).join("\n");
};

const getIterations = (state) => {
  const maxDepth = Math.max(...state.rock.map(([x, y]) => y)) + 1;
  while (!isSandFalling(state.sand, maxDepth)) {
    state = addSand(state, 500);
  }
  return state.sand.length - 1;
};

const getUntilFull = (state) => {
  const maxDepth = Math.max(...state.rock.map(([x, y]) => y)) + 2;
  const newWidth = maxDepth * 2;
  const minWidth = 500 - newWidth / 2 - 1;
  const maxWidth = 500 + newWidth / 2 + 1;

  for (let i = minWidth; i <= maxWidth; i++) {
    state.rock.push([i, maxDepth]);
  }

  while (state.sand.filter(([x, y]) => x == 500 && y == 0).length === 0) {
    state = addSand(state, 500);
  }

  return state.sand.length;
};

console.log(getUntilFull({ rock: rockLocations, sand: [] })); //?
