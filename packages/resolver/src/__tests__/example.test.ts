import { ResolveOption } from "@code-dependency/interfaces";
import { sourceMap as Example } from "@code-dependency/test-project";
import * as path from "path";
import { resolve } from "../resolve";

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

  test.skip("Walk into example/src", () => {
    Example.RootDirTestData.forEach(testData => {
      const result = resolve({ moduleName: testData.moduleName, moduleSystem: "cjs" }, Example.SOURCE_DIR_PATH, EXAMPLE_FILE_DIR, option);
      expect({
        coreModule: result.coreModule,
        couldNotResolve: result.couldNotResolve,
        resolved: result.resolved,
      }).toEqual(testData.result);
    });
  });

  test.skip("Walk into example/src/circular-dependencies", () => {
    Example.CircleDepsDirTestData.forEach(testData => {
      const result = resolve(
        { moduleName: testData.moduleName, moduleSystem: "cjs" },
        Example.SOURCE_DIR_PATH,
        CIRCLE_DEPS_FILE_DIR,
        option,
      );
      expect({
        coreModule: result.coreModule,
        couldNotResolve: result.couldNotResolve,
        resolved: result.resolved,
      }).toEqual(testData.result);
    });
  });
});
