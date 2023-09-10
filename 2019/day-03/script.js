const fs = require('fs');
const { join } = require('path');

const input = fs.readFileSync(join(__dirname, 'input.txt'), 'utf-8');
const lines = input.split('\n');

function sanitizeMoves(moveSet) {
    return moveSet.split(',').map(move => [move[0], +move.slice(1)]);
}

const [line1Moves, line2Moves] = lines.map(sanitizeMoves);

// Record coordinates of each line in a set.
// Intersections are overlaps.
function recordPath(lineMoves) {
    const set = new Set();
    let i = 0, j = 0;
    for (let [direction, count] of lineMoves) {
        while (count--) {
            if (['L', 'R'].includes(direction)) {
                i += direction === 'L' ? -1 : 1;
            } else {
                j += direction === 'U' ? -1 : 1;
            }
            set.add(`${i},${j}`);
        }
    }
    return set;
}

function intersect2Sets(set1, set2) {
    const intersections = new Set();
    for (const val of set2) {
        if (set1.has(val)) {
            intersections.add(val);
        }
    }
    return intersections;
}

// Use Taxicab Geometry to determine closest intersection to `0,0`
function calculateDistance(intersection) {
    const [i, j] = intersection.split(',').map(Number);
    return Math.abs(i) + Math.abs(j);
}

function findClosestDistance(intersections) {
    return Math.min(...intersections.map(calculateDistance));
}

const intersections = [...intersect2Sets(recordPath(line1Moves), recordPath(line2Moves))];

const part1 = findClosestDistance(intersections);
console.log(part1);
// part1: 375