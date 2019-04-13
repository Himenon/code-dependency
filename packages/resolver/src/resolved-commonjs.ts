import * as path from "path";
import { isCore } from "resolve";
import { resolve } from "./resolve";

import * as Types from "@code-dependency/interfaces";

interface Resolve {
  resolved: string;
  coreModule: boolean;
  followable: boolean;
  couldNotResolve: boolean;
  dependencyTypes: Types.DependencyTypes[];
}

function addResolutionAttributes(baseDir: string, moduleName: string, fileDir: string, resolveOption: Types.ResolveOption): Resolve {
  let resolved: string = moduleName;
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
export const resolveCommonJS = (moduleName: string, baseDir: string, fileDir: string, option: Types.ResolveOption): Resolve => {
  const lRetval = {
    resolved: moduleName,
    coreModule: false,
    followable: false,
    couldNotResolve: false,
    dependencyTypes: ["undetermined"],
    ...addResolutionAttributes(baseDir, moduleName, fileDir, option),
  };

  return {
    ...lRetval,
  };
};
