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

const increaseWorry = (worry, operation) => {
    let [_, op, val] = operation;
    val = val === "old" ? worry : +val;
    return op === "+" ? worry + val : worry * val;
};

const decreaseWorry = (worry) => ~~(worry / 3);

const part1 = () => {
    const monkeyInspections = Array(8).fill(0);

    for (let i = 0; i < 20; i++) {
        monkeys.forEach(
            ({ id, items, operation, divisibleBy, ifTrue, ifFalse }) => {
                items.forEach((item) => {
                    let worry = decreaseWorry(increaseWorry(item, operation));
                    if (!(worry % divisibleBy)) {
                        monkeys[ifTrue].items.push(worry);
                    } else {
                        monkeys[ifFalse].items.push(worry);
                    }
                    items.shift();
                    monkeyInspections[id]++;
                });
            }
        );
    }

    const pt1Result = monkeyInspections
        .sort((a, z) => a - z)
        .slice(-2)
        .reduce((a, b) => a * b, 1);

    console.log(pt1Result);
};

part1();
