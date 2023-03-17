const fs = require("fs");
const { join } = require("path");

const input = fs.readFileSync(join(__dirname, "input.txt"), "utf-8");
const sum = (a, b) => a + b;

const processInput = (group) => {
    const groups = input.split('\n\n');
    return groups.map(group === 1 ? processPart1Group : processPart2Group);
}

// number of unique responses per group
const processPart1Group = (group) => {
    return new Set(group.split('\n').map(ln => ln.split('')).flat()).size;
}

// number of responses submitted by each member of group
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

// part2: 3445

part1();
part2();