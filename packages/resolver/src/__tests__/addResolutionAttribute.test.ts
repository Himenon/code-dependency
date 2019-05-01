import * as Types from "@code-dependency/interfaces";
import * as path from "path";
import { addResolutionAttribute } from "../addResolutionAttribute";

describe("#resolve.addResolutionAttributes", () => {
  const option: Types.ResolveOption = {
    symlinks: false,
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  };
  const baseDir = path.resolve(__dirname, "../../");
  const resolver = addResolutionAttribute({ baseDir }, "../addResolutionAttributes.ts", option);

  test.skip("local modules", () => {
    const result1 = resolver({ moduleName: "@code-dependency/interfaces", moduleSystem: "cjs" });
    expect(result1.resolved).toBe("../interfaces/lib/index.js");
    expect(result1.couldNotResolve).toBe(false);
  });

  test("core module test", () => {
    const result2 = resolver({ moduleName: "path", moduleSystem: "cjs" });
    expect(result2.resolved).toBe(undefined);
    expect(result2.coreModule).toBe(true);
    expect(result2.couldNotResolve).toBe(false);
  });
});
