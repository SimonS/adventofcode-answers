const [departureTime, ...buses] = `1006605
19,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,883,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,x,x,797,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,29`
  .split(/\n|,/)
  .filter((bus) => bus != "x")
  .map((bus) => parseInt(bus, 10));

const [nextBus, timeUntil] = buses
  .map((bus) => [bus, bus - (departureTime % bus)])
  .sort((a, b) => a[1] - b[1])[0];

console.log(nextBus * timeUntil);
