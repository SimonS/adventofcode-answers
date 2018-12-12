class Marble {
    constructor(val, next=this, previous=this) {
        this.val = val
        this.next = next
        this.previous = previous
    }

    append(val) {
        let newNext = this.next
        let newMarble = new Marble(val, newNext, this)
        this.next = newMarble

        if (this.previous === this) {
            this.previous = newMarble
        }
        
        newNext.previous = newMarble
        return newMarble
    }

    remove() {
        this.previous.next = this.next
        this.next.previous = this.previous

        return this.next
    }

    toArray() {
        let done = new Set()
        let curr = this
        let arr = []
        while (!done.has(curr)) {
            arr.push(curr.val)
            done.add(curr)
            curr = curr.next
        }
        return arr
    }
}

const placeMarble = (marble, nth, players, scores) => {
    const player = ((nth - 1) % players) + 1

    if (nth % 23) {
        return marble.next.append(nth)
    }

    const targetMarble = marble.previous.previous.previous.previous.previous.previous.previous
    scores[player] = scores[player] ?  scores[player] + nth + targetMarble.val : nth + targetMarble.val;

    return targetMarble.remove()
}

const getHighScore = (players, until) => {
    let scores = {}
    let circle = new Marble(0)

    for (let i = 1; i <= until; i++) {
        circle = placeMarble(circle, i, players, scores)    
    }

    return Math.max(...Object.values(scores))
}

console.time('part2')
console.log('Part 2: ' + getHighScore(418, 7076900))
console.timeEnd('part2')
