const fs = require("fs");
const { join } = require("path");

const input = fs.readFileSync(join(__dirname, "input.txt"), "utf-8");
const lines = input.split('\n');
const games = lines.map(processGame);

function processGame(line) {
    const [game, details] = line.split(':');
    const gameNumber = +game.match(/\d+/)[0];
    const subGames = details
        .split(';')
        .flatMap(processSubGame);

    return { gameNumber, subGames };
}

function processSubGame(subGame) {
    const cubeCounts = subGame.split(',');
    const processed = [];
    for (const cubeCount of cubeCounts) {
        const color = cubeCount.match(/[a-z]+/)[0];
        const count = +cubeCount.match(/\d+/)[0];
        processed.push([color, count]);
    }

    return processed;
}

function isGamePossible(subGames) {
    return subGames.every(([color, count]) => {
        if (color === 'red') return count <= 12;
        if (color === 'green') return count <= 13;
        return count <= 14;
    });
}

function part1() {
    return games
        .filter(g => isGamePossible(g.subGames))
        .map(g => g.gameNumber)
        .reduce((a, b) => a + b, 0);
}

console.log(part1());
// 2169

function calculateMinimumRequirementPower(game) {
    const minRedReq = Math.max(
        ...game.subGames
            .filter(g => g[0] === 'red')
            .map(g => g[1])
    );
    const minGreenReq = Math.max(
        ...game.subGames
            .filter(g => g[0] === 'green')
            .map(g => g[1])
    );
    const minBlueReq = Math.max(
        ...game.subGames
            .filter(g => g[0] === 'blue')
            .map(g => g[1])
    );

    return minRedReq * minGreenReq * minBlueReq;
}

function part2() {
    return games
        .map(calculateMinimumRequirementPower)
        .reduce((a, b) => a + b, 0);
}

console.log(part2());
// 60948