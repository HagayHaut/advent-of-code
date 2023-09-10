const input = '156218-652527';
const [min, max] = input.split('-').map(Number);

function hasRepeatingDigit(n) {
    const asString = `${n}`;
    for (let i = 1; i < asString.length; i++) {
        if (asString[i] === asString[i - 1]) {
            return true;
        }
    }
    return false;
}

function isNonDecreasing(n) {
    const asString = `${n}`;
    for (let i = 1; i < asString.length; i++) {
        if (+asString[i] < +asString[i - 1]) {
            return false;
        }
    }
    return true;
}

let part1 = 0;
for (let i = min; i <= max; i++) {
    if (isNonDecreasing(i) && hasRepeatingDigit(i)) {
        part1++;
    }
}
console.log(part1);
// part1: 1694

function hasUngroupedRepeatingDigits(n) {
    const asString = `${n}`;
    const matches = [...asString.matchAll(/(\d)\1/g)].map(x => x[0]);
    const uniqueMathes = [...new Set(matches)];
    const atLeastOneMatchNotInGroup = uniqueMathes.some(section => {
        // sections of exactly 2 will have the same
        // first and last index of section
        return asString.indexOf(section) === asString.lastIndexOf(section);
    })
    return atLeastOneMatchNotInGroup;
}

let part2 = 0;
for (let i = min; i <= max; i++) {
    if (isNonDecreasing(i) && hasUngroupedRepeatingDigits(i)) {
        part2++;
    }
}
console.log(part2);
// part2: 1148