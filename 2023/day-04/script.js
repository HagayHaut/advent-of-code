const fs = require("fs");
const { join } = require("path");

const input = fs.readFileSync(join(__dirname, "input.txt"), "utf-8");
const cards = processInput();

function processInput() {
    return input
        .split('\n')
        .map(processCard);
}

function processCard(line) {
    const [card, numbers] = line.split(':');
    const cardNumber = +card.match(/\d+/)[0];
    const [winningInput, guessedInput] = numbers.split('|');
    const winningNumbers = new Set([...winningInput.match(/\d+/g)].map(Number));
    const guessedNumbers = [...guessedInput.match(/\d+/g).map(Number)];
    return { cardNumber, winningNumbers, guessedNumbers };
}

function getCardWinnings(card) {
    let winningNumberCount = card.guessedNumbers
        .filter(n => card.winningNumbers.has(n))
        .length;
    if (!winningNumberCount) return 0;
    let winnings = 1;
    while (winningNumberCount-- > 1) {
        winnings *= 2;
    }
    return winnings;
}

function part1() {
    return cards
        .map(getCardWinnings)
        .reduce((a, b) => a + b, 0);
}

// console.log(part1());
// 18619