import * as path from "path";
import * as os from "os";

export interface Params {
  context?: string;
  source: string;
}

export const convertSourceToAbsolutePath = (source: string, context: string = process.cwd()): string => {
  if (source.startsWith("/")) {
    return source;
  }
  if (source.startsWith("~")) {
    return source.replace("~", os.homedir());
  }
  return path.resolve(process.cwd(), source);
};

export const create = ({ context = process.cwd(), source }: Params) => {
  const absolutePath = convertSourceToAbsolutePath(source);
  return {
    original: source,
    binRelativePath: path.relative(__dirname, source),
    rootDir: path.dirname(absolutePath),
    absoluteRootPath: absolutePath,
  };
};

export type Type = ReturnType<typeof create>;
