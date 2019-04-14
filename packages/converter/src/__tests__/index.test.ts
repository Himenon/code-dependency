import * as Types from "@code-dependency/interfaces";
import { converter } from "../index";
import { makeTestData } from "./testData";

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
  const rootSource2 = "src/a.ts";
  const dependencies2: Types.Dependency[] = [
    makeTestData("src/foo/a.ts", "./foo/a"),
    makeTestData("src/foo/b.ts", "./foo/b"),
    makeTestData("src/foo/c.ts", "./foo/c"),
    makeTestData("src/foo/d.ts", "./foo/d"),
  ];
  const rootSource3 = "src/foo/a.ts";
  const dependencies3: Types.Dependency[] = [
    makeTestData("src/bar/a.ts", "./bar/a"),
    makeTestData("src/bar/b.ts", "./bar/b"),
    makeTestData("src/bar/c.ts", "./bar/c"),
    makeTestData("src/bar/d.ts", "./bar/d"),
  ];
  const inputDependency: Types.InputSourceDependency = {
    source: rootSource,
    dependencies,
  };
  const inputDependency2: Types.InputSourceDependency = {
    source: rootSource2,
    dependencies: dependencies2,
  };
  const inputDependency3: Types.InputSourceDependency = {
    source: rootSource3,
    dependencies: dependencies3,
  };
  test("Level 1", () => {
    const root = converter(rootSource, [inputDependency]);
    expect(root.children.length).toBe(dependencies.length);
  });
  test("Level 2", () => {
    const root = converter(rootSource, [inputDependency, inputDependency2]);
    expect(root.children.length).toBe(dependencies.length);
  });
  test("Level 3", () => {
    const root = converter(rootSource, [inputDependency, inputDependency2, inputDependency3]);
    expect(root.children.length).toBe(dependencies.length);
    expect(root.children[0].children.length).toBe(dependencies2.length);
    expect(root.children[0].children[0].children.length).toBe(dependencies3.length);
  });
});
