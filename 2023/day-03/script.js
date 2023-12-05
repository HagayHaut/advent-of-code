const fs = require("fs");
const { join } = require("path");

const input = fs.readFileSync(join(__dirname, "input.txt"), "utf-8");
const grid = processInput();
const height = grid.length;
const width = grid[0].length;

function processInput() {
    return input
        .split('\n')
        .map(line => [...line]);
}

function isDigit(c) {
    return /\d/.test(c);
}

function isSymbol(x) {
    return x && x !== '.' && !isDigit(x);
}

function getNumberLength(r, c) {
    let numberLength = 0;
    while (isDigit(grid[r][c])) {
        numberLength++;
        c++;
    }
    return numberLength;
}

function isNumberTouchingSymbol(r, c, numberLength) {
    if (!isDigit(grid[r][c])) return false;

    const top = touchesTop(r, c, numberLength);
    const bottom = touchesBottom(r, c, numberLength);
    const left = isSymbol(grid[r][c - 1]);
    const right = isSymbol(grid[r][c + numberLength]);

    return top || bottom || left || right;
}

function touchesTop(r, c, numberLength) {
    if (r === 0) return false;
    c--;
    for (let i = 0; i < numberLength + 2; i++) {
        if (isSymbol(grid[r - 1][c++])) return true;
    }
    return false;
}

function touchesBottom(r, c, numberLength) {
    if (r === height - 1) return false;
    c--;
    for (let i = 0; i < numberLength + 2; i++) {
        if (isSymbol(grid[r + 1][c++])) return true;
    }
    return false;
}

function part1() {
    let sum = 0;

    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            if (isDigit(r, c)) {
                const numberLength = getNumberLength(r, c);
                const isTouching = isNumberTouchingSymbol(r, c, numberLength);

                if (isTouching) {
                    let fullNumber = grid[r]
                        .slice(c, c + numberLength)
                        .join('');

                    sum += +fullNumber;
                }
                c += numberLength;
            }
        }
    }

    return sum;
}

console.log(part1());