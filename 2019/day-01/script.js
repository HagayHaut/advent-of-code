const fs = require('fs');
const { join } = require('path');

const input = fs.readFileSync(join(__dirname, 'input.txt'), 'utf-8');
const moduleMasses = input.split('\n').map(Number);

function calculateFuelReqForMass(mass) {
    return ~~(mass / 3) - 2;
}

const part1 = moduleMasses.reduce((sum, mass) => {
    return sum + calculateFuelReqForMass(mass)
}, 0);
console.log(part1);
// part1: 3331523

function calculatePart2FuelRequirement(mass) {
    let fuelForMass = calculateFuelReqForMass(mass);
    let fuelForFuel = Math.max(0, calculateFuelReqForMass(fuelForMass));
    fuelForMass += fuelForFuel;
    while (fuelForFuel) {
        fuelForFuel = Math.max(0, calculateFuelReqForMass(fuelForFuel));
        fuelForMass += fuelForFuel;
    }
    return fuelForMass;
}

const part2 = moduleMasses.reduce((sum, mass) => {
    return sum + calculatePart2FuelRequirement(mass)
}, 0);
console.log(part2);
// part2: 4994396