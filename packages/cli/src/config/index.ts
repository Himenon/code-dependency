import * as path from "path";
import { FilePathObject } from "@code-dependency/view";

export interface Type {
  server: {
    port: number;
  };
  executeRootPath: string;
  absoluteRootPath: string;
  absoluteRootDirPath: string;
  filePathList: FilePathObject[];
}

export const create = (port: number, absoluteRootPath: string, filePathList: FilePathObject[]): Type => {
  return {
    server: {
      port,
    },
    executeRootPath: process.cwd(),
    absoluteRootPath,
    absoluteRootDirPath: path.dirname(absoluteRootPath),
    filePathList,
  };
};
