import * as fs from "fs";

export const existFile = (filename: string) => {
  return fs.existsSync(filename) && fs.statSync(filename).isFile();
};

export const mkdirP = (dirPath: string) => {
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    console.log(`Make dir : ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
  } else {
    console.log(`Already exists: ${dirPath}`);
  }
};
