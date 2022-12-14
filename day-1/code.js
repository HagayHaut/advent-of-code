const fs = require("fs");

const fullInput = fs.readFileSync(
    "/home/hagay/Development/advent-of-code/advent-of-code-2022/day-1/input.txt",
    "utf-8"
);

const separatedElfMeals = (s) => {
    const res = [];
};

const lines = fullInput.split("\n");

let elfIndex = 0;
let caloriesPerElf = {};

for (let i = 0; i < lines.length; i++) {
    if (!caloriesPerElf[elfIndex]) caloriesPerElf[elfIndex] = 0;
    if (!lines[i]) {
        elfIndex++;
        continue;
    }
    caloriesPerElf[elfIndex] += Number(lines[i]);
}

const sortedCalorySums = Object.values(caloriesPerElf).sort((a, z) => z - a);

console.log(sortedCalorySums[0]);

// pt 1 answer: 72602

console.log(sortedCalorySums.slice(0, 3).reduce((a, b) => a + b));
// pt2 answer: 207410
