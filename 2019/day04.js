let eligiblePasswordCount = 0;

let password = 231832;

const isOrdered = str => str.split("").sort().join("") === str;
const hasRepeats = str => /(.)\1/.test(str);

const isEligible = pw => isOrdered(pw) && hasRepeats(pw);

while (password++ <= 767346) {
    if (isEligible(password.toString())) eligiblePasswordCount++;
}

console.log(eligiblePasswordCount);
