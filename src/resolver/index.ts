import { Dependency, DevelopDependency, Options, ResolvedModule } from "@my/types";
import * as fs from "fs";
import * as path from "path";

const isRelativeModuleName = (pString: string) => pString.startsWith(".");

const resolveModule = (pDependency: DevelopDependency, pBaseDir: string, pFileDir: string, pResolveOptions: Options): ResolvedModule => {
  let lRetval = null;

  if (isRelativeModuleName(pDependency.module) || ["cjs", "es6"].indexOf(pDependency.moduleSystem) > -1) {
    lRetval = resolveCommonJS(pDependency.module, pBaseDir, pFileDir, pResolveOptions);
  } else {
    lRetval = resolveAMD(pDependency.module, pBaseDir, pFileDir, pResolveOptions);
  }
  return lRetval;
};

export const resolve = (pDependency: DevelopDependency, pBaseDir: string, pFileDir: string, pResolveOptions: Options): Dependency => {
  const lResolvedModule = resolveModule(pDependency, pBaseDir, pFileDir, pResolveOptions);

  if (!pResolveOptions.symlinks && !lResolvedModule.coreModule && !lResolvedModule.couldNotResolve) {
    try {
      // tslint:disable
      lResolvedModule.resolved = path.normalize(path.relative(pBaseDir, fs.realpathSync(path.resolve(pBaseDir, lResolvedModule.resolved))));
    } catch (e) {
      lResolvedModule.couldNotResolve = true;
    }
  }
  return lResolvedModule;
};
