import * as Types from "@code-dependency/interfaces";

export const converter = (source: string | Types.Dependency, inputDependencies: Types.InputSourceDependency[]): Types.TreeData => {
  const root: Types.TreeData =
    typeof source === "string"
      ? {
          resolved: source,
          coreModule: false,
          followable: true,
          couldNotResolve: false,
          dependencyTypes: ["undetermined"],
          module: source,
          moduleSystem: "cjs",
          matchesDoNotFollow: false,
          children: [],
        }
      : {
          ...source,
          children: [],
        };
  const rootData = inputDependencies.find(child => root.resolved === child.source);
  if (rootData) {
    root.children = rootData.dependencies.map(data => converter(data, inputDependencies));
  }
  return root;
};
