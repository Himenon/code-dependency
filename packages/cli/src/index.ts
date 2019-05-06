#!/usr/bin/env node

import * as Types from "@code-dependency/interfaces";
import * as CodeDependency from "@code-dependency/map";
import chalk from "chalk";
import * as commander from "commander";
import * as fs from "fs";
import * as open from "open";
import * as path from "path";
import { existFile } from "./filesystem";
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
    console.log(chalk.black.bgRed(" Error "), chalk.red(`Not fount: ${source}`));
    process.exit();
  } else {
    console.log(chalk.black.bgBlueBright(" Watch "), chalk.blueBright(`Entry: ${source}`));
  }
  return () => CodeDependency.getDependencies({ source, executeDirectory: cwd, stripBasePath }, options);
};

const getBasePath = (cwd: string, target: string): string => {
  const source = path.resolve(cwd, path.normalize(target));
  const diff = path.relative(cwd, source);
  return path.dirname(path.join(cwd, diff));
};

const serveProjectDependency = async (project: string, cwd: string, options: Types.ResolveOption, cut?: boolean, port: number = 7000) => {
  const stripBasePath: string | undefined = cut ? getBasePath(cwd, project) : undefined;
  const flatDependencies = await getFlatDependencies(cwd, project, stripBasePath, options);
  const server = await createServer(flatDependencies);
  await server.listen(port);
  const address = `http://localhost:${port}`;
  console.log("");
  console.log("  ", chalk.blue(`Server      : ${address}`));
  console.log("  ", chalk.blue(`API Server  : ${address}/api`));
  console.log("");
  open(address);
};

const main = async () => {
  const option = executeCommandLine();
  const cwd = process.cwd();
  const resolveOption: Types.ResolveOption = {
    alias: {},
  };
  const DEFAULT_PORT = 7000;
  if (option.args.length >= 1 && typeof option.args[0] === "string") {
    return serveProjectDependency(option.args[0], cwd, resolveOption, true);
  }
  if (option.serve && option.project) {
    return serveProjectDependency(option.project, cwd, resolveOption, option.cut);
  } else if (option.serve && option.input) {
    const inputFile = path.resolve(cwd, option.input);
    console.log(`Load file .... ${inputFile}`);
    const flatDependencies: Types.FlatDependencies = require(inputFile);
    const server = await createServer(() => Promise.resolve(flatDependencies));
    await server.listen(DEFAULT_PORT);
    console.log(`Serve start: http://localhost:${DEFAULT_PORT}`);
    return;
  } else if (option.file) {
    const stripBasePath: string | undefined = option.cut ? getBasePath(cwd, option.file) : undefined;
    const flatDependencies = await getFlatDependencies(cwd, option.file, stripBasePath, resolveOption);
    if (option.output) {
      const outputFile = path.resolve(cwd, option.output);
      fs.writeFileSync(outputFile, JSON.stringify({ flatDependencies }, null, 2), { encoding: "utf-8" });
    }
    return;
  }
};

main();
