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

function getCardWinningsPart1(card) {
    let winningNumberCount = getWinningNumberCount(card);
    if (!winningNumberCount) return 0;
    let winnings = 1;
    while (winningNumberCount-- > 1) {
        winnings *= 2;
    }
    return winnings;
}

function getWinningNumberCount(card) {
    return card.guessedNumbers
        .filter(n => card.winningNumbers.has(n))
        .length;
}

function part1() {
    return cards
        .map(getCardWinningsPart1)
        .reduce((a, b) => a + b, 0);
}

// console.log(part1());
// 18619

function part2() {
    const winCountPerCard = cards.map(getWinningNumberCount);
    const map = {};

    winCountPerCard.forEach((winCount, i) => {
        map[i] ??= 0;
        map[i]++;
        for (let j = 0; j < winCount; j++) {
            map[i + 1 + j] ??= 0;
            map[i + 1 + j] += (map[i] ?? 0);
        }
    });

    return Object
        .values(map)
        .reduce((a, b) => a + b, 0);
}

console.log(part2());
// 8063216