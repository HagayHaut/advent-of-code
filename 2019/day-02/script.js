const fs = require('fs');
const { join } = require('path');

const input = fs.readFileSync(join(__dirname, 'input.txt'), 'utf-8');

function runProgram(program, noun, verb) {
    program[1] = noun;
    program[2] = verb;
    for (let i = 0; i < program.length; i += 4) {
        if (program[i] === 99) break;
        const val1 = program[program[i + 1]];
        const val2 = program[program[i + 2]];
        const newVal = program[i] === 1
            ? val1 + val2
            : val1 * val2;
        program[program[i + 3]] = newVal;
    }
    return program[0];
}
const part1 = runProgram(input.split(',').map(Number), 12, 2);
console.log(part1);
// part1: 5110675

let part2;
const TARGET_AT_ADDRESS_0 = 19690720;
for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
        if (runProgram(input.split(',').map(Number), noun, verb) === TARGET_AT_ADDRESS_0) {
            part2 = 100 * noun + verb;
        }
    }
}
console.log(part2);
// part2: 4847