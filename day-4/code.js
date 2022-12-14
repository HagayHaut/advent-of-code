const fs = require("fs");

const fileContents = fs.readFileSync(
    "/home/hagay/Development/advent-of-code/advent-of-code-2022/day-4/input.txt",
    "utf-8"
);

const elfPairRanges = fileContents.split("\n");

const hasFullOverlap = (s) => {
    const [[startA, endA], [startB, endB]] = s
        .split(",")
        .map((range) => range.split("-").map(Number));

    return (
        (startA >= startB && endA <= endB) || (startB >= startA && endB <= endA)
    );
};

const totalOverlapCount = elfPairRanges
    .map(hasFullOverlap)
    .filter((x) => x).length;

// pt1 answer: 459

// PART TWO: (total overlaps  including partial)

const within = (a, [b, c]) => {
    return a >= b && a <= c;
};

const hasPartialOverlap = (s) => {
    const [[startA, endA], [startB, endB]] = s
        .split(",")
        .map((range) => range.split("-").map(Number));

    return (
        within(startA, [startB, endB]) ||
        within(endA, [startB, endB]) ||
        within(startB, [startA, endA]) ||
        within(endB, [startA, endA])
    );
};

const partialOverlapCount = elfPairRanges
    .map(hasPartialOverlap)
    .filter((x) => x).length;

// pt2 answer: 779

console.log({ totalOverlapCount, partialOverlapCount });
