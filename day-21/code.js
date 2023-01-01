const fs = require("fs");
const { join } = require("path");

const getInput = () => {
    return fs.readFileSync(join(__dirname, "input.txt"), "utf8");
};

const processInput = (input) => {
    const lines = input.split("\n");
    const defMonkeys = new Map(),
        undefMonkeys = new Map();

    let rootKey1, rootKey2;
    for (const line of lines) {
        const [key, value] = line.split(":");
        if (!isNaN(+value)) {
            // next line is for part2 only
            if (key === "humn") continue;
            defMonkeys.set(key, +value);
        } else {
            // if condition for part2 only
            if (key === "root") {
                const [key1, , key2] = value.slice(1).split(" ");
                rootKey1 = key1;
                rootKey2 = key2;
                continue;
            }
            undefMonkeys.set(key, value.slice(1).split(" "));
        }
    }
    return { defMonkeys, undefMonkeys, rootKey1, rootKey2 };
};

const doMath = (val1, op, val2) => {
    switch (op) {
        case "+":
            return val1 + val2;
        case "-":
            return val1 - val2;
        case "*":
            return val1 * val2;
        case "/":
            return val1 / val2;
    }
};

const onePass = (defMonkeys, undefMonkeys) => {
    const undefKeys = undefMonkeys.keys();
    for (const key of undefKeys) {
        const [key1, op, key2] = undefMonkeys.get(key);
        if (defMonkeys.has(key1) && defMonkeys.has(key2)) {
            defMonkeys.set(
                key,
                doMath(defMonkeys.get(key1), op, defMonkeys.get(key2))
            );
            undefMonkeys.delete(key);
        }
    }
};

const part1 = () => {
    const { defMonkeys, undefMonkeys } = processInput(getInput());
    while (undefMonkeys.size) {
        onePass(defMonkeys, undefMonkeys);
    }
    console.log(defMonkeys.get("root"));
};

// part1(); // answer: 62386792426088

const trySolve = (defMonkeys, undefMonkeys) => {
    while (undefMonkeys.size) {
        onePass(defMonkeys, undefMonkeys);
    }
};

const isSolved = (defMonkeys, rootKey1, rootKey2) => {
    return defMonkeys.get(rootKey1) === defMonkeys.get(rootKey2);
};

const part2 = () => {
    const { defMonkeys, undefMonkeys, rootKey1, rootKey2 } = processInput(
        getInput()
    );
    let humanNum = 0;
    while (true) {
        const defCopy = new Map(defMonkeys);
        const undefCopy = new Map(undefMonkeys);

        defCopy.set("humn", humanNum);
        trySolve(defCopy, undefCopy);
        if (isSolved(defCopy, rootKey1, rootKey2)) {
            break;
        }
        humanNum++;
    }
    console.log(humanNum);
};

part2();
