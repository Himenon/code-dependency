import * as webpack from "webpack";
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
  const webpackConfig: webpack.Configuration | webpack.Configuration[] | undefined =
    option.webpackConfigPath && eval("require")(option.webpackConfigPath).default;
  const webpackResolveOption = webpackConfig ? (Array.isArray(webpackConfig) ? webpackConfig[0].resolve : webpackConfig.resolve) : undefined;
  return {
    dependencyCruiser: DependencyCruiserService.create({ tsConfig, exclude: option.exclude, webpackResolveOption }),
  };
};

export type Type = GetPromiseValue<ReturnType<typeof create>>;
