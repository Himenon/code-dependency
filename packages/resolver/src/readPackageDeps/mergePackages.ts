import { clone as _clone, get as _get, uniq as _uniq } from "lodash";
import * as normalize from "normalize-package-data";

export interface PackageDependencies {
  [key: string]: string;
}

export const normalizedPackage = (pkg: { [key: string]: any }): normalize.Package => {
  normalize(pkg);
  return pkg as normalize.Package;
};

function normalizePackageKeys(pkg: normalize.Package): normalize.Package {
  const retval = pkg;
  if (pkg.bundleDependencies) {
    pkg.bundledDependencies = _clone(pkg.bundleDependencies);
    Reflect.deleteProperty(pkg, "bundleDependencies");
  }
  return retval;
}

function mergeDependencyKey(closestDependencyKey: PackageDependencies, furtherDependencyKey: PackageDependencies): {} {
  return { ...furtherDependencyKey, ...closestDependencyKey };
}

function mergeDependencyArray(closestDependencyKey: string[], furtherDependencyKey: string[]): any[] {
  return _uniq(closestDependencyKey.concat(furtherDependencyKey));
}

function isDependencyKey(key: string) {
  return key.endsWith("ependencies");
}

function getDependencyKeys(pkg: normalize.Package): string[] {
  return Object.keys(pkg).filter(isDependencyKey);
}

function getJointDependencyKeys(closestPackage: normalize.Package, furtherPackage: normalize.Package): string[] {
  return _uniq(getDependencyKeys(closestPackage).concat(getDependencyKeys(furtherPackage)));
}

export const mergePackages = (closestPackage: normalize.Package, furtherPackage: normalize.Package): PackageDependencies =>
  getJointDependencyKeys(normalizePackageKeys(closestPackage), normalizePackageKeys(furtherPackage))
    .map(pKey => ({
      key: pKey,
      value: pKey.startsWith("bundle")
        ? mergeDependencyArray(_get(closestPackage, pKey, []), _get(furtherPackage, pKey, []))
        : mergeDependencyKey(_get(closestPackage, pKey, {}), _get(furtherPackage, pKey, {})),
    }))
    .reduce((pJoinedObject, pJoinedKey) => {
      pJoinedObject[pJoinedKey.key] = pJoinedKey.value;
      return pJoinedObject;
    }, {});
