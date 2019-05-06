import { sourceMap } from "@code-dependency/test-project";
import { getTsDependencies } from "../index";

describe("index.ts", () => {
  test("getTsDependencies#index", () => {
    const result = getTsDependencies(sourceMap.src.index);
    expect(result.length).not.toBe(0);
  });

  test("getTsDependencies#components", () => {
    const result = getTsDependencies(sourceMap.src.components.index);
    expect(result.length).toBe(1);
  });

  test.skip("getTsDependencies#utils", () => {
    const result = getTsDependencies(sourceMap.src.utils.index);
    expect(result.length).not.toBe(0);
  });
});
