import { MonorepoSettings, SharedSettings } from "./types";

export const monorepoSettings: MonorepoSettings = {
  cli: {
    version: {
      name: "@code-dependency/cli",
      value: "0.0.1-alpha.1",
    },
    packageJson: "packages/cli/package.json",
    tsConfig: "packages/cli/tsconfig.json",
    jestConfig: "packages/cli/jest.config.json"
  },
  map: {
    version: {
      name: "@code-dependency/map",
      value: "0.0.1-alpha.1",
    },
    packageJson: "packages/map/package.json",
    tsConfig: "packages/map/tsconfig.json",
    jestConfig: "packages/map/jest.config.json"
  },
  converter: {
    version: {
      name: "@code-dependency/converter",
      value: "0.0.1-alpha.1",
    },
    packageJson: "packages/converter/package.json",
    tsConfig: "packages/converter/tsconfig.json",
    jestConfig: "packages/converter/jest.config.json"
  },
  extract: {
    version: {
      name: "@code-dependency/extract",
      value: "0.0.1-alpha.1",
    },
    packageJson: "packages/extract/package.json",
    tsConfig: "packages/extract/tsconfig.json",
    jestConfig: "packages/extract/jest.config.json"
  },
  interfaces: {
    version: {
      name: "@code-dependency/interfaces",
      value: "0.0.1-alpha.1",
    },
    packageJson: "packages/interfaces/package.json",
    tsConfig: "packages/interfaces/tsconfig.json",
    jestConfig: "packages/interfaces/jest.config.json"
  },
  resolver: {
    version: {
      name: "@code-dependency/resolver",
      value: "0.0.1-alpha.1",
    },
    packageJson: "packages/resolver/package.json",
    tsConfig: "packages/resolver/tsconfig.json",
    jestConfig: "packages/resolver/jest.config.json"
  },
  view: {
    version: {
      name: "@code-dependency/view",
      value: "0.0.1-alpha.1",
    },
    packageJson: "packages/view/package.json",
    tsConfig: "packages/view/tsconfig.json",
    jestConfig: "packages/view/jest.config.json"
  },
  "test-project": {
    version: {
      name: "@code-dependency/test-project",
      value: "0.0.1-alpha.1",
    },
    packageJson: "packages/test-project/package.json",
    tsConfig: "packages/test-project/tsconfig.json",
    jestConfig: "packages/test-project/jest.config.json"
  },
}

export const sharedSettings: SharedSettings = {
  tsSharedConfig: "packages/tsconfig.shared.json"
}
