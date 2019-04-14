import * as Types from "@app/types";

export interface State {
  flatDependencies: Types.FlatDependencies;
  treeData: Types.TreeData;
  links: Types.Link[];
  nodes: Types.Node[];
}

export const DEFAULT_STATE: State = {
  flatDependencies: [],
  treeData: {
    resolved: "inndex.js",
    coreModule: false,
    followable: true,
    couldNotResolve: false,
    dependencyTypes: ["undetermined"],
    module: "inndex.js",
    moduleSystem: "cjs",
    matchesDoNotFollow: false,
    children: [],
  },
  links: [],
  nodes: [],
};
