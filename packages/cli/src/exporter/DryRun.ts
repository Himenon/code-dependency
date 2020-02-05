import * as rimraf from "rimraf";
import * as fs from "fs";

export interface DryRunCache {
  [pathname: string]: "done" | "pending";
}

export const create = (filename: string, dryRun: boolean) => {
  const getDryRunCache = (): DryRunCache => {
    if (dryRun && fs.existsSync(filename)) {
      return JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }));
    } else {
      return {};
    }
  };

  const updateDryRunCache = (cache: DryRunCache) => {
    if (dryRun) {
      fs.writeFileSync(filename, JSON.stringify(cache, null, 2), { encoding: "utf-8" });
    }
  };

  const deleteDryRunCache = () => {
    if (dryRun) {
      rimraf.sync(filename);
    }
  };

  return {
    getDryRunCache,
    updateDryRunCache,
    deleteDryRunCache,
  };
};
