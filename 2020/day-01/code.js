const fs = require('fs');
const { join } = require('path');

const getInput = () => fs.readFileSync(join(__dirname, 'input.txt'), 'utf-8');

const processInput = (input) => {
    const lines = input.split('\n');
    return lines.map(Number);
}

const entries = processInput(getInput());
const target = 2020;
const n = entries.length;

const part1 = () => {
    // basically 2-Sum
    const seen = new Set();
    for (const num of entries) {
        const compliment = target - num;
        if (seen.has(compliment)) return compliment * num;
        seen.add(num);
    }
    return seen
}


const part2 = () => {
    // basically 3-Sum
    const sorted = [...entries].sort((a, z) => a - z);
    for (let i = 0; i < n; i++) {
        let l = 1 + 1, r = n - 1;
        
        while (l < r) {
            const curSum = sorted[i] + sorted[l] + sorted[r];
            if (curSum === target) return sorted[i] * sorted[l] * sorted[r];
            if (curSum < target) l++;
            else r--;
        }
    }
}

// part 1: 157059
// part2 : 165080960

console.log({ part1: part1(), part2: part2() });