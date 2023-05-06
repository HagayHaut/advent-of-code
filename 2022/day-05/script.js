const fs = require("fs");
const { join } = require("path");

const fileContents = fs.readFileSync(join(__dirname, "input.txt"), "utf-8");
const lines = fileContents.split("\n");
const inputStacks = lines.slice(0, 8);
const moves = lines.slice(10);

const getInitializeStacks = () => {
    const stacks = Array(10)
        .fill()
        .map((_) => []);

    const stackIndexes = [1, 5, 9, 13, 17, 21, 25, 29, 33];

    for (let i = 7; i >= 0; i--) {
        const row = inputStacks[i];
        stackIndexes.forEach((stackIndex, i) => {
            if (row[stackIndex] !== " ") stacks[i + 1].push(row[stackIndex]);
        });
    }

    return stacks;
};

const pt1Stacks = getInitializeStacks();
const pt2Stacks = getInitializeStacks();

const processMove = (s) => {
    const [, amount, , source, , target] = s.split(" ");
    return [amount, source, target].map(Number);
};

moves.forEach((move) => {
    const [amount, source, target] = processMove(move);

    for (let i = 0; i < amount; i++) {
        pt1Stacks[target].push(pt1Stacks[source].pop());
    }

    pt2Stacks[target].push(...pt2Stacks[source].splice(-amount));
});

const processResult = (stacks) => {
    return stacks
        .slice(1)
        .map((arr) => arr.at(-1))
        .join("");
};

const pt1Result = processResult(pt1Stacks);

const pt2Result = processResult(pt2Stacks);

console.log({ pt1Result, pt2Result });
