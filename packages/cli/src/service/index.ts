import * as DependencyCruiserService from "./DependencyCruiserService";
import * as fs from "fs";
import * as tsconfig from "tsconfig";

type GetPromiseValue<T> = T extends Promise<infer R> ? R : T;

export interface Option {
  tsconfigFilePath?: string;
}

export const create = async (option: Option) => {
  const tsConfig = option.tsconfigFilePath && tsconfig.readFileSync(option.tsconfigFilePath);
  return {
    dependencyCruiser: DependencyCruiserService.create({ tsConfig }),
  };
};

export type Type = GetPromiseValue<ReturnType<typeof create>>;
