import * as Types from "@code-dependency/interfaces";
import { getDependencies } from "@code-dependency/map";
import chalk from "chalk";
import * as fs from "fs";
import * as open from "open";
import * as path from "path";
import { existFile, mkdirP } from "./filesystem";
import { createServer } from "./server";
import { GenerateFlatDependencyFunction } from "./types";

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
  return () => getDependencies({ source, executeDirectory: cwd, stripBasePath }, options);
};

const getBasePath = (cwd: string, target: string): string => {
  const source = path.resolve(cwd, path.normalize(target));
  const diff = path.relative(cwd, source);
  return path.dirname(path.join(cwd, diff));
};

export const startServeMessage = (address: string) => {
  console.log("");
  console.log("  ", chalk.blue(`Server      : ${address}`));
  console.log("  ", chalk.blue(`API Server  : ${address}/api`));
  console.log("");
  open(address);
};

export const startProjectServe = async (project: string, cwd: string, options: Types.ResolveOption, cut?: boolean, port: number = 7000) => {
  const stripBasePath: string | undefined = cut ? getBasePath(cwd, project) : undefined;
  const flatDependencies = await getFlatDependencies(cwd, project, stripBasePath, options);
  const server = await createServer(flatDependencies);
  await server.listen(port);
  startServeMessage(`http://localhost:${port}`);
};

/**
 * CSR用のファイルをもとに、サーバーを立てる
 */
export const startLoadFileServe = async (filename: string, cwd: string, port: number = 7000) => {
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
export const outputCsrProps = async (file: string, cwd: string, options: Types.ResolveOption, cut: boolean, output: string | undefined) => {
  const stripBasePath: string | undefined = cut ? getBasePath(cwd, file) : undefined;
  const source = path.resolve(cwd, path.normalize(file));
  const flatDependencies = await getDependencies({ source, executeDirectory: cwd, stripBasePath }, options);
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
