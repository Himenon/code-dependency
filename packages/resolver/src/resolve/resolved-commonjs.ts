import * as Types from "@code-dependency/interfaces";
import * as path from "path";
import { isCore } from "resolve";
import { ResolutionAttribute } from "./constants";
import { resolve } from "./enhancedResolve";

function addResolutionAttributes(
  baseDir: string,
  moduleName: string,
  fileDir: string,
  resolveOption: Types.ResolveOption,
): ResolutionAttribute {
  let resolved: string | undefined;
  let followable: boolean = false;
  let couldNotResolve: boolean = false;
  let coreModule = false;

  if (isCore(moduleName)) {
    coreModule = true;
  } else {
    try {
      resolved = path.relative(baseDir, resolve(moduleName, fileDir, resolveOption));
      followable = true;
    } catch (e) {
      couldNotResolve = true;
    }
  }
  return {
    resolved,
    followable,
    couldNotResolve,
    coreModule,
    dependencyTypes: ["undetermined"],
  };
}

/*
 * resolves both CommonJS and ES6
 */
export const resolveCommonJS = (moduleName: string, baseDir: string, fileDir: string, option: Types.ResolveOption): ResolutionAttribute => {
  return addResolutionAttributes(baseDir, moduleName, fileDir, option);
};
