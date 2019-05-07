import { MonorepoPackageSettings } from "./types";

export const packageNameList: Array<keyof MonorepoPackageSettings> = ["cli", "map", "interfaces", "converter", "extract", "extract", "resolver", "view", "test-project"];

export const packages: MonorepoPackageSettings = {
  cli: "packages/cli/package.json",
  map: "packages/map/package.json",
  converter: "packages/converter/package.json",
  extract: "packages/extract/package.json",
  interfaces: "packages/interfaces/package.json",
  resolver: "packages/resolver/package.json",
  view: "packages/view/package.json",
  "test-project": "packages/test-project/package.json",
}

export const jestConfigs: MonorepoPackageSettings = {
  cli: "packages/cli/jest.config.json",
  map: "packages/map/jest.config.json",
  converter: "packages/converter/jest.config.json",
  extract: "packages/extract/jest.config.json",
  interfaces: "packages/interfaces/jest.config.json",
  resolver: "packages/resolver/jest.config.json",
  view: "packages/view/jest.config.json",
  "test-project": undefined,
};

export const tsConfigs: MonorepoPackageSettings = {
  cli: "packages/cli/tsconfig.json",
  map: "packages/map/tsconfig.json",
  converter: "packages/converter/tsconfig.json",
  extract: "packages/extract/tsconfig.json",
  interfaces: "packages/interfaces/tsconfig.json",
  resolver: "packages/resolver/tsconfig.json",
  view: "packages/view/tsconfig.json",
  "test-project": undefined,
};

/**
 * relative path from package.
 */
export const buildcaches: MonorepoPackageSettings = {
  cli: "../../buildcache/cli/",
  map: "../../buildcache/map/",
  converter: "../../buildcache/converter/",
  extract: "../../buildcache/extract/",
  interfaces: "../../buildcache/interfaces/",
  resolver: "../../buildcache/resolver/",
  view: "../../buildcache/view/",
  "test-project": undefined,
};

export const tsConfigShared = "packages/tsconfig.shared.json";
