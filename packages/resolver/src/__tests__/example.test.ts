import { ResolveOption } from "@code-dependency/interfaces";
import * as path from "path";
import { resolve } from "../resolve";
import * as Example from "./example.data";

const EXAMPLE_FILE = path.join(Example.SOURCE_DIR_PATH, "index.ts");
const EXAMPLE_FILE_DIR = path.dirname(EXAMPLE_FILE);

describe("#resolve", () => {
  let option: ResolveOption;

  beforeAll(() => {
    option = {
      symlinks: false,
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    };
  });

  test("root directory path", () => {
    Example.RootDirTestData.forEach(testData => {
      const result = resolve({ moduleName: testData.moduleName, moduleSystem: "cjs" }, Example.SOURCE_DIR_PATH, EXAMPLE_FILE_DIR, option);
      expect(result.coreModule).toBe(testData.result.coreModule);
      expect(result.couldNotResolve).toBe(testData.result.couldNotResolve);
      expect(result.resolved).toBe(testData.result.resolved);
    });
  });
});
