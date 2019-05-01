import { ResolveOption } from "@code-dependency/interfaces";
import * as path from "path";
import { resolve } from "../resolve";
import * as Example from "./example.data";

const EXAMPLE_FILE = path.join(Example.SOURCE_DIR_PATH, "index.ts");
const EXAMPLE_FILE_DIR = path.dirname(EXAMPLE_FILE);

const CIRCLE_DEPS_FILE = path.join(Example.SOURCE_DIR_PATH, "circleDeps/index.ts");
const CIRCLE_DEPS_FILE_DIR = path.dirname(CIRCLE_DEPS_FILE);

describe("#resolve", () => {
  let option: ResolveOption;

  beforeAll(() => {
    option = {
      symlinks: false,
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    };
  });

  test("Walk into example/src", () => {
    Example.RootDirTestData.forEach(testData => {
      const result = resolve({ moduleName: testData.moduleName, moduleSystem: "cjs" }, Example.SOURCE_DIR_PATH, EXAMPLE_FILE_DIR, option);
      const resolvedAbsolutePath = result.resolved;
      expect(result.coreModule).toBe(testData.result.coreModule);
      expect(result.couldNotResolve).toBe(testData.result.couldNotResolve);
      expect(resolvedAbsolutePath).toBe(testData.result.resolved);
    });
  });

  test("Walk into example/src/circleDeps", () => {
    Example.CircleDepsDirTestData.forEach(testData => {
      const result = resolve(
        { moduleName: testData.moduleName, moduleSystem: "cjs" },
        Example.SOURCE_DIR_PATH,
        CIRCLE_DEPS_FILE_DIR,
        option,
      );
      const resolvedAbsolutePath = result.resolved;
      expect(result.coreModule).toBe(testData.result.coreModule);
      expect(result.couldNotResolve).toBe(testData.result.couldNotResolve);
      expect(resolvedAbsolutePath).toBe(testData.result.resolved);
    });
  });
});
