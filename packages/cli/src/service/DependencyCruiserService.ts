import { cruise, format } from "dependency-cruiser";

export interface Option {
  tsConfig: any;
}

export const create = (option: Option) => {
  const getDependenciesDot = (source: string): string => {
    console.log(`cruise: ${source}`);
    const dependencies = cruise([source], { exclude: "node_modules", maxDepth: 99, combinedDependencies: true }, undefined, option.tsConfig);
    if (typeof dependencies.output !== "string") {
      return format(dependencies.output, "dot").output.toString();
    }
    throw new Error("dependency cruiser api.");
  };
  return {
    getDependenciesDot,
  };
};
