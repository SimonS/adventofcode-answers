// Just pasting this in from faffing in console:

// part 1:
realInput
  .split("\n")
  .map((line) => {
    const nums = [...line.matchAll(/\d/g)];
    const first = nums[0][0];
    const last = nums[nums.length - 1][0];
    return parseInt(`${first}${last}`, 10);
  })
  .reduce((a, b) => a + b, 0);

// part 2, lol:
realInput
  .split("\n")
  .map((line) => {
    var re = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;
    const nums = Array.from(line.matchAll(re), (x) => x[1]).map((char) =>
      isNaN(parseInt(char))
        ? {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
          }[char]
        : parseInt(char)
    );
    const first = nums[0];
    const last = nums[nums.length - 1];
    return parseInt(`${first}${last}`, 10);
  })
  .reduce((a, b) => a + b, 0);
