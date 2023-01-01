const fs = require("fs");
const { join } = require("path");

const stream = fs.readFileSync(join(__dirname, "input.txt"), "utf-8");

let pt1Result;
let pt2Result;

const isXUnique = (section, x) => new Set(section).size === x;

for (let i = 0; i < stream.length - 4; i++) {
    if (!pt1Result && isXUnique(stream.slice(i, i + 4), 4)) {
        pt1Result = i + 4;
    }
    if (!pt2Result && isXUnique(stream.slice(i, i + 14), 14)) {
        pt2Result = i + 14;
    }
}

console.log({ pt1Result, pt2Result });

// pt1 answer: 1779
// pt2 answer: 2635
