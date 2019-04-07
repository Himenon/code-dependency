import { DevelopDependency, ExtractObject, Options } from "@my/types";

export const addAttributes = (resolved: string, extractObject: ExtractObject, options: Options): DevelopDependency => {
  return {
    ...extractObject,
    resolved,
  };
};
