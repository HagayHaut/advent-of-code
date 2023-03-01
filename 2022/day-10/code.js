const fs = require("fs");
const { join } = require("path");

const getInput = () => {
    return fs.readFileSync(join(__dirname, "input.txt"), "utf8");
};

const processInput = (input) => {
    return input
        .split("\n")
        .map((arr) => arr.split(" "))
        .map((arr) => (arr.length < 2 ? arr : [arr[0], +arr[1]]));
};

const passedThreshold = (cycleStart, cycleEnd) => {
    return [20, 60, 100, 140, 180, 220].some(
        (t) => t >= cycleStart && t <= cycleEnd
    );
};

const part1 = () => {
    let lines = processInput(getInput());
    let [cycle, x] = [0, 1];

    const pt1Result = [];

    for (const line of lines) {
        if (line.length < 2) {
            cycle++;
            continue;
        }

        const [_, amount] = line;
        x += amount;

        if (passedThreshold(cycle, cycle + 2)) {
            pt1Result.push(x);
        }

        cycle += 2;
    }

    console.log(pt1Result.reduce((a, b) => a + b));
};

part1();
