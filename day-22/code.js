const fs = require("fs");
const { join } = require("path");
const { listenerCount } = require("process");

const getInput = () => fs.readFileSync(join(__dirname, "input.txt"), "utf8");

const processCommandInput = (commandInput) => {
    const firstMove = +commandInput.slice(0, 2);
    const commandStrings = commandInput.match(/(R|L)\d+/g);
    const commands = commandStrings.map((cStr) => {
        const command = cStr.match(/(\d+|R|L)/g);
        command[1] = +command[1];
        return command;
    });

    return { firstMove, commands };
};

const processCubeInput = (cubeInput) => {
    const rowStrings = cubeInput.split("\n");
    return rowStrings.map((rowString) => rowString.split(""));
};

const printCube = (cube) => {
    console.log(cube.map((row) => row.join("")).join("\n"));
};

const processInput = (input) => {
    const [cubeInput, commandInput] = input.split("\n\n");
    const { firstMove, commands } = processCommandInput(commandInput);
    const cube = processCubeInput(cubeInput);
    return { cube, firstMove, commands };
};

const getNextDirection = (currDir, turnDir) => {
    if (currDir === "L") {
        return turnDir === "L" ? "D" : "U";
    }
    if (currDir === "R") {
        return turnDir === "L" ? "U" : "D";
    }
    if (currDir === "U") {
        return turnDir === "L" ? "L" : "R";
    }
    return turnDir === "L" ? "R" : "L";
};

const directions = {
    L: [0, -1],
    R: [0, 1],
    U: [-1, 0],
    D: [1, 0],
};

const rowWrapPositions = [];
const colWrapPositions = [];

const getWraparoundPos = (r, c, dirKey) => {};

const processed = processInput(getInput());
const { cube, firstMove, commands } = processed;

// top: first 50 start at row 100, rest at 0
// left: first 100 start at col 50, rest 0
// bottom: first 50 start length - 1, rest at length - 51
// right: first

console.log(cube[cube.length - 51]);
