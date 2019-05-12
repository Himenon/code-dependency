import * as Types from "@code-dependency/interfaces";
import * as path from "path";
import { getDependencies, stripBasePath } from "../index";

describe("#index", () => {
  const baseDir = path.resolve(__dirname, "../");
  const options: Types.Options = {
    projectDirectory: path.resolve(baseDir, "../"),
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

  test("#stripBasePath", () => {
    expect(stripBasePath("/a", "/a/b/c")).toBe("b/c");
    expect(stripBasePath("/a/b", "/a/b/c")).toBe("c");
    expect(stripBasePath("/a/b/c", "/a/d/c")).toBe("../../d/c");
  });
});
