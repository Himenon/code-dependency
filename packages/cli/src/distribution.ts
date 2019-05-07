import { getPaths } from "@code-dependency/view";
import * as path from "path";
import { copyAssetFiles, mkdirP, readConfig, saveConfig } from "./filesystem";
import { StaticConfig } from "./types";

const generateConfig = (config?: StaticConfig): StaticConfig => {
  return {
    projects: [],
    ...config,
  };
};

export const distribution = async (staticDist: string) => {
  const distPath = path.join(process.cwd(), staticDist);
  const configPath = path.join(distPath, "config.json");
  const config = generateConfig(readConfig(configPath));
  mkdirP(distPath);
  const viewPaths = getPaths();
  await copyAssetFiles(viewPaths.build, distPath, [".css", ".js", ".html", ".json"]);
  mkdirP(path.join(distPath, "projects"));
  saveConfig(configPath, config);
};
