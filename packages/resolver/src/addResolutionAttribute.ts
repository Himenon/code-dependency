import * as Types from "@code-dependency/interfaces";
import * as path from "path";
import { resolve } from "./resolve";

export const addResolutionAttribute = (options: { baseDir: string }, fileName: string, resolveOptions: Types.ResolveOption) => {
  return (dependency: { moduleName: string; moduleSystem: Types.ModuleSystem }): Types.Dependency => {
    const attributes = resolve(dependency, options.baseDir, path.join(options.baseDir, path.dirname(fileName)), resolveOptions);
    if (!attributes.resolved) {
      return {
        resolved: undefined,
        module: dependency.moduleName,
        couldNotResolve: attributes.coreModule,
        coreModule: attributes.coreModule,
        moduleSystem: dependency.moduleSystem,
      };
    }
    return {
      module: dependency.moduleName,
      moduleSystem: dependency.moduleSystem,
      resolved: attributes.resolved,
      coreModule: attributes.coreModule,
      followable: attributes.followable,
      dependencyTypes: attributes.dependencyTypes,
      couldNotResolve: false,
      matchesDoNotFollow: false,
    };
  };
};
