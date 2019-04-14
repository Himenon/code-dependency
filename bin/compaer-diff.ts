import * as path from "path";

interface Package {
  dependencies?: { [name: string]: string }
  devDependencies?: { [name: string]: string }
}

const main = () => {
  if (process.argv.length < 4) {
    console.log("At least set argument 2");
    return;
  }
  const cwd = process.cwd();
  const file1 = path.resolve(cwd, process.argv[2]);
  const file2 = path.resolve(cwd, process.argv[3]);
  const childPackage: Package = require(file1);
  const parentPackage: Package = require(file2);

  const dependenciesSet = new Set<string>(Object.keys(childPackage.dependencies || {}));
  const devDependenciesSet = new Set<string>(Object.keys(childPackage.devDependencies || {}));
  Object.keys(parentPackage.dependencies || {}).forEach(dependency => {
    dependenciesSet.delete(dependency);
  })
  Object.keys(parentPackage.devDependencies || {}).forEach(devDependencies => {
    devDependenciesSet.delete(devDependencies);
  })
  const pkgDiff = {
    dependencies: {},
    devDependencies: {},
  };
  dependenciesSet.forEach(key => {
    pkgDiff.dependencies[key] = childPackage.dependencies[key];
  })
  devDependenciesSet.forEach(key => {
    pkgDiff.devDependencies[key] = childPackage.devDependencies[key];
  })
  console.log(JSON.stringify(pkgDiff, null, 2));
}


main();
