let eligiblePasswordCount = 0;

let password = 231832;

const isOrdered = str => str.split("").sort().join("") === str;
const hasRepeats = str => {
    let letters = str.split("");
    let counts = {};
    letters.forEach(letter => {
        if (!(letter in counts)) {
            counts[letter] = 1;
        } else {
            counts[letter]++;
        }
    });
    return !!Object.values(counts).filter(count => count === 2).length
};

const isEligible = pw => isOrdered(pw) && hasRepeats(pw);

while (password++ <= 767346) {
    if (isEligible(password.toString())) eligiblePasswordCount++;
}

console.log(eligiblePasswordCount);
