import { Options } from "@code-dependency/interfaces";
import * as fs from "fs";
import * as recursive from "recursive-readdir";

export const gather = async ({ projectDirectory }: Options): Promise<string[]> => {
  return recursive(projectDirectory).then(value =>
    value.filter(pathname => {
      return fs.existsSync(pathname) && fs.statSync(pathname).isFile();
    }),
  );
};
