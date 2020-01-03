import { monorepoSettings } from "./settings";
import { readConfig, saveConfig, mkdirP } from "./filesystem";
import { TsConfig } from "./types";
import * as path from "path";

const rewriteTsBuildInfoFile = () => {
  Object.entries(monorepoSettings).map(entry => {
    const [name, settings] = entry;
    const tsConfig = readConfig<TsConfig>(settings.tsConfig);
    mkdirP(path.join("buildcache", name));
    tsConfig.extends = "../tsconfig.shared";
    tsConfig.compilerOptions.tsBuildInfoFile = `../../buildcache/${name}/tsconfig.json.tsbuildinfo`;
    saveConfig(settings.tsConfig, tsConfig);
  });
};

rewriteTsBuildInfoFile();
