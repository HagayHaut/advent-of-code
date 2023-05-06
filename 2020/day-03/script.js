const fs = require('fs');
const { join } = require('path');

const getInput = () => fs.readFileSync(join(__dirname, 'input.txt'), 'utf-8');

const processInput = (input) => {
    return input
        .split('\n')
        .map(line => line.split(''));
}

const countCollisions = (y, x) => {
    let trees = 0;
    let r = 0, c = 0;
    while (r < forest.length) {
        if (forest[r][c] === '#') trees++;
        c = (c + x) % forest[r].length;
        r += y;
    }
    return trees;
}

const forest = processInput(getInput());

const part1 = () => {
    return countCollisions(1, 3);    
}

const part2 = () => {
    const slopes = [
        [1, 1],
        [1, 3],
        [1, 5],
        [1, 7],
        [2, 1],
    ];
    return slopes
        .map(([y, x]) => countCollisions(y, x))
        .reduce((a, b) => a * b, 1);
}

// part1: 294
// part2: 5774564250

console.log({ part1: part1(), part2: part2() })