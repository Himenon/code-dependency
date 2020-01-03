export interface Type {
  executeRootPath: string;
  absoluteRootPath: string;
  fileList: string[];
}

export const create = () => {
  return {
    executeRootPath: "",
    absoluteRootPath: "",
    fileList: [],
  };
};
