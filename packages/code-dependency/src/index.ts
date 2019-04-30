import { getTsDependencies } from "@code-dependency/extract";
import * as Types from "@code-dependency/interfaces";
import { addResolutionAttribute } from "@code-dependency/resolver";
import { gather } from "./gather";

const getDependencies = async (options: Types.Options, resolveOption: Types.ResolveOption): Promise<Types.InputSourceDependency[]> => {
  const visited = new Set<string>();
  const allFiles = await gather(options);
  return allFiles.reduce<Types.InputSourceDependency[]>((previousSourceDependencies: Types.InputSourceDependency[], source: string) => {
    if (visited.has(source)) {
      return previousSourceDependencies;
    }
    visited.add(source);
    const dependencies: Types.Dependency[] = getTsDependencies(source).map((extractObject: Types.ExtractObject) =>
      addResolutionAttribute({ baseDir: options.executeDirectory }, source, resolveOption)({
        moduleName: extractObject.module,
        moduleSystem: extractObject.moduleSystem,
      }),
    );
    const result: Types.InputSourceDependency = {
      source,
      dependencies,
    };
    return [...previousSourceDependencies, result];
  }, []);
};

export { getDependencies };
