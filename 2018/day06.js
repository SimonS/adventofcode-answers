let input = require('fs').readFileSync('inputs/day06.txt', 'utf8');

// input = `1, 1
// 1, 6
// 8, 3
// 3, 4
// 5, 5
// 8, 9`

const coordStringToInt = (line) => line.split(', ').map(n => parseInt(n, 10))
const coordsToString = ([x, y]) => `${x}, ${y}`

const coords = input.split('\n')
    .map(coordStringToInt)

const getMinMax = (nums) => {
    const sorted = nums.sort((a, b) => a-b)
    const [min] = sorted
    const [max] = sorted.reverse()
    return [min, max]
}

const [minX, maxX] = getMinMax(coords.map(coord => coord[0]))
const [minY, maxY] = getMinMax(coords.map(coord => coord[1]))

const inGrid = ([x, y]) => x > minX && x < maxX && y > minY && y < maxY

const included = new Set(coords.filter(inGrid).map(coordsToString))

const getDistance = (coordA, coordB) => Math.abs((coordB[0] - coordA[0])) + Math.abs((coordB[1] - coordA[1]))

let grid = []

for (i = 0; i <= maxY; i++) {
    grid.push([])
    for (j = 0; j <= maxX; j++) {
        if (inGrid([i -1, j -1]) || inGrid([i +1, j +1])) {
            const sortedDistances = coords.map(([x, y]) => {
                return [`${x}, ${y}`, getDistance([x, y], [j, i])]
            }).sort((a, b) => a[1] - b[1])

            if(sortedDistances[0][1] !== sortedDistances[1][1]) {
                grid[i].push(sortedDistances[0][0])
            } 
        }
    }
}

totals = {}

grid.forEach((row) => {
    row.forEach((col) => {
        if (included.has(col)) {
            if (col in totals) {
                totals[col]++
            } else {
                totals[col] = 1
            }
        }
    })
})

const [furthestAway] = Object.values(totals).sort((a, b) => b-a);
console.log(`Part 1: ${furthestAway}`)
