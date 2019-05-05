import * as path from "path";

const filterDot = (s: string) => s !== ".";
const filterEmpty = (s: string) => s.length > 0;
const reduceToLevel = (acc: number, s: string) => (s === ".." ? acc - 1 : acc + 1);

export const depth = (p: string) =>
  p === ""
    ? 0
    : path
        .normalize(p)
        .split(path.sep)
        .filter(filterDot)
        .filter(filterEmpty)
        .reduce(reduceToLevel, 0);
