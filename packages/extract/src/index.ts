import * as Extract from "./extract";
import * as Parser from "./parser";

export const getTsDependencies = (source: string) => {
  const ast = Parser.toAst(source);
  return Extract.extractDependencies(ast);
};
