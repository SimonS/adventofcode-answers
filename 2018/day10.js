let input = require('fs')
    .readFileSync('inputs/day10.txt', 'utf8');

// input = `position=< 9,  1> velocity=< 0,  2>
// position=< 7,  0> velocity=<-1,  0>
// position=< 3, -2> velocity=<-1,  1>
// position=< 6, 10> velocity=<-2, -1>
// position=< 2, -4> velocity=< 2,  2>
// position=<-6, 10> velocity=< 2, -2>
// position=< 1,  8> velocity=< 1, -1>
// position=< 1,  7> velocity=< 1,  0>
// position=<-3, 11> velocity=< 1, -2>
// position=< 7,  6> velocity=<-1, -1>
// position=<-2,  3> velocity=< 1,  0>
// position=<-4,  3> velocity=< 2,  0>
// position=<10, -3> velocity=<-1,  1>
// position=< 5, 11> velocity=< 1, -2>
// position=< 4,  7> velocity=< 0, -1>
// position=< 8, -2> velocity=< 0,  1>
// position=<15,  0> velocity=<-2,  0>
// position=< 1,  6> velocity=< 1,  0>
// position=< 8,  9> velocity=< 0, -1>
// position=< 3,  3> velocity=<-1,  1>
// position=< 0,  5> velocity=< 0, -1>
// position=<-2,  2> velocity=< 2,  0>
// position=< 5, -2> velocity=< 1,  2>
// position=< 1,  4> velocity=< 2,  1>
// position=<-2,  7> velocity=< 2, -2>
// position=< 3,  6> velocity=<-1, -1>
// position=< 5,  0> velocity=< 1,  0>
// position=<-6,  0> velocity=< 2,  0>
// position=< 5,  9> velocity=< 1, -2>
// position=<14,  7> velocity=<-2,  0>
// position=<-3,  6> velocity=< 2, -1>`

const parsedInput = input.split('\n')
    .map(line => {
        const [_, x, y, xChange, yChange] = line.match(/position=<(.*), (.*)> velocity=<(.*), (.*)>/)

        return {
            position: [x, y].map(Number),
            velocity: [xChange, yChange].map(Number)
        }
    });

const processNode = (node) => {
    const {
        position,
        velocity
    } = node

    return {
        velocity,
        position: position.map((n, idx) => n + velocity[idx])
    }
}

const arrContains = (arr, member) => arr.filter(item => JSON.stringify(item) === JSON.stringify(member)).length

const gridToString = (grid) => {
    const positions = normalizePositions(grid.map(point => point.position))

    const {
        minX,
        maxX,
        minY,
        maxY
    } = getMinMax(positions)

    let arrGrid = []
    for (y = minY; y <= maxY; y++) {
        arrGrid.push(new Array())
        for (x = minX; x <= maxX; x++) {
            if (arrContains(positions, [x, y])) {
                arrGrid[y].push('#')
            } else {
                arrGrid[y].push('.')
            }
        }
    }

    return arrGrid.map(row => row.join('')).join('\n')
}

const normalizePositions = (positions) => {
    const {
        minX,
        minY
    } = getMinMax(positions)

    const offsetX = 0 - minX
    const offsetY = 0 - minY

    return positions.map(([x, y]) => [x + offsetX, y + offsetY])
}

const getMinMax = (positions) => {
    const minX = Math.min(...positions.map(([x]) => x))
    const maxX = Math.max(...positions.map(([x]) => x))
    const minY = Math.min(...positions.map(([_, y]) => y))
    const maxY = Math.max(...positions.map(([_, y]) => y))

    return {
        minX,
        maxX,
        minY,
        maxY
    }
}

const gridHeight = (grid) => {
    const {
        minY,
        maxY
    } = getMinMax(grid.map(point => point.position))

    return maxY - minY
}

const processUntil = (input, condition) => {
    let seconds = 0

    while (!condition(input)) {
        input = input.map(processNode)
        seconds++
    }

    return [input, seconds]
}

const [result, totalTime] = processUntil(parsedInput, (input) => gridHeight(input) === 9)

console.log('Part 1:')
console.log(gridToString(result))
console.log('Part 2: ' + totalTime)