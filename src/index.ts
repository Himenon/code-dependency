import * as Extract from "./extract";
import * as Parser from "./parser";
import * as Resolver from "./resolver";
import * as Types from "./types";

const execute = async (options: Types.Options, resolveOption: Types.ResolveOption) => {
  const allFiles = await Extract.gather(options);
  return allFiles.reduce<Types.Dependency[]>((previousValue: Types.Dependency[], currentValue: string) => {
    const ast = Parser.toToAst(currentValue);
    const depObject: Types.Dependency[] = Extract.getDeps(ast).map((extractObject: Types.ExtractObject) =>
      Resolver.addResolutionAttribute({ baseDir: options.executeDirectory }, currentValue, resolveOption)({
        moduleName: extractObject.module,
        moduleSystem: extractObject.moduleSystem,
      }),
    );
    return [...previousValue, ...depObject];
  }, []);
};

export { Extract, Parser, execute };
