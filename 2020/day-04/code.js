const fs = require("fs");
const { join } = require("path");

const getInput = () => fs.readFileSync(join(__dirname, "input.txt"), "utf-8");

const processPassport = (passport) => {
    const parts = [];
    passport.split("\n").forEach((line) => {
        line.split(" ").forEach((section) => {
            parts.push(section.split(":"));
        });
    });
    return parts.reduce((acc, [key, val]) => {
        acc[key] = val;
        return acc;
    }, {});
};

const processInput = (input) => {
    const passports = input.split("\n\n");
    return passports.map(processPassport);
};

const isValidPart1 = (passport) => {
    const size = Object.keys(passport).length;
    return size === 8 || (size === 7 && !passport["cid"]);
};

const passports = processInput(getInput());

const part1 = () => {
    return passports.filter(isValidPart1).length;
};

const isValidByr = (byr) => byr.length === 4 && +byr >= 1920 && +byr <= 2002;
const isValidIyr = (iyr) => iyr.length === 4 && +iyr >= 2010 && +iyr <= 2020;
const isValidEyr = (eyr) => eyr.length === 4 && +eyr >= 2020 && +eyr <= 2030;
const isValidHgt = (hgt) => {
    const valid = /^\d+(cm|in)$/.test(hgt);
    if (!valid) return false;
    const [num] = hgt.match(/\d+/g);
    return hgt.includes("in")
        ? +num >= 59 && +num <= 76
        : +num >= 150 && +num <= 193;
};
const isValidHcl = (hcl) => hcl.length === 7 && /^#\d+$/.test(hcl);
const isValidEcl = (ecl) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl);;
const isValidPid = (pid) => pid.length === 9 && /^\d+$/.test(pid);

const isValidPart2 = (passport) => (
        isValidPart1(passport) &&
        isValidByr(passport["byr"]) &&
        isValidIyr(passport["iyr"]) &&
        isValidEyr(passport["eyr"]) &&
        isValidHgt(passport["hgt"]) &&
        isValidHcl(passport["hcl"]) &&
        isValidEcl(passport["ecl"]) &&
        isValidPid(passport["pid"])
);


const part2 = () => {
    return passports.filter(isValidPart2).length;
};

console.log({ part1: part1(), part2: part2() });
