import * as Extract from "./extract";
import * as Parser from "./parser";
import { DevelopDependency, Options } from "./types";

const execute = async (options: Options) => {
  const allFiles = await Extract.gather(options);
  return allFiles.reduce<DevelopDependency[]>((previousValue, currentValue) => {
    const ast = Parser.toToAst(currentValue);
    const depObject: DevelopDependency[] = Extract.getDeps(ast).map(extractObject =>
      Extract.addAttributes(currentValue, extractObject, options),
    );
    return [...previousValue, ...depObject];
  }, []);
};

export { Extract, Parser, execute };
