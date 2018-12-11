let input = require('fs').readFileSync('inputs/day08.txt', 'utf8')
    .split(' ')
    .map(n => parseInt(n, 10));

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

const nodeValue = (tree) => {
    if (tree.children.length === 0)
        return tree.metadata.reduce((a, b) => a+b, 0)
    
    return tree.metadata
        .filter(i => i - 1 < tree.children.length)
        .map(i => nodeValue(tree.children[i-1]))
        .reduce((a, b) => a+b, 0)
}

const parsedTree = parseTree(input)

console.log('Part 1: ' + sumTree(parsedTree))
console.log('Part 2: ' + nodeValue(parsedTree))