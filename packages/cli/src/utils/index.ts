import * as fs from "fs";
import * as path from "path";
import recursive from "recursive-readdir";
import resolvePkg from "resolve-pkg";

export const find = (searchPath: string) => {
  const result = resolvePkg(searchPath, { cwd: __dirname });
  if (result) {
    return result;
  }
  throw new Error(`Not found: ${searchPath}`);
};

export const gather = async (projectRoot: string): Promise<string[]> => {
  const filePathList = await recursive(projectRoot, [
    (file: string, stats: fs.Stats) => {
      if (stats.isSymbolicLink()) {
        return true;
      }
      return false;
    },
  ]);
  return filePathList.filter(pathname => {
    return fs.existsSync(pathname) && fs.statSync(pathname).isFile() && [".js", ".jsx", ".ts", ".tsx"].includes(path.extname(pathname));
  });
};
