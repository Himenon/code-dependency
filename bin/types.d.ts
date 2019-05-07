export interface MonorepoBase<T> {
  cli: T;
  map: T;
  converter: T;
  extract: T;
  interfaces: T;
  resolver: T;
  view: T;
}

export interface MonorepoPackageSettings extends MonorepoBase<string> {
  cli: string;
  map: string;
  converter: string;
  extract: string;
  interfaces: string;
  resolver: string;
  view: string;
}

export interface MonorepoPackageVersion extends MonorepoBase<{ name: string; version: string }> {
  cli: {
    name: "@code-dependency/cli";
    version: string;
  };
  map: {
    name: "@code-dependency/map";
    version: string;
  };
  converter: {
    name: "@code-dependency/converter";
    version: string;
  };
  extract: {
    name: "@code-dependency/extract";
    version: string;
  };
  interfaces: {
    name: "@code-dependency/interfaces";
    version: string;
  };
  resolver: {
    name: "@code-dependency/resolver";
    version: string;
  };
  view: {
    name: "@code-dependency/view";
    version: string;
  };
}

export interface TsConfig {
  extends?: "../tsconfig.shared";
  compilerOptions: {
    tsBuildInfoFile?: string;
    sourceMap?: boolean;
    declarationMap?: boolean;
  }
}

interface Package {
  version: string;
  scripts: { [key: string]: string };
  peerDependencies?: { [key: string]: string };
  dependencies?: { [key: string]: string };
  devDependencies?: { [key: string]: string };
}

interface JestConfig {
  cacheDirectory?: string;
}
