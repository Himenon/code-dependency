import * as fs from "fs";
import { memoize as _memoize } from "lodash";
import * as normalize from "normalize-package-data";
import * as path from "path";
import { mergePackages, normalizedPackage, PackageDependencies } from "./mergePackages";

const readPackageDeps = _memoize(
  (fileDir: string): PackageDependencies | undefined => {
    try {
      const packageContent = fs.readFileSync(path.join(fileDir, "package.json"), "utf8");
      try {
        return normalizedPackage(JSON.parse(packageContent));
      } catch (e) {
        // left empty on purpose
      }
    } catch (e) {
      const nextDir = path.dirname(fileDir);
      if (nextDir !== fileDir) {
        // not yet reached root directory
        return readPackageDeps(nextDir);
      }
    }
    return;
  },
);

function maybeReadPackage(pFileDir: string): normalize.Package | undefined {
  try {
    const lPackageContent = fs.readFileSync(path.join(pFileDir, "package.json"), "utf8");

    try {
      return normalizedPackage(JSON.parse(lPackageContent));
    } catch (e) {
      // left empty on purpose
    }
  } catch (e) {
    // left empty on purpose
  }
  return;
}

function getIntermediatePaths(fileDir: string, baseDir: string): string[] {
  const retval: string[] = [];
  let intermediate = fileDir;

  while (
    intermediate !== baseDir &&
    // safety hatch in case pBaseDir is either not a part of
    // pFileDir or not something uniquely comparable to a
    // dirname
    intermediate !== path.dirname(intermediate)
  ) {
    retval.push(intermediate);
    intermediate = path.dirname(intermediate);
  }
  retval.push(baseDir);
  return retval;
}

const readPackageDepsCombined = _memoize(
  (fileDir, baseDir): PackageDependencies | undefined => {
    if (!fileDir.startsWith(baseDir) || baseDir.endsWith(path.sep)) {
      throw new Error(
        `Unexpected Error: Unusal baseDir passed to package reading function: '${baseDir}'\n` +
          `Please file a bug: https://github.com/sverweij/dependency-cruiser/issues/new?template=bug-report.md` +
          `&title=Unexpected Error: Unusal baseDir passed to package reading function: '${baseDir}'`,
      );
    }
    // @ts-ignore TODO いらないのでは
    const retval = getIntermediatePaths(fileDir, baseDir).reduce((all, current) => mergePackages(all, maybeReadPackage(current)), {});
    return Object.keys(retval).length > 0 ? retval : undefined;
  },
);

export default (fileDir: string, baseDir: string, combinedDependencies: boolean = false): PackageDependencies | undefined => {
  if (combinedDependencies) {
    return readPackageDepsCombined(fileDir, baseDir);
  } else {
    return readPackageDeps(fileDir);
  }
};
