import { getDependencies } from "@code-dependency/code-dependency";
import * as Types from "@code-dependency/interfaces";
import * as fs from "fs";
import * as path from "path";
import { converter } from "../src/index";

const save = (filename: string, data: {}) => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), { encoding: "utf-8" });
  console.log(`Save file ... ${filename}`);
};

const main = async () => {
  const options: Types.ResolveOption = {
    alias: {},
  };
  const source: string = path.normalize(process.argv[2]);
  const executeDirectory = process.cwd();
  const flatDependencies = await getDependencies({ source, executeDirectory }, options);
  save("./data/flatDependencies.json", { flatDependencies });
  save("./data/treeData.json", { treeData: converter(source, flatDependencies) });
};

main();
