import * as fs from "fs";
import * as path from "path";

interface TsConfig {
  compilerOptions: {
    tsBuildInfoFile?: string;
  };
}

const targets = [path.join(__dirname, "../tsconfig.json")];

export const readTsConfig = (filename: string): TsConfig => {
  try {
    return JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }));
  } catch (e) {
    throw Error(`Failed ... ${filename}`);
  }
};

export const saveTsConfig = (filename: string, tsConfig: TsConfig) => {
  console.log(`Save ... ${filename}`);
  fs.writeFileSync(filename, JSON.stringify(tsConfig, null, 2) + "\n", { encoding: "utf-8" });
};

export const resetTsBuildInfoFile = () => {
  targets.map(tsConfigFileName => {
    const tsConfig = readTsConfig(tsConfigFileName);
    tsConfig.compilerOptions.tsBuildInfoFile = undefined;
    saveTsConfig(tsConfigFileName, tsConfig);
  });
};
