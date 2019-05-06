import * as Types from "@app/types";

export interface State {
  flatDependencies: Types.FlatDependencies;
  treeData: Types.TreeData;
  links: Types.Link[];
  nodes: Types.Node[];
  rootSource: string;
}

export const DEFAULT_STATE: State = {
  flatDependencies: [],
  treeData: {
    resolved: "index.js",
    coreModule: false,
    followable: true,
    couldNotResolve: false,
    dependencyTypes: ["undetermined"],
    module: "./index.js",
    moduleSystem: "cjs",
    matchesDoNotFollow: false,
    children: [],
    circular: [],
  },
  links: [],
  nodes: [],
  rootSource: "index.js",
};
