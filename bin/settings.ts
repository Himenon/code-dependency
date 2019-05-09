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
      name: "@code-dependency/cli",
      value: "0.0.1-alpha.1",
    },
    packageJson: "packages/cli/package.json",
    tsConfig: "packages/cli/tsconfig.json",
    jestConfig: "packages/cli/jest.config.json"
  },
  converter: {
    version: {
      name: "@code-dependency/cli",
      value: "0.0.1-alpha.1",
    },
    packageJson: "packages/cli/package.json",
    tsConfig: "packages/cli/tsconfig.json",
    jestConfig: "packages/cli/jest.config.json"
  },
  extract: {
    version: {
      name: "@code-dependency/cli",
      value: "0.0.1-alpha.1",
    },
    packageJson: "packages/cli/package.json",
    tsConfig: "packages/cli/tsconfig.json",
    jestConfig: "packages/cli/jest.config.json"
  },
  interfaces: {
    version: {
      name: "@code-dependency/cli",
      value: "0.0.1-alpha.1",
    },
    packageJson: "packages/cli/package.json",
    tsConfig: "packages/cli/tsconfig.json",
    jestConfig: "packages/cli/jest.config.json"
  },
  resolver: {
    version: {
      name: "@code-dependency/cli",
      value: "0.0.1-alpha.1",
    },
    packageJson: "packages/cli/package.json",
    tsConfig: "packages/cli/tsconfig.json",
    jestConfig: "packages/cli/jest.config.json"
  },
  view: {
    version: {
      name: "@code-dependency/cli",
      value: "0.0.1-alpha.1",
    },
    packageJson: "packages/cli/package.json",
    tsConfig: "packages/cli/tsconfig.json",
    jestConfig: "packages/cli/jest.config.json"
  },
  "test-project": {
    version: {
      name: "@code-dependency/cli",
      value: "0.0.1-alpha.1",
    },
    packageJson: "packages/cli/package.json",
    tsConfig: "packages/cli/tsconfig.json",
    jestConfig: "packages/cli/jest.config.json"
  },
}

export const sharedSettings: SharedSettings = {
  tsSharedConfig: "packages/tsconfig.shared.json"
}
