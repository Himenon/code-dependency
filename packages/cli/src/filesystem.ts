import * as fs from "fs-extra";
import * as path from "path";

export const existFile = (filename: string) => {
  return fs.existsSync(filename) && fs.statSync(filename).isFile();
};

const isDirectory = (dirname: string) => {
  return fs.existsSync(dirname) && fs.statSync(dirname).isDirectory();
};

export const mkdirP = (dirPath: string) => {
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    console.log(`Make dir : ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
  } else {
    console.log(`Already exists: ${dirPath}`);
  }
};

export const readConfig = <T>(filename: string): T | undefined => {
  if (!existFile(filename)) {
    return;
  }
  try {
    return JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }));
  } catch (e) {
    console.error(e);
  }
  return undefined;
};

export const saveConfig = <T>(filename: string, config: T): void => {
  try {
    fs.writeFileSync(filename, JSON.stringify(config, null, 2), { encoding: "utf-8" });
  } catch (e) {
    console.error(e);
  }
};

export const copyAssetFiles = async (source: string, destination: string, extensions: string[]) => {
  console.log("");
  console.log(`  Copy  `);
  console.log(`      from ${source}`);
  console.log(`      to   ${destination}`);
  console.log("");
  await fs.copy(source, destination, {
    filter: (targetPath: string) => {
      return isDirectory(targetPath) || extensions.includes(path.extname(targetPath));
    },
    recursive: true,
  });
};
