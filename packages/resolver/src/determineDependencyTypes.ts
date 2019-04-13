import * as Types from "@code-dependency/interfaces";
import * as path from "path";
import { isCore } from "resolve";
import * as localNpmHelpers from "./localNpmHelpers";

const npm2depType = {
  dependencies: "npm",
  devDependencies: "npm-dev",
  optionalDependencies: "npm-optional",
  peerDependencies: "npm-peer",
};

function determineNpmDependencyTypes(moduleName: string, packageDependencies: { [key: string]: string }) {
  let retval = ["npm-unknown"];

  if (Boolean(packageDependencies)) {
    retval = Object.keys(packageDependencies)
      .filter(key => key.includes("ependencies") && packageDependencies[key].hasOwnProperty(moduleName))
      .map(key => npm2depType[key] || "npm-no-pkg");
    retval = retval.length === 0 ? ["npm-no-pkg"] : retval;
  }

  return retval;
}

function dependencyIsBundled(pModule: string, pPackageDeps: Types.Package): boolean {
  if (Boolean(pPackageDeps)) {
    const bundledDependencies = pPackageDeps.bundledDependencies || pPackageDeps.bundleDependencies || {};
    if (bundledDependencies) {
      return Object.keys(bundledDependencies).some(dependencyName => dependencyName === pModule);
    }
  }
  return false;
}

function determineNodeModuleDependencyTypes(
  pModuleName: string,
  pPackageDeps: Types.Package,
  pFileDir: string,
  pResolveOptions: Types.ResolveOption,
) {
  const lRetval = determineNpmDependencyTypes(localNpmHelpers.getPackageRoot(pModuleName), pPackageDeps);

  if (localNpmHelpers.dependencyIsDeprecated(pModuleName, pFileDir, pResolveOptions)) {
    lRetval.push("deprecated");
  }
  if (dependencyIsBundled(pModuleName, pPackageDeps)) {
    lRetval.push("npm-bundled");
  }
  return lRetval;
}

function isNodeModule(pDependency: Types.ResolvedModule): boolean {
  return !!pDependency.resolved && pDependency.resolved.includes("node_modules");
}

function determineModuleDependencyTypes(
  pDependency: Types.ResolvedModule,
  pModuleName: string,
  pPackageDeps: Types.Package,
  pFileDir: string,
  pResolveOptions: Types.ResolveOption,
) {
  if (isNodeModule(pDependency)) {
    return determineNodeModuleDependencyTypes(pModuleName, pPackageDeps, pFileDir, pResolveOptions);
  } else {
    return ["localmodule"];
  }
}

function isModule(dependency: Types.ResolvedModule, modules: string[] = ["node_modules"], baseDir: string = "."): boolean {
  return modules.some(moduleName => {
    if (path.isAbsolute(moduleName) && dependency.resolved) {
      return path.resolve(baseDir, ...dependency.resolved).startsWith(moduleName);
    }
    return !!dependency.resolved && dependency.resolved.includes(moduleName);
  });
}

function isLocal(pModuleName: string): boolean {
  return pModuleName.startsWith(".");
}

function isAliased(pModuleName: string, pAliasObject: {} | undefined): boolean {
  return Object.keys(pAliasObject || {}).some(pAliasLHS => pModuleName.startsWith(pAliasLHS));
}

function isLikelyTSAliased(moduleName: string, resolved: string[] | undefined | undefined, tsConfig: {} | undefined) {
  return tsConfig && !isLocal(moduleName) && resolved && !resolved.includes("node_modules");
}

function isAliassy(moduleName: string, dependency: Types.ResolvedModule, resolveOption: Types.ResolveOption) {
  return isAliased(moduleName, resolveOption.alias) || isLikelyTSAliased(moduleName, dependency.resolved, resolveOption.tsConfig);
}

export default (
  pDependency: Types.ResolvedModule,
  pModuleName: string,
  pPackageDeps: Types.Package,
  pFileDir: string,
  pResolveOptions: Types.ResolveOption,
  pBaseDir: string,
) => {
  let lRetval = ["undetermined"];

  pResolveOptions = pResolveOptions || {};

  if (pDependency.couldNotResolve) {
    lRetval = ["unknown"];
  } else if (isCore(pModuleName)) {
    // this 'isCore' business seems duplicate (it's already in
    // the passed object as `coreModule`- determined by the resolve-AMD or
    // resolve-commonJS module). I want to deprecate the `coreModule`
    // attribute in favor of this one and determining it here will make
    // live easier in the future
    lRetval = ["core"];
  } else if (isLocal(pModuleName)) {
    lRetval = ["local"];
  } else if (isModule(pDependency, pResolveOptions.modules, pBaseDir)) {
    lRetval = determineModuleDependencyTypes(pDependency, pModuleName, pPackageDeps, pFileDir, pResolveOptions);
  } else if (isAliassy(pModuleName, pDependency, pResolveOptions)) {
    lRetval = ["aliased"];
  }

  return lRetval;
};

/* eslint security/detect-object-injection: 0*/
