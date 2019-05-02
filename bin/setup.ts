import { tsConfigs, packageNameList } from "./paths";
import { readConfig, saveConfig, mkdirP } from "./filesystem";
import { TsConfig } from "./types";
import * as path from "path";

const rewriteTsBuildInfoFile = () => {
  packageNameList.map(name => {
    const tsConfigFileName = tsConfigs[name];
    const tsConfig = readConfig<TsConfig>(tsConfigFileName);
    mkdirP(path.join("buildcache", name));
    tsConfig.extends = "../tsconfig.shared";
    tsConfig.compilerOptions.tsBuildInfoFile = `../../buildcache/${name}/tsconfig.json.tsbuildinfo`;
    saveConfig(tsConfigFileName, tsConfig);
  });
}

rewriteTsBuildInfoFile()
