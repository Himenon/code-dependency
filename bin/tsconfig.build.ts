import { tsConfigs } from "./paths";
import { TsConfig } from "./types";
import { readConfig, saveConfig } from "./filesystem";

const isDistMode = process.argv[2] === "dist";

export const rewriteTsconfig = () => {
  const tsConfig = readConfig<TsConfig>(tsConfigs.view);
  tsConfig.compilerOptions.tsBuildInfoFile = isDistMode ? undefined : "buildcache/tsconfig.json.tsbuildinfo";
  saveConfig(tsConfigs.view, tsConfig);
};

rewriteTsconfig();
