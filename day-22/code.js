const fs = require("fs");
const { join } = require("path");

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

const getWraparoundPos = (r, c, dirKey) => {};

const processed = processInput(getInput());
const { cube, firstMove, commands } = processed;
