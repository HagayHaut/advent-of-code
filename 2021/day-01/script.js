const fs = require("fs");
const { join } = require("path");

const getInput = () => {
    return fs.readFileSync(join(__dirname, "input.txt"), "utf-8");
};

const processInput = (input) => {
    return input.split("\n").map((s) => s.split(""));
};

const dirsOut = {
    ">": [0, 1],
    v: [1, 0],
};

const dirsIn = [
    [-1, 0],
    [0, -1],
];

let mat = processInput(getInput());
const m = mat.length;
const n = mat[0].length;

const getNextGen = () => {
    let wasChanged = false;
    const nextGen = Array(m)
        .fill()
        .map((_) => Array(n).fill("."));

    const isIB = (r, c) => r >= 0 && r < m && c >= 0 && c < n;

    const canMoveThere = (r, c) => {
        const [dr, dc] = dirsOut[mat[r][c]];
        const [rr, cc] = [r + dr, c + dc];
        return isIB(rr, cc) && mat[rr][cc] === ".";
    };

    const canMoveHere = (r, c) => {
        for (const [dr, dc] of dirsIn) {
            const [rr, cc] = [r + dr, c + dc];
            if (isIB(rr, cc) && mat[rr][cc] !== ".") {
                return mat[rr][cc];
            }
        }
        return ".";
    };

    mat.forEach((row, r) => {
        row.forEach((cell, c) => {
            if (cell === ".") {
                const nextCellGen = canMoveHere(r, c);
                if (nextCellGen !== cell) {
                    wasChanged = true;
                    nextGen[r][c] = nextCellGen;
                }
            } else {
                if (canMoveThere(r, c)) {
                    wasChanged = true;
                } else nextGen[r][c] = cell;
            }
        });
    });

    return [nextGen, wasChanged];
};

const part1 = () => {
    let changed = true;
    let steps = 0;

    while (changed) {
        [mat, changed] = getNextGen();
        steps++;
    }

    console.log(steps);
};

part1();
