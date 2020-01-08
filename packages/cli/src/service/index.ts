import * as DependencyCruiserService from "./DependencyCruiserService";
import * as tsconfig from "tsconfig";

type GetPromiseValue<T> = T extends Promise<infer R> ? R : T;

export interface Option {
  tsconfigFilePath?: string;
  webpackConfigPath?: string;
  exclude?: string;
}

export const create = async (option: Option) => {
  const tsConfig = option.tsconfigFilePath && tsconfig.readFileSync(option.tsconfigFilePath);
  const webpackResolveOption = option.webpackConfigPath && require(option.webpackConfigPath).resolve;
  return {
    dependencyCruiser: DependencyCruiserService.create({ tsConfig, exclude: option.exclude, webpackResolveOption }),
  };
};

export type Type = GetPromiseValue<ReturnType<typeof create>>;
