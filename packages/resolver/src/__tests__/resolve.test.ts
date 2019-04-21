import * as Types from "@code-dependency/interfaces";
import * as path from "path";
import { resolve } from "../enhancedResolve";

describe("#resolve", () => {
  let options: Types.ResolveOption;
  beforeAll(() => {
    options = {
      symlinks: false,
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    };
  });

  test("#absolute path", () => {
    const absolutePath = path.resolve(__dirname, "../resolve");
    const result = resolve("../resolve", absolutePath, options);
    expect(result).toBe(absolutePath + ".ts");
  });

  test("#absolute node_modules path", () => {
    const absolutePath = path.resolve(__dirname, "../../../../node_modules");
    const result = resolve("typescript", absolutePath, options);
    expect(result).toBe(path.join(absolutePath, "typescript/lib/typescript.js"));
  });
});
