const fs = require("fs");
const { join } = require("path");

const fileContents = fs.readFileSync(join(__dirname, "input.txt"), "utf-8");

const lines = fileContents.split("\n");

const blocks = `\n${fileContents}`
    .split("\n$ ")
    .slice(1)
    .map((block) => block.split("\n"));

const path = [];

const dirSizes = {}; // maps path to sizes
const children = {}; // maps path to children

const parse = (block) => {
    const command = block[0];
    const outputs = block.slice(1);
    const commandParts = command.split(" ");
    const operation = commandParts[0];

    if (operation === "cd") {
        return commandParts[1] === ".."
            ? path.pop()
            : path.push(commandParts[1]);
    }

    const absolutePath = path.join("/");
    // default values for maps
    dirSizes[absolutePath] ??= 0;
    children[absolutePath] ??= [];

    const sizes = [];

    outputs.forEach((line) => {
        if (!line.startsWith("dir")) sizes.push(+line.split(" ")[0]);
        else
            children[absolutePath].push(
                `${absolutePath}/${line.split(" ")[0]}`
            );
    });

    dirSizes[absolutePath] = sizes.reduce((a, b) => a + b, 0);
};

blocks.forEach(parse);

const dfs = (absolutePath) => {
    children[absolutePath] ??= [];
    let size = dirSizes[absolutePath];
    children[absolutePath].forEach((child) => (size += dfs(child)));
    return size;
};

let pt1Result = 0;

for (const absolutePath of Object.keys(dirSizes)) {
    const currSize = dfs(absolutePath);
    if (currSize <= 100_000) pt1Result += currSize;
}

console.log(pt1Result);
