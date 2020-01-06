import * as os from "os";
import * as path from "path";
import { convertSourceToAbsolutePath } from "../PathFactory";

describe("check path factory", () => {
  const homedir = os.homedir();
  const context = process.cwd();
  test("convertSourceToAbsolutePath", () => {
    expect(convertSourceToAbsolutePath("/a/b/c.js")).toBe("/a/b/c.js");
    expect(convertSourceToAbsolutePath("~/a/b/c.js")).toBe(path.join(homedir, "/a/b/c.js"));
    expect(convertSourceToAbsolutePath("./a/b/c.js")).toBe(path.join(context, "/a/b/c.js"));
    expect(convertSourceToAbsolutePath("../a/b/c.js")).toBe(path.join(context, "../a/b/c.js"));
  });
});
