import { FilePathObject } from "@code-dependency/view";

export interface Type {
  executeRootPath: string;
  absoluteRootPath: string;
  filePathList: FilePathObject[];
}

export const create = (absoluteRootPath: string, filePathList: FilePathObject[]): Type => {
  return {
    executeRootPath: process.cwd(),
    absoluteRootPath,
    filePathList,
  };
};
