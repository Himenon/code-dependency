import { tsConfigShared } from "./paths";
import { readConfig, saveConfig } from "./filesystem";
import { TsConfig } from "./types";

const isDistMode = process.argv[2] === "dist";

export const updateDistributionSettings = () => {
  const tsConfig = readConfig<TsConfig>(tsConfigShared);
  tsConfig.compilerOptions.sourceMap = isDistMode ? false : true;
  tsConfig.compilerOptions.declarationMap = isDistMode ? false : true;
  saveConfig(tsConfigShared, tsConfig);
}

updateDistributionSettings();
