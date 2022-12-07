const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const tidyInput = input
  .split("$ ")
  .filter((cmd) => cmd.length)
  .map((cmd) => cmd.split("\n").filter((line) => line.length));

const tree = tidyInput.reduce(
  (acc, cmdBlock) => {
    const [cmd, ...result] = cmdBlock;

    if (cmd == "ls") {
      const fileSize = result
        .filter((item) => !item.startsWith("dir"))
        .reduce((acc, file) => parseInt(file.split(" ")[0], 10) + acc, 0);

      const newPath = { ...acc };
      const pathStr = acc.position.join("/");

      const childDirs = result
        .filter((item) => item.startsWith("dir"))
        .map((dir) => dir.split(" ")[1]);

      newPath.paths[pathStr] = { fileSize, childDirs };

      return newPath;
    }

    const [_, dir] = cmd.split(" ");

    if (dir === "/") return { ...acc, position: [] };
    if (dir === "..")
      return {
        ...acc,
        position: acc.position.slice(0, acc.position.length - 1),
      };
    return { ...acc, position: acc.position.concat(dir) };
  },
  { paths: {}, position: [] }
);

const depthFirst = Object.keys(tree.paths)
  .sort((a, b) => {
    const aLevels = a.split("/").length;
    const bLevels = b.split("/").length;

    return aLevels == bLevels ? b.length - a.length : bLevels - aLevels;
  })
  .reduce((acc, path) => {
    acc[path].fileSize += acc[path].childDirs.reduce(
      (total, dir) =>
        acc[path.length ? path + "/" + dir : dir].fileSize + total,
      0
    );
    return acc;
  }, tree.paths);

const fileSizes = Object.values(depthFirst)
  .map((p) => p.fileSize)
  .sort((a, b) => b - a);

const part1 = fileSizes.filter((i) => i <= 100000).reduce((a, b) => a + b, 0);

const unused = 70000000 - fileSizes[0];
const requiredForUpdate = 30000000 - unused;
const part2 = fileSizes.filter((i) => i > requiredForUpdate).pop();
