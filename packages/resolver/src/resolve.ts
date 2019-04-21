import * as Types from "@code-dependency/interfaces";
import * as fs from "fs";
import * as path from "path";
import { resolveCommonJS } from "./resolved-commonjs";
import { compileResolveOptions } from "./resolveOptions";

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
    return resolveCommonJS(dependency.moduleName, baseDir, fileDir, resolveOption);
  }
};

/**
 * 任意のディレクトリから見たmoduleの解決.
 *
 * @dependency: 探索したいmoduleとmodule system
 * @params baseDir: プロジェクトのルートディレクトリ
 * @params fileDir: 探索するファイルが位置するディレクトリ
 */
export const resolve = (
  dependency: { moduleName: string; moduleSystem: Types.ModuleSystem },
  baseDir: string,
  fileDir: string,
  option: Types.ResolveOption,
): Resolve => {
  const resolveOption = compileResolveOptions(option);
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
