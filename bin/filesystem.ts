import * as fs from "fs";
import * as stringify from "json-stringify-pretty-compact";

export const readConfig = <T extends {}>(filename: string): T => {
  try {
    return JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }));
  } catch (e) {
    console.error(`Failed: ${filename}`);
    throw Error(e);
  }
};

export const saveConfig = <T extends {}>(filename: string, data: T) => {
  console.log(`Save file: ${filename}`);
  fs.writeFileSync(filename, stringify(data) + "\n", { encoding: "utf-8" });
};

export const mkdirP = (dirPath: string) => {
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    console.log(`Make dir : ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
  } else {
    console.log(`Already exists: ${dirPath}`);
  }
};
