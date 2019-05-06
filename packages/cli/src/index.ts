#!/usr/bin/env node

import * as Types from "@code-dependency/interfaces";
import * as CodeDependency from "@code-dependency/map";
import chalk from "chalk";
import * as commander from "commander";
import * as fs from "fs";
import * as open from "open";
import * as path from "path";
import { existFile, mkdirP } from "./filesystem";
import { createServer } from "./server";
import { GenerateFlatDependencyFunction } from "./types";

process.on("unhandledRejection", console.dir);

interface CliReturnValue {
  file?: string;
  output?: string;
  serve?: boolean;
  input?: string;
  cut?: boolean;
  project?: string;
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
    .parse(process.argv);
  return commander as CliReturnValue;
};

const getFlatDependencies = (
  cwd: string,
  fileName: string,
  stripBasePath: string | undefined,
  options: Types.ResolveOption,
): GenerateFlatDependencyFunction => {
  const source = path.resolve(cwd, path.normalize(fileName));
  if (!existFile(source)) {
    console.log(chalk.black.bgRed(" Not fount "), chalk.red(`${source}`));
    process.exit();
  } else {
    console.log(chalk.black.bgGreen(" Load "), chalk.green(`${source}`));
  }
  return () => CodeDependency.getDependencies({ source, executeDirectory: cwd, stripBasePath }, options);
};

const getBasePath = (cwd: string, target: string): string => {
  const source = path.resolve(cwd, path.normalize(target));
  const diff = path.relative(cwd, source);
  return path.dirname(path.join(cwd, diff));
};

const startServeMessage = (address: string) => {
  console.log("");
  console.log("  ", chalk.blue(`Server      : ${address}`));
  console.log("  ", chalk.blue(`API Server  : ${address}/api`));
  console.log("");
  open(address);
};

const startProjectServe = async (project: string, cwd: string, options: Types.ResolveOption, cut?: boolean, port: number = 7000) => {
  const stripBasePath: string | undefined = cut ? getBasePath(cwd, project) : undefined;
  const flatDependencies = await getFlatDependencies(cwd, project, stripBasePath, options);
  const server = await createServer(flatDependencies);
  await server.listen(port);
  startServeMessage(`http://localhost:${port}`);
};

/**
 * CSR用のファイルをもとに、サーバーを立てる
 */
const startLoadFileServe = async (filename: string, cwd: string, port: number = 7000) => {
  const source = path.resolve(cwd, filename);
  if (!existFile(source)) {
    console.log(chalk.black.bgRed(" Not fount "), chalk.red(`${source}`));
    process.exit();
  } else {
    console.log(chalk.black.bgGreen(" Load "), chalk.green(`${source}`));
  }
  const csrProps: Types.CsrProps = require(source);
  const server = await createServer(() => Promise.resolve(csrProps.flatDependencies));
  await server.listen(port);
  startServeMessage(`http://localhost:${port}`);
};

/**
 * ターゲットファイルを元にCSR用のPropsを生成する.
 */
const outputCsrProps = async (file: string, cwd: string, options: Types.ResolveOption, cut: boolean, output: string | undefined) => {
  const stripBasePath: string | undefined = cut ? getBasePath(cwd, file) : undefined;
  const source = path.resolve(cwd, path.normalize(file));
  const flatDependencies = await CodeDependency.getDependencies({ source, executeDirectory: cwd, stripBasePath }, options);
  if (output) {
    const outputFile = path.resolve(cwd, output);
    const csrProps: Types.CsrProps = { flatDependencies };
    mkdirP(path.dirname(outputFile));
    fs.writeFileSync(outputFile, JSON.stringify(csrProps, null, 2), { encoding: "utf-8" });
    console.log(chalk.black.bgGreen(" Save "), chalk.green(`${outputFile}`));
    console.log("");
    console.log("      ", `Strip Base Path: ${cut ? stripBasePath : "no striped"}`);
    console.log("");
  }
};

const main = async () => {
  const option = executeCommandLine();
  const cwd = process.cwd();
  const resolveOption: Types.ResolveOption = {
    alias: {},
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
  }
};

main();
