const fs = require("fs");

const fileContents = fs.readFileSync(
    "/home/hagay/Development/advent-of-code/advent-of-code-2022/day-5/input.txt",
    "utf-8"
);
const lines = fileContents.split("\n");
const inputStacks = lines.slice(0, 8);
const moves = lines.slice(10);

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

const processMove = (s) => {
    const [move, amount, from, source, to, target] = s.split(" ");
    return [amount, source, target].map(Number);
};

moves.forEach((move) => {
    const [amount, source, target] = processMove(move);

    for (let i = 0; i < amount; i++) {
        stacks[target].push(stacks[source].pop());
    }
});

const pt1Result = stacks
    .slice(1)
    .map((arr) => arr.at(-1))
    .join("");

console.log(pt1Result);
