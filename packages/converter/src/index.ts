import * as Types from "@code-dependency/interfaces";

/**
 * Flat Array --> Hierarcy Array
 */
export const converter = (inputDependencies: Types.InputSourceDependency[]) => (source: string): Types.TreeData => {
  // Initialize
  const root: Types.TreeData = {
    source,
    dependencies: [],
    children: [],
  };
  inputDependencies.forEach(child => {
    // Add root Dependencies
    if (child.source === root.source) {
      root.dependencies = child.dependencies;
    }
  });

  return root;
};
