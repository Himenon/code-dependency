export interface Type {
  executeRootPath: string;
  absoluteRootPath: string;
  fileList: string[];
}

export const create = (absoluteRootPath: string, fileList: string[]) => {
  return {
    executeRootPath: process.cwd(),
    absoluteRootPath,
    fileList,
  };
};
