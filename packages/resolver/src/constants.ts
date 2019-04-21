import * as Types from "@code-dependency/interfaces";

export interface ResolutionAttribute {
  resolved: string | undefined;
  coreModule: boolean;
  followable: boolean;
  couldNotResolve: boolean;
  dependencyTypes: Types.DependencyTypes[];
}
