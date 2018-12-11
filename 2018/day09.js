// input: 418 players; last marble is worth 70769 points

let circle = [0]
let currentMarble = 0;
let lastPlaced = 0
let scores = {}

const traverseCircle = (circleSize, start, steps) => {
    let decrement = Math.abs(steps)
    while (decrement--) {
        if (steps > 0) {
            start = start < circleSize - 1 ? start + 1 : 0
        } else {
            start = start > 0 ? start - 1 : circleSize - 1
        }
    }
    return start
}

const placeMarble = (circle, lastPlaced, next, players, scores) => {
    const player = ((next - 1) % players) + 1

    if (next % 23) {
        const currentMarble = lastPlaced
        const newMarble = next
        const currentIndex = circle.indexOf(currentMarble)
        const insertAfter = traverseCircle(circle.length, currentIndex, 1)

        return {
            circle: [...circle.slice(0, insertAfter + 1), newMarble, ...circle.slice(insertAfter + 1)],
            lastPlaced: newMarble
        }
    }

    const remove = traverseCircle(circle.length, circle.indexOf(lastPlaced), -7)
    const newMarble = circle[traverseCircle(circle.length, remove, 1)]
    scores[player] = scores[player] ?  scores[player] + (next + circle[remove]) : next + circle[remove];

    return {
        circle: [...circle.slice(0, remove), ...circle.slice(remove + 1)],
        lastPlaced: newMarble, 
        scores
    }
}

const getHighScore = (players, until) => {
    let scores = {}
    let circle = [0]

    for (let i = 1; i <= until; i++) {
        let results = placeMarble(circle, lastPlaced, i, players, scores)
        circle = results.circle,
        lastPlaced = results.lastPlaced,
        scores = scores
    }

    return Math.max(...Object.values(scores))
}

// console.log(getHighScore(10, 1618))
// console.log(getHighScore(13, 7999))
// console.log(getHighScore(17, 1104))
// console.log(getHighScore(21, 6111))
// console.log(getHighScore(30, 5807))

console.log('part 1: ' + getHighScore(418, 70769))
console.log('part 2: ' + getHighScore(418, 7076900))