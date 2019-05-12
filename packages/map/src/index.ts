import { getTsDependencies } from "@code-dependency/extract";
import * as Types from "@code-dependency/interfaces";
import { addResolutionAttribute } from "@code-dependency/resolver";
import * as path from "path";
import { gather } from "./gather";

export const stripBasePath = (from: string, to: string, originFrom?: string): string => {
  if (from === "/" || from === ".") {
    return to;
  }
  if (to.startsWith(from)) {
    return path.relative(originFrom || from, to);
  }
  return stripBasePath(path.dirname(from), to, originFrom || from);
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
        attributes.resolved && options.stripBasePath ? stripBasePath(options.stripBasePath, attributes.resolved) : undefined;
      return attributes;
    });
    const result: Types.InputSourceDependency = {
      source: options.stripBasePath ? stripBasePath(options.stripBasePath, source) : source,
      dependencies,
    };
    return previousSourceDependencies.concat(result);
  }, []);
};

export { getDependencies };
