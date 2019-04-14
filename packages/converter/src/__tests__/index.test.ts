import * as Types from "@code-dependency/interfaces";
import { converter } from "../index";
import { makeTestData } from "./utils";

describe("#converter", () => {
  const rootSource = "src/index.ts";
  const dependencies: Types.Dependency[] = [
    makeTestData("src/a.ts", "./a"),
    makeTestData("src/b.ts", "./b"),
    makeTestData("src/c.ts", "./c"),
    makeTestData("src/d.ts", "./d"),
    makeTestData("src/hoge/a.ts", "./hoge/a"),
    makeTestData("src/hoge/b.ts", "./hoge/b"),
    makeTestData("src/hoge/c.ts", "./hoge/c"),
    makeTestData("src/hoge/d.ts", "./hoge/d"),
  ];
  const inputDependency: Types.InputSourceDependency = {
    source: rootSource,
    dependencies,
  };
  test("#1", () => {
    const root = converter([inputDependency])(rootSource);
    expect(root.dependencies.length).toBe(dependencies.length);
    expect(root.children.length).toBe(0);
  });
});
