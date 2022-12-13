struct Additionals {
    A: u32;
    B: u32;
    C: u32;
}

struct ScoringMatrix {
    value: u32;
    additionals: Additionals;
}

fn main() {
    const PART1 = ScoringMatrix {
          X: { value: 1, additionals: { A: 3, B: 0, C: 6 } },
        Y: {   value: 2, additionals: { A: 6, B: 3, C: 0 } },
  Z: { value: 3, additionals: { A: 0, B: 6, C: 3 } },

    }

    let parsed_file = include_str!("../data.txt")
        .lines()
        .map(|moves| moves.split(" "));
    
    println!("{:#?}", parsed_file);
}
