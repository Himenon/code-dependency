import * as Types from "@code-dependency/interfaces";
import * as path from "path";
import { resolve } from "./resolve";

export const addResolutionAttribute = (options: { baseDir: string }, fileName: string, resolveOptions: Types.ResolveOption) => {
  return (dependency: { moduleName: string; moduleSystem: Types.ModuleSystem }): Types.Dependency => {
    const resolved = resolve(dependency, options.baseDir, path.join(options.baseDir, path.dirname(fileName)), resolveOptions);
    return {
      ...resolved,
      module: dependency.moduleName,
      moduleSystem: dependency.moduleSystem,
      followable: resolved.followable,
      matchesDoNotFollow: false,
    };
  };
};
