import * as fs from "fs";
import * as ts from "typescript";

export default (filename: string): ts.SourceFile => {
  return ts.createSourceFile(
    filename || "$internal-file-name",
    fs.readFileSync(filename, { encoding: "utf-8" }),
    ts.ScriptTarget.Latest,
    false,
  );
};
