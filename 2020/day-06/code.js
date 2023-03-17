const fs = require("fs");
const { join } = require("path");

const getInput = () => fs.readFileSync(join(__dirname, "input.txt"), "utf-8");
const sum = (a, b) => a + b;

const processInput = (group) => {
    const input = getInput();
    const groups = input.split('\n\n');
    return groups.map(group === 1 ? processPart1Group : processPart2Group);
}

const processPart1Group = (group) => {
    const uniqResponses = new Set();
    group.split('\n').forEach(line => {
        line.split('').forEach(resp => uniqResponses.add(resp));
    })
    return uniqResponses.size;
}

const processPart2Group = (group) => {
    const uniqsPerPerson = group.split('\n').map(line => new Set([...line]));
    return [...uniqsPerPerson[0]]
        .filter(resp => uniqsPerPerson.slice(1).every(set => set.has(resp)))
        .length;
}

const part1 = () => {
    console.log(processInput(1).reduce(sum));
}

// part1: 6748

const part2 = () => {
    console.log(processInput(2).reduce(sum));
}

part2();