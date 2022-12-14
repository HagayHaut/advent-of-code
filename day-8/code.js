const fs = require("fs");
const { join } = require("path");

const processInput = (s) => {
    return s.split("\n").map((line) => line.split("").map(Number));
};

const nextGreaterRight = (arr) => {
    const res = Array(arr.length).fill(-1);
    const stack = [];
    arr.forEach((n, i) => {
        while (stack.length && arr[stack.at(-1)] < n) {
            const index = stack.pop();
            res[index] = n;
        }
        stack.push(i);
    });
    return res;
};

const nextGreaterLeft = (arr) => {
    const res = Array(arr.length).fill(-1);
    const stack = [];
    arr.reverse().forEach((n, i) => {
        while (stack.length && arr[stack.at(-1)] < n) {
            const index = stack.pop();
            res[index] = n;
        }
        stack.push(i);
    });

    return res;
};

const transpose = (grid) => {
    const transposed = [];
    const width = grid[0].length;
    const height = grid.length;
    for (let c = 0; c < width; c++) {
        transposed.push(
            Array(height)
                .fill()
                .map((_, r) => grid[r][c])
        );
    }
    return transposed;
};

const part1 = () => {
    const fileContents = fs.readFileSync(join(__dirname, "input.txt"), "utf-8");
    const grid = processInput(fileContents);
    const transposed = transpose(grid);

    const blockingRight = grid.map(nextGreaterRight);
    const blockingLeft = grid.map(nextGreaterLeft);
    const blockingTop = transpose(transposed.map(nextGreaterLeft));
    const blockingBottom = transpose(transposed.map(nextGreaterRight));

    const visibles = {};

    grid.forEach((row, r) => {
        row.forEach((_, c) => {
            if (
                [
                    blockingLeft[r][c],
                    blockingRight[r][c],
                    blockingBottom[r][c],
                    blockingTop[r][c],
                ].includes(-1)
            ) {
                visibles[`${r}-${c}`] = grid[r][c];
            }
        });
    });

    return Object.keys(visibles).length;
};

console.log(part1());
