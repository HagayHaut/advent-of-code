const fs = require('fs');
const { join } = require('path');

const getInput = () => fs.readFileSync(join(__dirname, 'input.txt'), 'utf-8');

const processInput = (input) => {
    const lines = input.split('\n');
    return lines.map(line => {
        const [range, letter, pw] = line.split(' ');
        return [range.split('-').map(Number), letter[0], pw];
    })
}

const checkPart1Validity = ([range, letter, password]) => {
    let count = 0;
    for (const c of password) if (c === letter) count++;
    return count >= range[0] && count <= range[1];
}

const part1 = () => {
    const logs = processInput(getInput());
    return logs.filter(checkPart1Validity).length;
}

const checkPart2Validity = ([range, letter, password]) => {
    let count = 0;
    if (password[range[0] - 1] === letter) count++;
    if (password[range[1] - 1] === letter) count++;
    return count === 1;
}

const part2 = () => {
    const logs = processInput(getInput());
    return logs.filter(checkPart2Validity).length;
}

// part1: 454
// part2: 649

console.log({ part1: part1(), part2: part2() })