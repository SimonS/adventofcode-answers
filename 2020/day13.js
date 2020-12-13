const [departureTime, ...buses] = `1006605
19,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,883,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,x,x,797,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,29`
  .split(/\n|,/)
  .map((bus) => parseInt(bus, 10));

const [nextBus, timeUntil] = buses
  .filter((bus) => !isNaN(bus))
  .map((bus) => [bus, bus - (departureTime % bus)])
  .sort((a, b) => a[1] - b[1])[0];

console.log(nextBus * timeUntil);

let n = 0;
let increment = 1;
let time = 1;

while (n < buses.length) {
  if (!isNaN(buses[n])) {
    while ((time + n) % buses[n]) {
      time += increment;
    }
    increment = increment * buses[n];
  }
  n++;
}

console.log(time);
