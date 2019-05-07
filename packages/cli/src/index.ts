#!/usr/bin/env node

import * as Types from "@code-dependency/interfaces";
import * as commander from "commander";
import * as path from "path";
import { outputCsrProps, startLoadFileServe, startProjectServe } from "./command";
import { distribution } from "./distribution";

process.on("unhandledRejection", console.dir);

interface CliReturnValue {
  file?: string;
  output?: string;
  serve?: boolean;
  input?: string;
  cut?: boolean;
  project?: string;
  staticDist?: string;
  args: string[];
}

const executeCommandLine = (): CliReturnValue => {
  const pkg = require(path.resolve(__dirname, "../../../package.json"));
  commander
    .version(pkg.version)
    .option("-f --file [value]", "Select your file.")
    .option("-o --output [value]", "Output file path.")
    .option("-s --serve", "Start server")
    .option("-i --input [value]", "input file.")
    .option("-c --cut", "cut base path.")
    .option("-p --project [value]", "project path.")
    .option("--static-dist [value]", "static distribution path")
    .parse(process.argv);
  return commander as CliReturnValue;
};

const main = async () => {
  const option = executeCommandLine();
  const cwd = process.cwd();
  const resolveOption: Types.ResolveOption = {
    alias: {},
    extensions: [".js", ".mjs", ".jsx", ".vue", ".ts", ".tsx", ".d.ts", ".coffee", ".litcoffee", ".coffee.md", ".csx", ".cjsx"],
  };
  if (option.args.length >= 1 && typeof option.args[0] === "string") {
    return startProjectServe(option.args[0], cwd, resolveOption, true);
  }
  if (option.serve && option.project) {
    return startProjectServe(option.project, cwd, resolveOption, option.cut);
  } else if (option.serve && option.input) {
    return startLoadFileServe(option.input, cwd);
  } else if (option.file) {
    return outputCsrProps(option.file, cwd, resolveOption, !!option.cut, option.output);
  } else if (option.staticDist) {
    return distribution(option.staticDist);
  }
};

main();
