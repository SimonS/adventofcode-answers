hands = input.split("\n").map((line) => line.split(" "));

getRank = (hand) => {
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

getHighHand = (hand1, hand2) => {
  const cards = {
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
  };

  for (let i = 0; i < hand1.length; i++) {
    if (hand1[i] !== hand2[i]) return cards[hand1[i]] - cards[hand2[i]];
  }
  return 0;
};

compareHands = (arr1, arr2) => {
  const res = getRank(arr1[0]) - getRank(arr2[0]);
  if (res !== 0) return res;
  return getHighHand(arr1[0], arr2[0]);
};

hands
  .toSorted(compareHands)
  .reduce((total, [_, bid], i) => (i + 1) * bid + total, 0);
