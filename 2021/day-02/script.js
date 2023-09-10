const fs = require('fs');
const { join } = require('path');

const input = fs.readFileSync(join(__dirname, 'input.txt'), 'utf-8');

function processInput() {
    const lines = input.split('\n');
    return lines
        .map(line => line.split(' ').map((x, i) => i ? +x : x));
}

const moves = processInput();

function solvePart1() {
    let depth = 0, distance = 0;
    for (const [direction, count] of moves) {
        if (direction === 'forward') {
            distance += count;
        } else {
            depth += direction === 'up' 
                ? -count
                : count;
        }
    }
    return depth * distance;
}

const part1 = solvePart1();
console.log(part1);
// part1: 1484118