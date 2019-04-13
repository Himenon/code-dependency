import * as Types from "@code-dependency/interfaces";
import * as Parser from "@code-dependency/parser";
import { addResolutionAttribute, compileResolveOptions } from "@code-dependency/resolver";
import * as Extract from "./extract";

const execute = async (options: Types.Options, resolveOption: Types.ResolveOption) => {
  const allFiles = await Extract.gather(options);
  const normalizedOption = compileResolveOptions(resolveOption);
  return allFiles.reduce<Types.Dependency[]>((previousValue: Types.Dependency[], currentValue: string) => {
    const ast = Parser.toToAst(currentValue);
    const depObject: Types.Dependency[] = Extract.getDeps(ast).map((extractObject: Types.ExtractObject) =>
      addResolutionAttribute({ baseDir: options.executeDirectory }, currentValue, normalizedOption)({
        moduleName: extractObject.module,
        moduleSystem: extractObject.moduleSystem,
      }),
    );
    return [...previousValue, ...depObject];
  }, []);
};

export { Extract, Parser, execute };
