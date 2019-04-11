import { Options } from "@my/types";
import * as fs from "fs";
import * as path from "path";
import * as recursive from "recursive-readdir";

export const gather = async ({ source }: Options): Promise<string[]> => {
  return recursive(path.dirname(source)).then(value =>
    value.filter(pathname => {
      return fs.existsSync(pathname) && fs.statSync(pathname).isFile();
    }),
  );
};
