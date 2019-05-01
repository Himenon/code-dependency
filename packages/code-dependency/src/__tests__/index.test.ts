import * as Types from "@code-dependency/interfaces";
import * as path from "path";
import { getDependencies } from "../index";

describe("#index", () => {
  const baseDir = path.resolve(__dirname, "../");
  const options: Types.Options = {
    source: path.resolve(baseDir, "../index.ts"),
    executeDirectory: baseDir,
  };

  test("#execute", async done => {
    const result = await getDependencies(options, {
      symlinks: false,
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    });
    expect(result.length).not.toEqual(0);
    done();
  });
});
