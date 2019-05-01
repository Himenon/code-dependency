import { Dependency, InputSourceDependency, TreeData } from "@code-dependency/interfaces";
import * as path from "path";

type InputSource = string | Dependency;

const generateRelativePathPatterns = (basePath: string, moduleName: string): string[] => {
  let patterns: string[] = [];
  const extension = path.extname(moduleName);
  const baseDir = path.dirname(basePath);
  const extensions: string[] = [".ts", ".tsx", ".js", ".jsx", ".mjs"];
  const indexFiles: string[] = ["index.ts", "index.tsx", "index.js", "index.jsx", "index.mjs"];
  if (extension !== "") {
    patterns.push(path.join(baseDir, moduleName));
  }
  if (extension === "") {
    patterns = patterns.concat(extensions.map(ext => path.join(baseDir, moduleName + ext)));
    patterns = patterns.concat(indexFiles.map(index => path.join(baseDir, moduleName, index)));
  }
  return patterns;
};

/**
 * @param dep One FlatDependencies
 * @param resolved
 * @param parentSource from resolved path.
 */
const hasModuleDependency = (dep: InputSourceDependency, treeData?: TreeData, parentSource?: InputSourceDependency): boolean => {
  if (!treeData) {
    return false;
  }
  if (parentSource && treeData.module.startsWith(".")) {
    const relativePathPatterns = generateRelativePathPatterns(parentSource.source, treeData.module);
    // console.log({ dep: dep.source, parent: parentSource && parentSource.source, module: treeData.module, relativePathPatterns });
    if (relativePathPatterns.includes(dep.source)) {
      return true;
    }
  }
  return dep.source === treeData.resolved;
};

const getTreeData = (source: InputSource): TreeData => {
  if (typeof source === "string") {
    return {
      resolved: source, // TODO undefined
      coreModule: false,
      followable: true,
      couldNotResolve: false,
      dependencyTypes: ["undetermined"],
      module: source,
      moduleSystem: "cjs",
      matchesDoNotFollow: false,
      children: [],
    };
  }
  return {
    ...source,
    children: [],
  };
};

export const converter = (source: InputSource, dependencies: InputSourceDependency[], parentSource?: InputSourceDependency): TreeData => {
  const root: TreeData = getTreeData(source);
  const rootDependency = dependencies.find(dep => hasModuleDependency(dep, root, parentSource));
  if (rootDependency) {
    root.children = rootDependency.dependencies.map(nextSource => converter(nextSource, dependencies, rootDependency));
  }
  return root;
};
