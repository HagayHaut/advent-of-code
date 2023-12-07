const fs = require("fs");
const { join } = require("path");

const input = fs.readFileSync(join(__dirname, "input.txt"), "utf-8");
const [timeInput, distanceInput] = input.split('\n');
const raceTimes = [...timeInput.match(/\d+/g)].map(Number);
const raceDistances = [...distanceInput.match(/\d+/g)].map(Number);

function calculateDistances(raceTime) {
    const distances = [];
    for (let speed = 0; speed < raceTime; speed++) {
        const millisecondsLeft = raceTime - speed;
        distances.push(millisecondsLeft * speed);
    }
    return distances;
}

function part1() {
    const numberOfWaysToWin = raceTimes.map((raceTime, i) => {
        const raceDistance = raceDistances[i];
        const possibleDistances = calculateDistances(raceTime);
        return possibleDistances.filter(d => d > raceDistance).length;
    });

    return numberOfWaysToWin.reduce((a, b) => a * b, 1);
}

// console.log(part1());
// 1731600

function part2() {
    const raceTime = +raceTimes.map(String).join('');
    const distanceToBeat = +raceDistances.map(String).join('');
    const possibleDistances = calculateDistances(raceTime);
    return possibleDistances.filter(d => d > distanceToBeat).length;
}

// console.log(part2());
// 40087680