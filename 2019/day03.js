const fs = require("fs");
const inputFile = fs.readFileSync("inputs/day03.txt", "utf8");

const [wire1, wire2] = inputFile.split("\n");

const getPath = wire => {
  const instructions = wire.split(",").map(instruction => ({
    direction: instruction[0],
    distance: parseInt(instruction.slice(1))
  }));

  let position = { x: 0, y: 0 };
  let positions = [];
  
  let distance = 0;
  instructions.forEach(instruction => {
    for (let i = 0; i < instruction.distance; i++) {
      switch (instruction.direction) {
        case "U":
          position.y += 1;
          break;
        case "D":
          position.y -= 1;
          break;
        case "L":
          position.x -= 1;
          break;
        case "R":
          position.x += 1;
          break;
      }
      distance++;
      positions.push({...position, distance});
    }
  });
  return positions;
};

let wire1Paths = getPath(wire1);
let wire2Paths = getPath(wire2);

const comparePositions = (a, b) => a.x === b.x && a.y === b.y

let intersections = [];
for (let i = 0; i < wire1Paths.length; i++) {
    let j = 0;
    while (j < wire2Paths.length) {
        if (comparePositions(wire1Paths[i], wire2Paths[j])) {
            intersections.push({
              ...wire2Paths[j],
              distance: wire2Paths[j].distance + wire2Paths[i].distance
            });
            break;
        }
        j++;
    }

}

const closestToOrigin = Math.min(
  ...intersections
    .map(point => Math.abs(point.x) + Math.abs(point.y))
);

console.log(`Part 1: ${closestToOrigin}`);

const shortestDistanceToIntersection = Math.min(
  ...intersections.map(x => x.distance)
);

console.log(`Part 2: ${shortestDistanceToIntersection}`);
