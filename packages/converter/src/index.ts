import { Dependency, InputSourceDependency, TreeData, ViewSourceDependency } from "@code-dependency/interfaces";
import * as path from "path";
import { transformViewDependency } from "./transform";

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
    if (relativePathPatterns.includes(dep.source)) {
      return true;
    }
  }
  return dep.source === treeData.resolved;
};

const generateTreeData = (source: InputSource): TreeData => {
  if (typeof source === "string") {
    return {
      resolved: source,
      coreModule: false,
      followable: true,
      couldNotResolve: false,
      dependencyTypes: ["undetermined"],
      module: source,
      moduleSystem: "cjs",
      matchesDoNotFollow: false,
      circular: [],
      children: [],
    };
  }
  return {
    ...source,
    circular: [],
    children: [],
  };
};

/**
 * ViewSourceDependencyは一度だけ利用可能.
 */
const usedPathList: string[] = [];

const recursiveConvert = (source: InputSource, dependencies: ViewSourceDependency[], parentSource?: InputSourceDependency): TreeData => {
  const root: TreeData = generateTreeData(source);
  const rootDependency = dependencies.find(dep => hasModuleDependency(dep, root, parentSource));
  /**
   * TODO circular deps
   */
  const resolved: string | undefined = typeof source === "string" ? source : source.resolved;
  if (rootDependency && (!resolved || !usedPathList.includes(resolved))) {
    if (resolved) {
      usedPathList.push(resolved);
    }
    root.children = rootDependency.dependencies.map(nextSource => recursiveConvert(nextSource, dependencies, rootDependency));
  }
  return root;
};

export const converter = (source: InputSource, dependencies: InputSourceDependency[], parentSource?: InputSourceDependency): TreeData => {
  usedPathList.length = 0;
  return recursiveConvert(source, transformViewDependency(dependencies), parentSource);
};
