const fs = require("fs");
const { join } = require("path");

const getInput = () => {
    return fs.readFileSync(join(__dirname, "input.txt"), "utf8");
};

const processInput = (input) => {
    return input
        .split("\n")
        .map((s) => s.split(" ").map((el, i) => (i ? +el : el)));
};

const dirs = {
    L: [-1, 0],
    R: [1, 0],
    U: [0, 1],
    D: [0, -1],
};

const head = {
    x: 0,
    y: 0,
};

const tail = {
    x: 0,
    y: 0,
};

const visited = new Set(["0-0"]);

const moveHead = ([x, y]) => {
    const newX = head.x + x;
    const newY = head.y + y;
    head.x = newX < 0 ? 0 : newX;
    head.y = newY < 0 ? 0 : newY;
};

const moveTail = ([x, y]) => {
    const newX = tail.x + x;
    const newY = tail.y + y;
    tail.x = newX < 0 ? 0 : newX;
    tail.y = newY < 0 ? 0 : newY;
    visited.add(`${tail.x}-${tail.y}`);
};

const getTailDirection = () => {
    if (tail.x === head.x) {
        return tail.y < head.y ? dirs.U : dirs.D;
    }
    if (tail.y === head.y) {
        return tail.x < head.x ? dirs.R : dirs.L;
    }
    if (tail.x < head.x) {
        return tail.y < head.y ? [1, 1] : [1, -1];
    }
    return tail.y < head.y ? [-1, 1] : [-1, -1];
};

const part1 = () => {
    const lines = processInput(getInput());
    console.log(lines);

    lines.forEach(([dir, count]) => {
        for (let i = 0; i < count; i++) {
            moveHead(dirs[dir]);
            moveTail(getTailDirection());
        }
    });

    return visited.size;
};

part1();
