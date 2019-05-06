import * as fs from "fs";

export const existFile = (filename: string) => {
  return fs.existsSync(filename) && fs.statSync(filename).isFile();
};
