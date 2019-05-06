import { Dependency, InputSourceDependency, ViewDependency, ViewSourceDependency } from "@code-dependency/interfaces";
import * as path from "path";

const getCircularTarget = (source: string, dependency: Dependency, flatDependencies: InputSourceDependency[]): string[] => {
  if (!dependency.module.startsWith(".")) {
    return [];
  }
  const dependencySourcePath = path.join(source, path.basename(dependency.module));
  return flatDependencies.filter(dep => dep.source === dependencySourcePath).map(dep => dep.source);
};

const transformDependencyToViewDependency = (
  inputSourceDependency: InputSourceDependency,
  flatDependencies: InputSourceDependency[],
): ViewDependency[] => {
  return inputSourceDependency.dependencies.map(dependency => {
    return {
      ...dependency,
      circular: getCircularTarget(inputSourceDependency.source, dependency, flatDependencies),
    };
  });
};

export const transformViewDependency = (flatDependencies: InputSourceDependency[]): ViewSourceDependency[] => {
  return flatDependencies.map(inputSourceDependency => {
    return {
      source: inputSourceDependency.source,
      dependencies: transformDependencyToViewDependency(inputSourceDependency, flatDependencies),
    };
  });
};
