let input = require('fs').readFileSync('inputs/day08.txt', 'utf8')
    .split(' ')
    .map(n => parseInt(n, 10));

// input = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2]

const parseTree = (node) => {
    let [numChildren, numMeta, ...remainder] = node
    let children = []

    for (let i = 0; i < numChildren; i++) {
        let child = parseTree(remainder)
        remainder = child.remainder // <- I'm sure there's a nicer way of doing this, but we'll make do 
        children.push(child)
    }
    
    return {
        children,
        metadata: remainder.slice(0, numMeta), 
        remainder: remainder.slice(numMeta)
    }
}

const sumTree = (tree, tot = 0) => {
    return [...tree.metadata, ...tree.children.map(sumTree)] 
        .reduce((a, b) => a+b, 0)
}

console.log(sumTree(parseTree(input)))
