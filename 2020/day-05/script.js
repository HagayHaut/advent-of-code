const fs = require("fs");
const { join } = require("path");

const getInput = () => fs.readFileSync(join(__dirname, "input.txt"), "utf-8");
const processInput = (input = getInput()) => input.split('\n');

const boardingPasses = processInput();

const getRow = (pass) => {
    let low = 0, high = 127;

    for (const c of pass.slice(0, 7)) {
        const mid = Math.ceil((low + high) / 2);
        if (c === 'F') high = mid - 1;
        else low = mid;
    }

    return low;
}

const getCol = (pass) => {
    let low = 0, high = 7;

    for (const c of pass.slice(7)) {
        const mid = Math.ceil((low + high) / 2);
        if (c === 'L') high = mid - 1;
        else low = mid;
    }
    return low;
}

const getSeatID = (pass) => {
    return getRow(pass) * 8 + getCol(pass);
}



const part1 = () => {
    return Math.max(...boardingPasses.map(getSeatID));
}

const part2 = () => {
    const plane = Array(911).fill().map(_ => false);
        

    const takenSeats = boardingPasses.map(getSeatID);
    
    takenSeats.forEach(id => plane[id] = true);

    console.log(plane)
}

// part1: 911

part2();

// console.log({ part1: part1(), })