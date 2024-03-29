const [times, distances] = input
  .split("\n")
  .map((line) => line.match(/(\d+)/g).map((n) => parseInt(n, 10)));

getCombos = (time, target) => {
  let winners = 0;
  for (let i = 0; i < time; i++) {
    const totalDistance = i * (time - i);
    if (totalDistance > target) winners++;
  }
  return winners;
};

// part 1
times.reduce((acc, time, i) => getCombos(time, distances[i]) * acc, 1);

// part 2
const [time, distance] = input
  .split("\n")
  .map((line) => parseInt(line.match(/(\d+)/g).join("")));

getCombos(time, distance);
