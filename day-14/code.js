const fs = require("fs");
const { join } = require("path");

const getInput = () => fs.readFileSync(join(__dirname, "input.txt"), "utf8");

const processInput = (unprocessed) => {
    const inputLines = unprocessed.split("\n");
    // remove typo `s` from input
    inputLines[130] = inputLines[130].slice(0, 69) + inputLines[130].slice(70);

    const coordinates = inputLines.map((line) => {
        return line.split(" -> ").map((coor) => {
            const [bigX, y] = coor.split(",").map(Number);
            return [bigX - 400, y];
        });
    });

    let [minX, minY, maxX, maxY] = [Infinity, Infinity, 0, 0];

    coordinates.forEach((line) => {
        line.forEach(([x, y]) => {
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
        });
    });

    return { coordinates, minX, maxX, minY, maxY };
};

const inAbyss = ([x, y], minX, maxX, minY, maxY) => {
    return x <= minX || x >= maxX || y >= maxY;
};

const getBoardBeforeScan = (minX, maxX, minY, maxY) => {
    return Array(maxY + 10)
        .fill()
        .map((_, y) => {
            return Array(maxX + 10)
                .fill()
                .map((_, x) => {
                    return x === 100 && y === 0
                        ? "s"
                        : inAbyss([x, y], minX, maxX, minY, maxY)
                        ? ","
                        : ".";
                });
        });
};

const printBoard = (board) => {
    console.log(board.map((row) => row.join("")).join("\n"));
};

const scanWall = (board, x1, y1, x2, y2) => {
    if (x1 === x2) {
        const [minY, maxY] = [Math.min(y1, y2), Math.max(y1, y2)];
        for (let y = minY; y <= maxY; y++) {
            board[x1][y] = "#";
        }
    } else {
        const [minX, maxX] = [Math.min(x1, x2), Math.max(x1, x2)];
        for (let x = minX; x <= maxX; x++) {
            board[x][y1] = "#";
        }
    }
};

const unprocessed = getInput();
const { coordinates, minX, maxX, minY, maxY } = processInput(unprocessed);

const getScannedBoard = () => {
    const board = getBoardBeforeScan(minX, maxX + 20, minY, maxY);
    coordinates.forEach((inputLine) => {
        for (let i = 0; i < inputLine.length - 1; i++) {
            const [x1, y1] = inputLine[i];
            const [x2, y2] = inputLine[i + 1];
            scanWall(board, x1, y1, x2, y2);
        }
    });
    return board;
};

const board = getScannedBoard();
const directions = [
    [0, 1],
    [-1, 1],
    [1, 1],
];

const isBlocked = (x, y) => ["#", "O"].includes(board[x][y]);

const sandIsStuck = (x, y) =>
    directions.every(([dx, dy]) => isBlocked(x + dx, y + dy));

const moveSandOnce = (x, y) => {
    for (const [dx, dy] of directions) {
        const [xx, yy] = [x + dx, y + dy];
        if (!isBlocked(xx, yy)) {
            board[xx][yy] = "O";
            board[x][y] = ".";
            return [dx, dy];
        }
    }
    return [0, 0];
};

const dropSand = () => {
    let [x, y] = [1, 100];
    board[x][y] = "O";
    while (!sandIsStuck(x, y)) {
        const [dx, dy] = moveSandOnce(x, y);
        x += dx;
        y += dy;
    }
};

// dropSand();

printBoard(board);
