const fs = require("fs");

const input = fs.readFileSync("inputs/day02.txt", "utf8").split("\n");

const isValidLength = ([rule, targetLetter, password]) => {
  const [lower, upper] = rule.split("-");
  const letterCount = password
    .split("")
    .filter((letter) => letter === targetLetter).length;

  return letterCount >= lower && letterCount <= upper;
};

const isValidPositions = ([rule, targetLetter, password]) => {
  const [pos1, pos3] = rule.split("-").map((n) => password[n - 1]);

  return (pos1 === targetLetter || pos3 === targetLetter) && pos1 !== pos3;
};

const parsedLine = input
  .filter((line) => line.length)
  .map((line) => line.split(/:?\s/g));

console.log(parsedLine.filter(isValidLength).length);
console.log(parsedLine.filter(isValidPositions).length);
