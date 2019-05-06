import * as Types from "@code-dependency/interfaces";
import * as path from "path";
import { addResolutionAttribute } from "../addResolutionAttribute";

describe("#resolve.addResolutionAttributes", () => {
  const option: Types.ResolveOption = {
    symlinks: false,
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  };

  test.skip("local modules", () => {
    const resolver = addResolutionAttribute({ baseDir: path.resolve(__dirname, "../../") }, "../addResolutionAttributes.ts", option);
    const result = resolver({ moduleName: "@code-dependency/interfaces", moduleSystem: "cjs" });
    expect(result.resolved).toBe("../interfaces/lib/index.js");
    expect(result.couldNotResolve).toBe(false);
  });

  test("core module test", () => {
    const resolver = addResolutionAttribute({ baseDir: path.resolve(__dirname, "../../") }, "../addResolutionAttributes.ts", option);
    const result = resolver({ moduleName: "path", moduleSystem: "cjs" });
    expect(result.resolved).toBeUndefined();
    expect(result.coreModule).toBe(true);
    expect(result.couldNotResolve).toBe(false);
  });
});
