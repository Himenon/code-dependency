import * as ts from "typescript";

export interface PackageSettings {
  version: {
    name: string;
    value: string;
  };
  packageJson: string;
  tsConfig: string;
  jestConfig: string;
}

export interface SharedSettings {
  tsSharedConfig: string;
}

export interface MonorepoSettings {
  cli: PackageSettings;
  map: PackageSettings;
  converter: PackageSettings;
  extract: PackageSettings;
  interfaces: PackageSettings;
  resolver: PackageSettings;
  view: PackageSettings;
  "test-project": PackageSettings;
  [key: string]: PackageSettings;
}

export interface TsConfig {
  extends?: "../tsconfig.shared";
  compilerOptions: ts.CompilerOptions;
}

interface JestConfig {
  cacheDirectory?: string;
}
