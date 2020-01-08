import * as webpack from "webpack";
import { cruise, format } from "dependency-cruiser";
import { logger } from "../logger";

export interface Option {
  tsConfig: any;
  exclude?: string;
  webpackResolveOption?: webpack.Resolve;
}

export const create = (option: Option) => {
  const getDependenciesDot = (source: string): string => {
    logger.info(`cruise: ${source}`);
    const dependencies = cruise(
      [source],
      { tsPreCompilationDeps: true, exclude: option.exclude },
      option.webpackResolveOption,
      option.tsConfig,
    );
    if (typeof dependencies.output !== "string") {
      return format(dependencies.output, "dot").output.toString();
    }
    throw new Error("dependency cruiser api.");
  };
  return {
    getDependenciesDot,
  };
};
