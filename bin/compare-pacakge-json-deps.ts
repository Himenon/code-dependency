import { PackageJson } from "type-fest";
import { readConfig } from "./filesystem";
import { monorepoSettings } from "./settings";

const isPackageDirectoryName = (nameList: string[]): boolean => {
  const result: boolean[] = nameList.map(name => {
    if (name in monorepoSettings) {
      return true;
    }
    console.error(`Not package name: ${name}`);
    return false;
  });
  if (result.includes(false)) {
    console.log("");
    console.log(`Package name list: ${Object.keys(monorepoSettings)}`);
    console.log("");
    return false;
  }
  return true;
};

const main = () => {
  if (process.argv.length < 4) {
    console.log("At least set argument 2");
    return;
  }
  const pkgNameLeft = process.argv[2];
  const pkgNameRight = process.argv[3];
  if (!isPackageDirectoryName([pkgNameLeft, pkgNameRight])) {
    return;
  }
  const leftPackageJson: PackageJson = readConfig<PackageJson>(pkgNameLeft);
  const rightPackageJson: PackageJson = readConfig<PackageJson>(pkgNameRight);
  const dependenciesSet = new Set<string>(Object.keys(leftPackageJson.dependencies || {}));
  const devDependenciesSet = new Set<string>(Object.keys(leftPackageJson.devDependencies || {}));
  Object.keys(rightPackageJson.dependencies || {}).forEach(dependency => {
    dependenciesSet.delete(dependency);
  });
  Object.keys(rightPackageJson.devDependencies || {}).forEach(devDependencies => {
    devDependenciesSet.delete(devDependencies);
  });
  const packageJsonDiff = {
    dependencies: {},
    devDependencies: {},
  };
  dependenciesSet.forEach(key => {
    if (leftPackageJson.dependencies) {
      packageJsonDiff.dependencies[key] = leftPackageJson.dependencies[key];
    }
  });
  devDependenciesSet.forEach(key => {
    if (leftPackageJson.devDependencies) {
      packageJsonDiff.devDependencies[key] = leftPackageJson.devDependencies[key];
    }
  });
  console.log(JSON.stringify(packageJsonDiff, null, 2));
};

main();
