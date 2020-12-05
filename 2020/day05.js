const seats = fs
  .readFileSync(__dirname + "/inputs/day05.txt", "utf8")
  .split("\n");

const getSeatNumber = (seat) => {
  const row = seat.slice(0, 7);
  const col = seat.slice(7);
  return (
    row
      .split("")
      .reduce(
        ([min, max], instruction) =>
          instruction === "B"
            ? [Math.ceil((min + max) / 2), max]
            : [min, Math.floor((min + max) / 2)],
        [0, 127]
      )[0] *
      8 +
    col
      .split("")
      .reduce(
        ([min, max], instruction) =>
          instruction === "R"
            ? [Math.ceil((min + max) / 2), max]
            : [min, Math.floor((min + max) / 2)],
        [0, 8]
      )[0]
  );
};

console.log(Math.max(...seats.map(getSeatNumber)));
