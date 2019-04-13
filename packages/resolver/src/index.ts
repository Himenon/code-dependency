import * as Types from "@code-dependency/interfaces";
import * as fs from "fs";
import * as path from "path";
import { resolveCommonJS } from "./resolved-commonjs";

interface Resolve {
  resolved: string;
  coreModule: boolean;
  followable: boolean;
  couldNotResolve: boolean;
  dependencyTypes: Types.DependencyTypes[];
}

const isRelativeModuleName = (pString: string) => pString.startsWith(".");

const resolveModule = (
  dependency: { moduleName: string; moduleSystem: Types.ModuleSystem },
  baseDir: string,
  fileDir: string,
  resolveOption: Types.ResolveOption,
): Resolve => {
  if (isRelativeModuleName(dependency.moduleName) || dependency.moduleSystem in ["cjs", "es6"]) {
    return resolveCommonJS(dependency.moduleName, baseDir, fileDir, resolveOption);
  } else {
    // lRetval = resolveAMD(pDependency.module, pBaseDir, pFileDir, pResolveOptions);
    return resolveCommonJS(dependency.moduleName, baseDir, fileDir, resolveOption);
  }
};

/**
 * ここではDependencyを解決する
 */
export const resolve = (
  dependency: { moduleName: string; moduleSystem: Types.ModuleSystem },
  baseDir: string,
  fileDir: string,
  resolveOption: Types.ResolveOption,
): Resolve => {
  const resolvedModule = resolveModule(dependency, baseDir, fileDir, resolveOption);

  if (!resolvedModule.coreModule && !resolvedModule.couldNotResolve) {
    try {
      const resolvedPath = path.relative(baseDir, fs.realpathSync(path.resolve(baseDir, resolvedModule.resolved)));
      resolvedModule.resolved = path.normalize(resolvedPath);
    } catch (e) {
      resolvedModule.couldNotResolve = true;
    }
  }

  return resolvedModule;
};

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
