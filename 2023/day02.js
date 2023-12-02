const prepped = input
  .split("\n")
  .map((game) => game.split(":"))
  .map((game) => {
    return {
      game: game[0].match(/\d+/g)[0],
      sets: game[1]
        .trim()
        .split("; ")
        .map((set) => {
          const blues = [...set.matchAll(/(\d+) blue/g)][0];
          const greens = [...set.matchAll(/(\d+) green/g)][0];
          const reds = [...set.matchAll(/(\d+) red/g)][0];
          return {
            blues: blues ? parseInt(blues[1]) : 0,
            greens: greens ? parseInt(greens[1]) : 0,
            reds: reds ? parseInt(reds[1]) : 0,
          };
        }),
    };
  });

// part 1
prepped
  .filter((game) =>
    game.sets.every(
      (set) => set.reds <= 12 && set.greens <= 13 && set.blues <= 14
    )
  )
  .reduce((a, b) => a + b.game, 0);

// part 2
prepped
  .map((game) =>
    game.sets.reduce(
      (a, b) => ({
        reds: Math.max(a.reds, b.reds),
        greens: Math.max(a.greens, b.greens),
        blues: Math.max(a.blues, b.blues),
      }),
      { reds: 0, greens: 0, blues: 0 }
    )
  )
  .map((maxes) => maxes.reds * maxes.blues * maxes.greens)
  .reduce((a, b) => a + b);
