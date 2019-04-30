import { getTsDependencies } from "@code-dependency/extract";
import * as Types from "@code-dependency/interfaces";
import { addResolutionAttribute } from "@code-dependency/resolver";
import * as path from "path";
import { gather } from "./gather";

const removeBasePath = (from: string, to: string): string => {
  if (to.startsWith(from)) {
    return path.relative(from, to);
  }
  return to;
};

const getDependencies = async (options: Types.Options, resolveOption: Types.ResolveOption): Promise<Types.InputSourceDependency[]> => {
  const visited = new Set<string>();
  const allFiles = await gather(options);
  return allFiles.reduce<Types.InputSourceDependency[]>((previousSourceDependencies: Types.InputSourceDependency[], source: string) => {
    if (visited.has(source)) {
      return previousSourceDependencies;
    }
    visited.add(source);
    const dependencies: Types.Dependency[] = getTsDependencies(source).map((extractObject: Types.ExtractObject) => {
      const attributes = addResolutionAttribute({ baseDir: options.executeDirectory }, source, resolveOption)({
        moduleName: extractObject.module,
        moduleSystem: extractObject.moduleSystem,
      });
      attributes.resolved =
        attributes.resolved && options.stripBasePath ? removeBasePath(options.stripBasePath, attributes.resolved) : attributes.resolved;
      return attributes;
    });
    const result: Types.InputSourceDependency = {
      source: options.stripBasePath ? removeBasePath(options.stripBasePath, source) : source,
      dependencies,
    };
    return previousSourceDependencies.concat(result);
  }, []);
};

export { getDependencies };
