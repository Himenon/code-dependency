import { buildcaches, tsConfigs, packageNameList } from "./paths";
import { readConfig, saveConfig, mkdirP } from "./filesystem";
import { TsConfig } from "./types";
import * as path from "path";

const rewriteTsBuildInfoFile = () => {
  packageNameList.map(name => {
    const tsConfigFileName = tsConfigs[name];
    const cacheDir = buildcaches[name];
    const tsConfig = readConfig<TsConfig>(tsConfigFileName);
    mkdirP(path.join("packages", name, cacheDir));
    tsConfig.extends = "../tsconfig.shared";
    tsConfig.compilerOptions.tsBuildInfoFile = "buildcache/tsconfig.json.tsbuildinfo";
    saveConfig(tsConfigFileName, tsConfig);
  });
}

rewriteTsBuildInfoFile()
