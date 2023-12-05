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

// console.log(part1());
// 529618

function getNeighboringNumbers(r, c) {
    const neighboringNumbers = [];
    if (isDigit(grid[r][c - 1])) {
        neighboringNumbers.push(getFullNumber(r, c - 1));
    }
    if (isDigit(grid[r][c + 1])) {
        neighboringNumbers.push(getFullNumber(r, c + 1));
    }
    const topNumbers = getNumbersTouchingTopOrBottom(r - 1, c);
    const bottomNumbers = getNumbersTouchingTopOrBottom(r + 1, c);
    return [
        ...neighboringNumbers,
        ...topNumbers,
        ...bottomNumbers
    ];
};

function getNumbersTouchingTopOrBottom(r, c) {
    if (isDigit(grid[r][c])) return [getFullNumber(r, c)];
    const numbers = [];
    if (isDigit(grid[r][c - 1])) numbers.push(getFullNumber(r, c - 1));
    if (isDigit(grid[r][c + 1])) numbers.push(getFullNumber(r, c + 1));
    return numbers;
}

function getFullNumber(r, c) {
    let c1 = c - 1, c2 = c + 1;
    let fullNumber = grid[r][c];
    while (isDigit(grid[r][c1])) {
        fullNumber = grid[r][c1--] + fullNumber;
    }
    while (isDigit(grid[r][c2])) {
        fullNumber += grid[r][c2++];
    }
    return +fullNumber;
}

function part2() {
    let sum = 0;

    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            if (grid[r][c] === '*') {
                const neighboringNumbers = getNeighboringNumbers(r, c);
                if (neighboringNumbers.length === 2) {
                    console.log(neighboringNumbers)
                    sum += (neighboringNumbers[0] * neighboringNumbers[1]);
                }
            }
        }
    }

    return sum;
}

console.log(part2());
// 77509019