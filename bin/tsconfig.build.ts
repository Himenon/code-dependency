import { monorepoSettings } from "./settings";
import { TsConfig } from "./types";
import { readConfig, saveConfig } from "./filesystem";

export const rewriteTsconfig = (isDistMode: boolean) => {
  const tsConfig = readConfig<TsConfig>(monorepoSettings.view.tsConfig);
  tsConfig.compilerOptions.tsBuildInfoFile = isDistMode ? undefined : "../../buildcache/view/tsconfig.json.tsbuildinfo";
  saveConfig(monorepoSettings.view.tsConfig, tsConfig);
};
