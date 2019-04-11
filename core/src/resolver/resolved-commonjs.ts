import * as path from "path";
import { isCore } from "resolve";
import { resolve } from "./resolve";

import * as Types from "@my/types";

interface Resolve {
  resolved: string;
  coreModule: boolean;
  followable: boolean;
  couldNotResolve: boolean;
  dependencyTypes: Types.DependencyTypes[];
}

function addResolutionAttributes(pBaseDir: string, pModuleName: string, pFileDir: string, resolveOption: Types.ResolveOption): Resolve {
  let resolved: string = pModuleName;
  let followable: boolean = false;
  let couldNotResolve: boolean = false;
  let coreModule = false;

  if (isCore(pModuleName)) {
    coreModule = true;
  } else {
    try {
      resolved = path.relative(pBaseDir, resolve(pModuleName, pFileDir, resolveOption));
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
export const resolveCommonJS = (pModuleName: string, pBaseDir: string, pFileDir: string, resolveOption: Types.ResolveOption): Resolve => {
  const lRetval = {
    resolved: pModuleName,
    coreModule: false,
    followable: false,
    couldNotResolve: false,
    dependencyTypes: ["undetermined"],
    ...addResolutionAttributes(pBaseDir, pModuleName, pFileDir, resolveOption),
  };

  return {
    ...lRetval,
  };
};
