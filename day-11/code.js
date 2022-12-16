const fs = require("fs");
const { join } = require("path");

const getInput = () => fs.readFileSync(join(__dirname, "input.txt"), "utf8");

const processMonkey = (unprocessed) => {
    const id = +unprocessed[0][7];
    const items = unprocessed[1].slice(18).split(", ").map(Number);
    const operation = unprocessed[2].slice(19).split(" ");
    const divisibleBy = +unprocessed[3].slice(21);
    const ifTrue = +unprocessed[4].slice(29);
    const ifFalse = +unprocessed[5].slice(30);
    return { id, items, operation, divisibleBy, ifTrue, ifFalse };
};

const monkeys = getInput()
    .split("\n\n")
    .map((unprocessed) => unprocessed.split("\n"))
    .map(processMonkey);

console.log(monkeys);
