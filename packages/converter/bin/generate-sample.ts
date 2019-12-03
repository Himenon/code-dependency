import * as Types from "@code-dependency/interfaces";
import * as CodeDependency from "@code-dependency/map";
import * as fs from "fs";
import * as path from "path";
import { converter } from "../src/index";

const executeDirectory = process.cwd();
const stripBasePath = path.dirname(path.dirname(process.cwd()));

const save = (filename: string, data: {}) => {
  const absolutePath = path.resolve(executeDirectory, filename);
  fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2), { encoding: "utf-8" });
  console.log(`Save file ... ${absolutePath}`);
};

const main = async () => {
  const options: Types.ResolveOption = {
    alias: {},
    extensions: [".js", ".mjs", ".jsx", ".vue", ".ts", ".tsx", ".d.ts", ".coffee", ".litcoffee", ".coffee.md", ".csx", ".cjsx"],
  };
  console.log(stripBasePath);
  const source: string = path.resolve(executeDirectory, path.normalize(process.argv[2]));
  const convertSource = path.relative(stripBasePath, source);
  const flatDependencies = await CodeDependency.getDependencies({ source, executeDirectory, stripBasePath }, options);
  const csrProps: Types.CsrProps = { flatDependencies };
  save("./sample/csrProps.json", csrProps);
  save("./sample/tree-data.json", { treeData: converter(convertSource, flatDependencies) });
};

main().catch(console.error);
