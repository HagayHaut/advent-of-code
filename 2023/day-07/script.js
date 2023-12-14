const fs = require("fs");
const { join } = require("path");

const input = fs.readFileSync(join(__dirname, "input.txt"), "utf-8");

const cardRanks = {
    A: 13, 
    K: 12, 
    Q: 11, 
    J: 10, 
    T: 9, 
    '9': 8, 
    '8': 7, 
    '7': 6, 
    '6': 5, 
    '5': 4, 
    '4': 3, 
    '3': 2, 
    '2': 1
};

const cardRanksPart2 = {
    A: 13, 
    K: 12, 
    Q: 11, 
    T: 10, 
    '9': 9, 
    '8': 8, 
    '7': 7, 
    '6': 6, 
    '5': 5, 
    '4': 4, 
    '3': 3, 
    '2': 2,
    J: 1
};

const handRanks = {
    five: 7,
    four: 6,
    full: 5,
    three: 4,
    twoPair: 3,
    pair: 2,
    high: 1
};

function processInput() {
    return input
        .split('\n')
        .map(processCard);
}

function processCard(line) {
    const [hand, bid] = line.split(' ');
    return {
        cards: [...hand],
        bid: +bid,
    };
}

function breakTie(hand1, hand2) {
    let i = 0, j = 0;
    while (i < 4 && hand1[i] === hand2[j]) {
        i++;
        j++;
    }
    
    return cardRanks[hand1[i]] - cardRanks[hand2[j]];
}

function breakTiePart2(hand1, hand2) {
    let i = 0, j = 0;
    while (i < 4 && hand1[i] === hand2[j]) {
        i++;
        j++;
    }
    
    return cardRanksPart2[hand1[i]] - cardRanksPart2[hand2[j]];
}

// using the .sort() method, need a callback 
// method which compares two hands and returns a 
// positive number when the first hand is better,
// and a negative number when the second card is better.
function compareHands(hand1, hand2) {
    const hand1Type = getHandType(hand1);
    const hand2Type = getHandType(hand2);

    if (hand1Type === hand2Type) {
        return breakTie(hand1.cards, hand2.cards);
    }

    return handRanks[hand1Type] - handRanks[hand2Type];
}

function getHandType(hand) {
    if (isFiveOfAKind(hand)) return 'five';
    if (isFourOfAKind(hand)) return 'four';
    if (isFullHouse(hand)) return 'full';
    if (isThreeOfAKind(hand)) return 'three';
    if (isTwoPair(hand)) return 'twoPair';
    if (isPair(hand)) return 'pair';
    return 'high';
}

function isFiveOfAKind(hand) {
    return (new Set(hand.cards)).size === 1;
}

function isFourOfAKind(hand) {
    return getFrequencies(hand).includes(4);
}

function isFullHouse(hand) {
    const frequencies = getFrequencies(hand);
    return frequencies.includes(2) && frequencies.includes(3);
}

function isThreeOfAKind(hand) {
    const frequencies = getFrequencies(hand);
    return !frequencies.includes(2) && frequencies.includes(3);
}

function isTwoPair(hand) {
    const numberOfPairs = getFrequencies(hand)
        .filter(f => f === 2)
        .length;

    return numberOfPairs === 2;
}

function isPair(hand) {
    const numberOfOnes = getFrequencies(hand)
        .filter(f => f === 1)
        .length;

    return numberOfOnes === 3;
}

function getFrequencies(hand) {
    return Object.values(
        hand.reduce((acc, cur) => {
            acc[cur] ??= 0;
            acc[cur]++;
            return acc;
        }, {})
    );
}

function part1() {
    const hands = processInput();
    hands.sort(compareHands);

    const winnings = hands.map((hand, i) => {
        const rank = i + 1;
        return hand.bid * rank;
    });

    return winnings.reduce((a, b) => a + b, 0);
}

// console.log(part1());
// 249726565

function getHandTypePart2(hand) {
    return hand.cards.includes('J')
        ? findBestHandType(hand.cards)
        : getHandType(hand.cards);
}

function compareHandsPart2(hand1, hand2) {
    const hand1Type = getHandTypePart2(hand1);
    const hand2Type = getHandTypePart2(hand2);

    if (hand1Type === hand2Type) {
        return breakTiePart2(hand1.cards, hand2.cards);
    }

    return handRanks[hand1Type] - handRanks[hand2Type];
}

const cards = ['1','2','3','4','5','6','7','8','9','T', 'J', 'Q','K','A'];

function findBestHandType(hand) {
    let currentBestHandType = 'high';

    function backtrack(path, i) {
        if (i === 5) {
            const currentHandType = getHandType(path);
            if (handRanks[currentHandType] > handRanks[currentBestHandType]) {
                currentBestHandType = currentHandType;
            }
            return;
        }
        if (hand[i] === 'J') {
            for (const card of cards) {
                path.push(card);
                backtrack(path, i + 1);
                path.pop();
            }
        }
    }

    backtrack([], 0);

    return currentBestHandType;
}

function part2() {
    const hands = processInput();
    hands.sort(compareHandsPart2);

    const winnings = hands.map((hand, i) => {
        const rank = i + 1;
        return hand.bid * rank;
    });

    return winnings.reduce((a, b) => a + b, 0);
}

console.log(part2());