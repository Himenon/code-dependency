import * as path from "path";
import { getTsDependencies } from "../index";

const EXAMPLE_PROJECT_PATH = path.join(__dirname, "../../../resolver/example/src");
const INDEX_PATH = path.join(EXAMPLE_PROJECT_PATH, "index.ts");
const UTILS_PATH = path.join(EXAMPLE_PROJECT_PATH, "utils/index.ts");
const COMPONENTS_PATH = path.join(EXAMPLE_PROJECT_PATH, "components/index.ts");

describe("index.ts", () => {
  test("getTsDependencies#index", () => {
    const result = getTsDependencies(INDEX_PATH);
    expect(result.length).not.toBe(0);
  });

  test("getTsDependencies#components", () => {
    const result = getTsDependencies(COMPONENTS_PATH);
    expect(result.length).toBe(1);
  });

  test("getTsDependencies#utils", () => {
    const result = getTsDependencies(UTILS_PATH);
    console.log(result);
    expect(result.length).not.toBe(0);
  });
});
