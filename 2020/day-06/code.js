const fs = require("fs");
const { join } = require("path");

const input = fs.readFileSync(join(__dirname, "input.txt"), "utf-8");
const sum = (a, b) => a + b;

const processInput = (part) => {
    const groups = input.split('\n\n');
    return groups.map(part === 1 ? processPart1Group : processPart2Group);
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

// part 1
console.log(processInput(1).reduce(sum));
// -> 6748

// part 2
console.log(processInput(2).reduce(sum));
// -> 3445