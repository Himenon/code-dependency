import * as path from "path";
const { readConfig, saveConfig } = require("../../../bin/filesystem");

export const rewriteTsconfig = (isDistMode: boolean) => {
  const tsConfigPath = path.join(__dirname, "../tsconfig.json");
  const tsConfig = readConfig(tsConfigPath);
  tsConfig.compilerOptions.tsBuildInfoFile = isDistMode ? undefined : "../../buildcache/view/tsconfig.json.tsbuildinfo";
  saveConfig(tsConfigPath, tsConfig);
};
