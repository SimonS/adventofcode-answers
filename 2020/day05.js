const seats = fs
  .readFileSync(__dirname + "/inputs/day05.txt", "utf8")
  .split("\n");

const numberSplitter = (instructions, targetLetter, upperBounds) =>
  Array.from(instructions).reduce(
    ([min, max], instruction) =>
      instruction === targetLetter
        ? [Math.ceil((min + max) / 2), max]
        : [min, Math.floor((min + max) / 2)],
    [0, upperBounds]
  )[0];

const getSeatNumber = (seat) =>
  numberSplitter(seat.slice(0, 7), "B", 127) * 8 +
  numberSplitter(seat.slice(7), "R", 7);

const sortedSeats = seats.map(getSeatNumber).sort((a, b) => a - b);
console.log(sortedSeats[sortedSeats.length - 1]);

let i = 0;
while (i < sortedSeats.length && sortedSeats[0] + i === sortedSeats[i]) i++;

console.log(sortedSeats[i] - 1);
