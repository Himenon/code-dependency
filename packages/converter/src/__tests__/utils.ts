import * as Types from "@code-dependency/interfaces";

export const makeTestData = (resolved: string, module: string): Types.Dependency => ({
  resolved,
  coreModule: false,
  followable: true,
  couldNotResolve: false,
  dependencyTypes: ["undetermined"],
  module,
  moduleSystem: "cjs",
  matchesDoNotFollow: false,
});
