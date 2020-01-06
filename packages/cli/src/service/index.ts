import * as DependencyCruiserService from "./DependencyCruiserService";
import * as VizJsService from "./VizJsService";
import * as fs from "fs";

type GetPromiseValue<T> = T extends Promise<infer R> ? R : T;

export interface Option {
  tsconfigFilePath?: string;
}

export const create = async (option: Option) => {
  const tsConfig = option.tsconfigFilePath && JSON.parse(fs.readFileSync(option.tsconfigFilePath, { encoding: "utf-8" }));
  return {
    dependencyCruiser: DependencyCruiserService.create({ tsConfig }),
    viz: VizJsService.create(),
  };
};

export type Type = GetPromiseValue<ReturnType<typeof create>>;
