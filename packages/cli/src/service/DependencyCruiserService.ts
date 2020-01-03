import { cruise, format } from "dependency-cruiser";

export const create = () => {
  const getDependenciesDot = (source: string): string => {
    const dependencies = cruise([source], { exclude: "node_modules" });
    if (typeof dependencies.output !== "string") {
      return format(dependencies.output, "dot").output.toString();
    }
    throw new Error("dependency cruiser api.");
  };
  return {
    getDependenciesDot,
  };
};
