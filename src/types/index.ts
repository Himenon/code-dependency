export interface Options {
  source: string;
  executeDirectory: string;
}

export type DependencyTypes = "local" | "core" | "npm-dev";

export type ModuleSystem = "cjs" | "amd" | "es6" | "tsd";

export interface ExtractObject {
  module: string;
  moduleSystem: ModuleSystem;
}

/** 開発途上用 */
export interface DevelopDependency extends ExtractObject {
  resolved: string;
}

export interface Dependency {
  /** full path */
  resolved: string;
  /** Node Library */
  coreModule: boolean;
  /** User searched file. */
  followable: boolean;
  /** This file is resolve? */
  couldNotResolve: boolean;
  /** File types. */
  dependencyTypes: DependencyTypes[];
  /** relative import path */
  module: string;
  /** */
  moduleSystem: ModuleSystem;
  /** search target? */
  matchesDoNotFollow: false;
  /** License */
  license?: string;
}

export interface InputSourceDependency {
  /** Source file path */
  source: string;
  /** Include dependencies. */
  dependencies: Dependency[];
}

export interface TreeData {
  dependency: InputSourceDependency;
  children: TreeData[];
}
