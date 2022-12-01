fn main() {
    let parsed_file = include_str!("../data.txt")
        .split("\n\n")
        .map(|cals| cals.lines().map(|cal| cal.parse::<u32>().unwrap()).sum::<u32>()).collect::<Vec<u32>>();

    println!("Part 1: {}", parsed_file.iter().max().unwrap());

    let mut sorted = parsed_file.to_vec();
    sorted.sort();
    let top3: u32 = sorted.iter().rev().take(3).sum();

    println!("Part 2: {}", top3);
}
