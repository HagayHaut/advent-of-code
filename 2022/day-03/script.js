const fs = require("fs");
const { join } = require("path");

const fileContents = fs.readFileSync(join(__dirname, "input.txt"), "utf-8");

const rucksacks = fileContents.split("\n");

const getCommonLetter = (s) => {
    const firstHalf = new Set([...s.slice(0, ~~(s.length / 2))]);
    const secondHalf = new Set([...s.slice(~~(s.length / 2))]);
    return [...s].find((c) => firstHalf.has(c) && secondHalf.has(c));
};

const commonLetters = rucksacks.map(getCommonLetter);

const letterMap = {};
const lowerOFFSET = "a".charCodeAt() - 1;
const upperOFFSET = "A".charCodeAt() - 1;

for (let i = 1; i < 27; i++) {
    const lower = String.fromCharCode(lowerOFFSET + i);
    const upper = String.fromCharCode(upperOFFSET + i);
    letterMap[lower] = i;
    letterMap[upper] = i + 26;
}

const priorities = commonLetters.map((c) => letterMap[c]);

const sum = (a, b) => a + b;

const p1Result = priorities.reduce(sum);

// pt1 answer: 7980

// part 2, elves in groups of three

const elfGroups = [];

for (let i = 0; i < 300; i += 3) {
    elfGroups.push(rucksacks.slice(i, i + 3));
}

const getCommonItemFromGroup = ([a, b, c]) => {
    const set1 = new Set([...a]);
    const set2 = new Set([...b]);
    const set3 = new Set([...c]);

    return [...(a + b + c)].find(
        (c) => set1.has(c) && set2.has(c) && set3.has(c)
    );
};

const groupCommonItems = elfGroups.map(getCommonItemFromGroup);

const groupPriorities = groupCommonItems.map((c) => letterMap[c]);

// pt2 answer: 2881

const p2Result = groupPriorities.reduce(sum);

console.log({ p1Result, p2Result });
