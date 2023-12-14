const fs = require("fs");
const { join } = require("path");

const input = fs.readFileSync(join(__dirname, "input.txt"), "utf-8");
const { instructions, nodes } = processInput();

function processInput() {
    const [instructions, _, ...rest] = input.split('\n');
    const nodes = {};
    for (const line of rest) {
        const [node, L, R] = line.match(/[A-Z]+/g);
        nodes[node] = { L, R };
    }
    return { instructions, nodes };
}

function part1() {
    let steps = 0, curr = 'AAA', index = 0;
    while (curr !== 'ZZZ') {
        if (index === instructions.length) {
            index = 0;
        }
        curr = nodes[curr][instructions[index]];
        steps++;
        index++;
    }
    return steps;
}

console.log(part1());
// 20221