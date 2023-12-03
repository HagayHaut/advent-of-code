const fs = require("fs");
const { join } = require("path");

const input = fs.readFileSync(join(__dirname, "input.txt"), "utf-8");
const lines = input.split('\n');

function addDigits(digits) {
    return +(digits[0] + digits.at(-1));
}

function addDigitsPart1(line){
    return addDigits([...line].filter(c => /\d/.test(c)));
}

function solve(calibrationValues) {
    return calibrationValues.reduce((a, b) => a + b, 0);
}

const numberMap = {
    one: '1', 
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
};

console.log(solve(lines.map(addDigitsPart1)));
// 55621

function addDigitsPart2(line) {
    const regex = /(?=(\d|zero|one|two|three|four|five|six|seven|eight|nine))/g;
    const matches = line.matchAll(regex);
    const digits = [];
    for (match of matches) {
        digits.push(numberMap[match[1]] ?? match[1])
    }
    return addDigits(digits);
}

console.log(solve(lines.map(addDigitsPart2)));
// 53592