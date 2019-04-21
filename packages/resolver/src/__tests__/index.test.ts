import { ResolveOption } from "@code-dependency/interfaces";
import * as path from "path";
import { resolve } from "../resolve";
import { compileResolveOptions } from "../resolveOptions";

describe("#resolve", () => {
  let option: ResolveOption;
  const generateAbsoluteDirPath = (fileName: string) => {
    const absoluteBaseDir = path.resolve(__dirname, "../../");
    return {
      baseDir: absoluteBaseDir,
      fileDir: path.resolve(absoluteBaseDir, path.dirname(path.resolve(__dirname, fileName))),
    };
  };

  beforeAll(() => {
    option = compileResolveOptions({
      symlinks: false,
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    });
  });

  test("index.ts: native module: path", () => {
    const { baseDir, fileDir } = generateAbsoluteDirPath("../index.ts");
    const result = resolve({ moduleName: "path", moduleSystem: "cjs" }, baseDir, fileDir, option);
    expect(result.resolved).toBe(undefined);
    expect(result.couldNotResolve).toBe(false);
  });

  test("index.ts: resolved-commonjs", () => {
    const { baseDir, fileDir } = generateAbsoluteDirPath("../index.ts");
    const result = resolve({ moduleName: "./resolved-commonjs", moduleSystem: "cjs" }, baseDir, fileDir, option);
    expect(result.resolved).toBe("src/resolved-commonjs.ts");
  });

  test("index.ts: @code-dependency/interfaces", () => {
    const { baseDir, fileDir } = generateAbsoluteDirPath("../index.ts");
    const result = resolve({ moduleName: "@code-dependency/interfaces", moduleSystem: "cjs" }, baseDir, fileDir, option);
    // lerna package
    expect(result.resolved).toBe("../interfaces/lib/index.js");
  });

  test("resolve.ts: @code-dependency/interfaces", () => {
    const { baseDir, fileDir } = generateAbsoluteDirPath("../resolve.ts");
    const result = resolve({ moduleName: "@code-dependency/interfaces", moduleSystem: "cjs" }, baseDir, fileDir, option);
    // lerna package
    expect(result.resolved).toBe("../interfaces/lib/index.js");
  });

  test("resolve.ts: enhanced-resolve", () => {
    const { baseDir, fileDir } = generateAbsoluteDirPath("../resolve.ts");
    const result = resolve({ moduleName: "enhanced-resolve", moduleSystem: "cjs" }, baseDir, fileDir, option);
    // Reason: yarn workspace
    expect(result.resolved).toBe("../../node_modules/enhanced-resolve/lib/node.js");
  });

  test("determineDependencyTypes.ts: resolve", () => {
    const { baseDir, fileDir } = generateAbsoluteDirPath("../determineDependencyTypes.ts");
    const result = resolve({ moduleName: "resolve", moduleSystem: "cjs" }, baseDir, fileDir, option);
    // Reason: yarn workspace
    expect(result.resolved).toBe("../../node_modules/resolve/index.js");
  });
});
