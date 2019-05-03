#!/usr/bin/env node

import * as Types from "@code-dependency/interfaces";
import * as CodeDependency from "@code-dependency/map";
import * as commander from "commander";
import * as fs from "fs";
import * as path from "path";
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
  return () => CodeDependency.getDependencies({ source, executeDirectory: cwd, stripBasePath }, options);
};

const getBasePath = (cwd: string, target: string): string => {
  const source = path.resolve(cwd, path.normalize(target));
  const diff = path.relative(cwd, source);
  return path.dirname(path.join(cwd, diff));
};

const main = async () => {
  const args = executeCommandLine();
  const cwd = process.cwd();
  const options: Types.ResolveOption = {
    alias: {},
  };
  const DEFAULT_PORT = 7000;
  if (args.serve && args.project) {
    const stripBasePath: string | undefined = args.cut ? getBasePath(cwd, args.project) : undefined;
    const flatDependencies = await getFlatDependencies(cwd, args.project, stripBasePath, options);
    const server = await createServer(flatDependencies);
    await server.listen(DEFAULT_PORT);
    console.log(`Serve start: http://localhost:${DEFAULT_PORT}`);
    return;
  } else if (args.serve && args.input) {
    const inputFile = path.resolve(cwd, args.input);
    console.log(`Load file .... ${inputFile}`);
    const flatDependencies: Types.FlatDependencies = require(inputFile);
    const server = await createServer(() => Promise.resolve(flatDependencies));
    await server.listen(DEFAULT_PORT);
    console.log(`Serve start: http://localhost:${DEFAULT_PORT}`);
    return;
  } else if (args.file) {
    const stripBasePath: string | undefined = args.cut ? getBasePath(cwd, args.file) : undefined;
    const flatDependencies = await getFlatDependencies(cwd, args.file, stripBasePath, options);
    if (args.output) {
      const outputFile = path.resolve(cwd, args.output);
      fs.writeFileSync(outputFile, JSON.stringify({ flatDependencies }, null, 2), { encoding: "utf-8" });
    }
    return;
  }
};

main();
