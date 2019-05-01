import * as fs from "fs";
import * as path from "path";

interface TsConfig {
  compilerOptions: {
    tsBuildInfoFile?: string;
  }
}

export const readTsConfig = (filename: string): TsConfig => {
  try {
    return JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }))
  } catch (e) {
    throw Error(`Failed ... ${filename}`)
  }
}

export const saveTsConfig = (filename: string, tsConfig: TsConfig) => {
  console.log(`Save ... ${filename}`);
  fs.writeFileSync(filename, JSON.stringify(tsConfig, null, 2) + "\n", { encoding: "utf-8" });
}

const packages: string[] = [
  "cli",
  "code-dependency",
  "converter",
  "extract",
  "interfaces",
  "resolver",
  "view",
]

const rewriteTsBuildInfoFile = () => {
  packages.map(pkg => {
    const tsConfigFileName = path.join("packages", pkg, "tsconfig.json");
    const cacheDir = path.join("packages", pkg, "buildcache");
    const tsConfig = readTsConfig(tsConfigFileName);
    fs.mkdirSync(cacheDir, { recursive: true });
    tsConfig.compilerOptions.tsBuildInfoFile = "buildcache/tsconfig.json.tsbuildinfo";
    saveTsConfig(tsConfigFileName, tsConfig);
  });
}

const flag: "reset" | "rewrite" | string | undefined = process.argv[2];

const main = () => {
  const runningCI: boolean = !!process.env.CI;
  if (!runningCI) {
    console.log("This scripts only run in ci environment.");
    return;
  }
  if (flag === "rewrite") {
    rewriteTsBuildInfoFile();
  }
}


main();
