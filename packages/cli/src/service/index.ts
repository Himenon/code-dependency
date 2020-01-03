import * as DependencyCruiserService from "./DependencyCruiserService";
import * as VizJsService from "./VizJsService";

type GetPromiseValue<T> = T extends Promise<infer R> ? R : T;

export const create = async () => {
  return {
    dependencyCruiser: DependencyCruiserService.create(),
    vizJs: VizJsService.create(),
  };
};

export type Type = GetPromiseValue<ReturnType<typeof create>>;
