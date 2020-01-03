import resolvePkg from "resolve-pkg";
export * from "./api";

export const find = (searchPath: string) => {
  const result = resolvePkg(searchPath);
  if (result) {
    return result;
  }
  throw new Error(`Not found: ${searchPath}`);
};
