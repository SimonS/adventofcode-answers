const input = fs.readFileSync(__dirname + "/inputs/day04.txt", "utf8");

const isBetween = (n, lower, upper) => Number(n) >= lower && Number(n) <= upper;

const validateHeight = (height) => {
  const match = height.match(/^(\d+)(cm|in)$/);
  if (!match) return false;

  return match[2] === "cm"
    ? isBetween(match[1], 150, 193)
    : isBetween(match[1], 59, 76);
};

const validators = {
  byr: (val) => isBetween(val, 1920, 2002),
  iyr: (val) => isBetween(val, 2010, 2020),
  eyr: (val) => isBetween(val, 2020, 2030),
  hgt: validateHeight,
  hcl: (val) => val.match(/^#[a-f\d]{6}$/) !== null,
  ecl: (val) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(val),
  pid: (val) => val.match(/^\d{9}$/),
};

const hasRequiredFields = (field) =>
  Object.keys(validators).filter(
    (x) => field.filter(([header, _]) => header === x).length === 0
  ).length === 0;

const passports = input.split("\n\n").map((passport) => passport.split(/\s/));

const passportsWithCorrectFields = passports
  .map((field) => field.map((f) => f.split(":")))
  .filter(hasRequiredFields);

console.log(passportsWithCorrectFields.length);

const passportsWithValidFields = passportsWithCorrectFields.filter(
  (passport) =>
    passport.filter(
      ([key, value]) => key in validators && !validators[key](value)
    ).length === 0
);

console.log(passportsWithValidFields.length);
