import { ExtractObject } from "@code-dependency/interfaces";
import * as Extract from "./extract";
import * as Parser from "./parser";

export const getTsDependencies = (source: string): ExtractObject[] => {
  const ast = Parser.toAst(source);
  return Extract.extractDependencies(ast);
};
