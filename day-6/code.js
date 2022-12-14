const fs = require("fs");

const stream = fs.readFileSync(
    "/home/hagay/Development/advent-of-code/advent-of-code-2022/day-6/input.txt",
    "utf-8"
);

let pt1Result;
let pt2Result;

const isStartOfPacketMarker = (section) => new Set(section).size === 4;
const isStartOfMessageMarker = (section) => new Set(section).size === 14;

for (let i = 0; i < stream.length - 4; i++) {
    if (!pt1Result && isStartOfPacketMarker(stream.slice(i, i + 4))) {
        pt1Result = i + 4;
    }
    if (!pt2Result && isStartOfMessageMarker(stream.slice(i, i + 14))) {
        pt2Result = i + 14;
    }
}

console.log({ pt1Result, pt2Result });

// pt1 answer: 1779
// pt2 answer: 2635
