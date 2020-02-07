import * as path from "path";
import { FilePathObject } from "@code-dependency/view";

export interface Type {
  rendererType: "client" | "server";
  server: {
    port: number;
  };
  executeRootPath: string;
  absoluteRootPath: string;
  absoluteRootDirPath: string;
  filePathList: FilePathObject[];
}

export interface Params {
  rendererType: "client" | "server";
  port: number;
  absoluteRootPath: string;
  filePathList: FilePathObject[];
}

export const create = ({ rendererType, port, absoluteRootPath, filePathList }: Params): Type => {
  return {
    rendererType,
    server: {
      port,
    },
    executeRootPath: process.cwd(),
    absoluteRootPath,
    absoluteRootDirPath: path.dirname(absoluteRootPath),
    filePathList,
  };
};
