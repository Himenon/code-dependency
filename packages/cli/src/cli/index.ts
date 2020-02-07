import commander from "commander";
import { SourcePathInvalidError, CliArgumentError } from "../exceptions";
import * as PathFactory from "./PathFactory";

const isInvalidPath = require("is-invalid-path");

interface CLIArguments {
  source: PathFactory.Type;
  port: number;
  tsConfig?: PathFactory.Type;
  exclude?: string;
  webpackConfig?: PathFactory.Type;
  exportStatic?: PathFactory.Type;
  publicPath?: string;
  dryRun: boolean;
  engine?: "dot";
}

export const validateCliArguments = (args: commander.Command): CLIArguments => {
  if (typeof args["source"] !== "string" || isInvalidPath(args["source"])) {
    throw new SourcePathInvalidError("`--source` arguments does not selected.");
  }
  if (args["tsConfig"] && isInvalidPath(args["source"])) {
    throw new SourcePathInvalidError("`--source` arguments does not selected.");
  }
  if ("exportStatic" in args && typeof args["exportStatic"] !== "string") {
    throw new CliArgumentError("`--export-static` require 1 string argument.");
  }
  if ("publicPath" in args && typeof args["publicPath"] !== "string") {
    throw new CliArgumentError("`--public-path` require 1 string argument.");
  }
  return {
    source: PathFactory.create({ source: args["source"] }),
    port: args["port"],
    tsConfig: args["tsConfig"] && PathFactory.create({ source: args["tsConfig"] }),
    exclude: args["exclude"],
    webpackConfig: args["webpackConfig"] && PathFactory.create({ source: args["webpackConfig"] }),
    exportStatic: args["exportStatic"] && PathFactory.create({ source: args["exportStatic"] }),
    publicPath: args["publicPath"],
    dryRun: !!args["dryRun"],
    engine: args["engine"] === "dot" ? "dot" : undefined,
  };
};

export const executeCommandLine = (): CLIArguments => {
  commander
    .version(process.env.VERSION!) // add webpack.DefinePlugin
    .option("-s --source [directory]", "Source directory")
    .option("-p --port [number]", "Port number", 3000)
    .option("--ts-config [path]", "tsconfig.json path", undefined)
    .option("--webpack-config [path]", "webpack.config.js path (only js file)")
    .option("--exclude [string pattern]", "cruise exclude pattern", "node_modules")
    .option("--export-static [static directory]", "static file hosting directory")
    .option("--public-path [host public path]", "the base path for all the assets")
    .option("--dry-run", "only use --export-static option")
    .option("--engine <dot>", "already local installed graphviz. <https://www.graphviz.org/>")
    .parse(process.argv);
  return validateCliArguments(commander);
};
