const fs = require("fs");
const { join } = require("path");

const fileContents = fs.readFileSync(join(__dirname, "input.txt"), "utf-8");

const plays = fileContents.split("\n").map((s) => s.split(" "));

const calculateScore = ([a, b]) => {
    let res = 0;
    if (b === "X") {
        res++;
        res += a === "A" ? 3 : a === "B" ? 0 : 6;
    } else if (b === "Y") {
        res += 2;
        res += a === "A" ? 6 : a === "B" ? 3 : 0;
    } else {
        res += 3;
        res += a === "A" ? 0 : a === "B" ? 6 : 3;
    }
    return res;
};

const sum = (a, b) => a + b;

const playScores = plays.map(calculateScore);

// pt1 answer: 14297

const scoreMap = {
    X: 0,
    Y: 3,
    Z: 6,
};

const winLosePoints = plays
    .map(([_, winLoseDraw]) => scoreMap[winLoseDraw])
    .reduce(sum);

const getPlayFromInput = ([op, wld]) => {
    if (op === "A") {
        return wld === "X" ? 3 : wld === "Y" ? 1 : 2;
    } else if (op === "B") {
        return wld === "X" ? 1 : wld === "Y" ? 2 : 3;
    } else {
        return wld === "X" ? 2 : wld === "Y" ? 3 : 1;
    }
};

const shapePoints = plays.map(getPlayFromInput).reduce(sum);

console.log(shapePoints + winLosePoints);

// pt2 answer: 10498
