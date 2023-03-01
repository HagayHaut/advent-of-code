const fs = require("fs");
const { join } = require("path");

const getInput = async () => {
    return await fs.readFileSync(join(__dirname, "input.txt"), "utf8");
};

const part1 = async () => {
    const input = await getInput();
    const pairs = input.split("\n\n").map((pair) => pair.split("\n"));

    console.log(pairs[134]);
};

part1();
