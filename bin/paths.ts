export interface MonorepoPackageSettings {
  cli: string;
  "code-dependency": string;
  converter: string;
  extract: string;
  interfaces: string;
  resolver: string;
  view: string;
}

export const packageNameList: Array<keyof MonorepoPackageSettings> = ["cli", "code-dependency", "converter", "extract", "extract", "resolver", "view"];

export const packages: MonorepoPackageSettings = {
  cli: "packages/cli/package.json",
  "code-dependency": "packages/code-dependency/package.json",
  converter: "packages/converter/package.json",
  extract: "packages/extract/package.json",
  interfaces: "packages/interfaces/package.json",
  resolver: "packages/resolver/package.json",
  view: "packages/view/package.json",
}

export const jestConfigs: MonorepoPackageSettings = {
  cli: "packages/cli/jest.config.json",
  "code-dependency": "packages/code-dependency/jest.config.json",
  converter: "packages/converter/jest.config.json",
  extract: "packages/extract/jest.config.json",
  interfaces: "packages/interfaces/jest.config.json",
  resolver: "packages/resolver/jest.config.json",
  view: "packages/view/jest.config.json",
};

export const tsConfigs: MonorepoPackageSettings = {
  cli: "packages/cli/tsconfig.json",
  "code-dependency": "packages/code-dependency/tsconfig.json",
  converter: "packages/converter/tsconfig.json",
  extract: "packages/extract/tsconfig.json",
  interfaces: "packages/interfaces/tsconfig.json",
  resolver: "packages/resolver/tsconfig.json",
  view: "packages/view/tsconfig.json",
};

/**
 * relative path from package.
 */
export const buildcaches: MonorepoPackageSettings = {
  cli: "../../buildcache/cli/",
  "code-dependency": "../../buildcache/code-dependency/",
  converter: "../../buildcache/converter/",
  extract: "../../buildcache/extract/",
  interfaces: "../../buildcache/interfaces/",
  resolver: "../../buildcache/resolver/",
  view: "../../buildcache/view/",
};

export const tsConfigShared = "packages/tsconfig.shared.json";
