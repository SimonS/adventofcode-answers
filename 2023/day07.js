const hands = input.split("\n").map((line) => line.split(" "));

const getRank = (hand) => {
  const sortHand = (hand) => hand.split("").sort().join("");
  const isFiveOfAKind = (hand) => /(.)\1{4}/.test(hand);
  const isFourOfAKind = (hand) => /(.)\1{3}/.test(sortHand(hand));
  const isFullHouse = (hand) => new Set(hand).size === 2;
  const isThreeOfAKind = (hand) => /(.)\1{2}/.test(sortHand(hand));
  const isTwoPair = (hand) => new Set(hand).size === 3;
  const isOnePair = (hand) => new Set(hand).size === 4;

  const tests = [
    isFiveOfAKind,
    isFourOfAKind,
    isFullHouse,
    isThreeOfAKind,
    isTwoPair,
    isOnePair,
  ];

  const maxRank = 6;
  for (let i = 0; i < tests.length; i++) {
    if (tests[i](hand)) return maxRank - i;
  }
  return 0;
};

const getHighHand = (hand1, hand2, cards) => {
  for (let i = 0; i < hand1.length; i++) {
    if (hand1[i] !== hand2[i]) return cards[hand1[i]] - cards[hand2[i]];
  }
  return 0;
};

const createCompareHands = (compareFn, cardValues) => (arr1, arr2) => {
  const res = compareFn(arr1[0]) - compareFn(arr2[0]);
  if (res !== 0) return res;
  return getHighHand(arr1[0], arr2[0], cardValues);
};

const compareHands = createCompareHands(getRank, {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
});

console.log(
  "part 1",
  hands
    .toSorted(compareHands)
    .reduce((total, [_, bid], i) => (i + 1) * bid + total, 0)
);

const getRankWithJokers = (hand) => {
  // this is so fucking horrible. My brain fart got out of hand, and what
  // started as a little transposition resulted in a lot more edge cases than
  // probably just doing this properly
  let rank = getRank(hand);
  const jokers = (hand.match(/J/g) || []).length;

  if (jokers === 0 || jokers === 5) return rank;

  hand = hand.replaceAll("J", "");

  // this is the really nasty bit
  const filler = ["B", "C", "D", "E"];
  for (let i = 0; i < jokers; i++) {
    hand += filler[i];
  }
  rank = getRank(hand);

  // and this is the original "elegant" kernel, I was working from
  const transpose = { 0: 1, 1: 3, 2: 4, 3: 5, 4: 5, 5: 6 };

  for (let i = 0; i < jokers; i++) {
    rank = transpose[rank];
  }

  return rank;
};

const compareHandsWithJokers = createCompareHands(getRankWithJokers, {
  J: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  Q: 12,
  K: 13,
  A: 14,
});

console.log(
  "part 2",
  hands
    .toSorted(compareHandsWithJokers)
    .reduce((total, [_, bid], i) => (i + 1) * bid + total, 0)
);
