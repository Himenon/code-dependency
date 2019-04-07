import * as Extract from "./extract";
import * as Parser from "./parser";

const execute = (filename: string) => {
  const ast = Parser.toToAst(filename);
  return Extract.getDeps(ast);
};

export { Extract, Parser, execute };
