import * as enhancedResolve from "enhanced-resolve";
import * as normalize from "normalize-package-data";

export interface Package extends normalize.Package {
  bundledDependencies?: { [name: string]: string };
}

export interface Options {
  source: string;
  executeDirectory: string;
}

export interface ExtendResolveOption {
  tsConfig?: string;
}

export type ResolveOption = enhancedResolve.ResolverFactory.ResolverOption & ExtendResolveOption;

export type DependencyTypes = "local" | "core" | "npm" | "npm-dev" | "undetermined";

export type ModuleSystem = "cjs" | "amd" | "es6" | "tsd";

export interface ExtractObject {
  module: string;
  moduleSystem: ModuleSystem;
}

export interface ResolvedModule {
  resolved?: string[];
  module: string;
  moduleSystem: ModuleSystem;
  coreModule: boolean;
  couldNotResolve?: boolean;
}

export interface Dependency {
  /** full path */
  resolved?: string;
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
  matchesDoNotFollow: boolean;
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
