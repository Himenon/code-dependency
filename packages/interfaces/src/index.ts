import * as enhancedResolve from "enhanced-resolve";
import * as normalize from "normalize-package-data";

export interface Package extends normalize.Package {
  bundledDependencies?: { [name: string]: string };
}

export interface Options {
  projectDirectory: string;
  executeDirectory: string;
  stripBasePath?: string;
}

export type TsConfig = any;

export interface ExtendResolveOption {
  tsConfig?: TsConfig;
  exclude?: string; // Regex pattern
  includeOnly?: string; // Regex Pattern
}

export type ResolveOption = enhancedResolve.ResolverFactory.ResolverOption & ExtendResolveOption;

export type DependencyTypes = "local" | "core" | "npm" | "npm-dev" | "undetermined";

export type ModuleSystem = "cjs" | "amd" | "es6" | "tsd";

export interface ExtractObject {
  module: string;
  moduleSystem: ModuleSystem;
}

// TODO なにに利用されているか
export interface ResolvedModule {
  resolved?: string[];
  module: string;
  moduleSystem: ModuleSystem;
  coreModule: boolean;
  couldNotResolve?: boolean;
}

export interface BaseDependencyProperties {
  /** resolved path */
  resolved: string | undefined;
  /** User searched file. */
  followable: boolean;
  /** relative import path */
  module: string;
  /** */
  moduleSystem: ModuleSystem;
  /** search target? */
  matchesDoNotFollow: boolean;
  /** License */
  license?: string;
  /** This file is resolve? */
  couldNotResolve: boolean;
  /** File types. */
  dependencyTypes: DependencyTypes[];
}

export interface ResolvedCoreDependency extends BaseDependencyProperties {
  resolved: string;
  coreModule: true;
  couldNotResolve: false;
}

export interface NotResolvedDependency extends BaseDependencyProperties {
  resolved: undefined;
  coreModule: false;
  couldNotResolve: true;
}

export interface ResolvedDependency extends BaseDependencyProperties {
  /** Node Library */
  coreModule: boolean;
}

export type Dependency = ResolvedDependency | NotResolvedDependency | ResolvedCoreDependency;

export interface InputSourceDependency {
  /** Source file path */
  source: string;
  /** Include dependencies. */
  dependencies: Dependency[];
}

export type FlatDependencies = InputSourceDependency[];

export interface ViewSourceDependency {
  source: string;
  dependencies: Dependency[];
  /**
   * [ a.ts, x.ts ]
   */
  circular: string[];
}

export interface TreeData extends ResolvedDependency {
  circular: string[];
  children: TreeData[];
}

/** Don't use "undefined" property. */
export interface CsrProps {
  flatDependencies: FlatDependencies;
}

export interface Project {
  name: string;
  path: string;
}

export interface StaticConfig {
  projects: Project[];
}

export interface Site {
  publicPath: string;
  projectBasePath: string;
  configJson: string;
  debugApi: string;
}
