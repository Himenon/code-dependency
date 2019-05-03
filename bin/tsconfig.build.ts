import { tsConfigs } from "./paths";
import { TsConfig } from "./types";
import { readConfig, saveConfig } from "./filesystem";

export const rewriteTsconfig = (isDistMode: boolean) => {
  const tsConfig = readConfig<TsConfig>(tsConfigs.view);
  tsConfig.compilerOptions.tsBuildInfoFile = isDistMode ? undefined : "../../buildcache/view/tsconfig.json.tsbuildinfo";
  saveConfig(tsConfigs.view, tsConfig);
};
