import * as Types from "@code-dependency/interfaces";
import * as path from "path";
import { execute } from "../index";

describe("#index", () => {
  const baseDir = path.resolve(__dirname, "../");
  const options: Types.Options = {
    source: path.resolve(baseDir, "../index.ts"),
    executeDirectory: baseDir,
  };

  test("#execute", async done => {
    const result = await execute(options, {
      symlinks: false,
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    });
    expect(result.length).toEqual(23);
    done();
  });
});
