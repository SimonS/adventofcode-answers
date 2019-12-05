const fs = require("fs");
const inputFile = fs.readFileSync("inputs/day03.txt", "utf8");

const [wire1, wire2] = inputFile.split("\n");

const getPath = wire => {
  const instructions = wire.split(",").map(instruction => ({
    direction: instruction[0],
    distance: parseInt(instruction.slice(1))
  }));

  let position = { x: 0, y: 0 };
  let positions = [{ ...position }];
  
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
      positions.push({...position});
    }
  });
  return positions;
};

// let wire1Paths = getPath(wire1);
// let wire2Paths = getPath(wire2);
let wire1Paths = getPath("R8,U5,L5,D3");
let wire2Paths = getPath("U7,R6,D4,L4");

console.log(wire1Paths)
console.log(wire2Paths)
const intersections = wire1Paths.filter(x => wire2Paths.filter(y => (x.x === y.x && x.y === y.y)));

console.log(intersections);