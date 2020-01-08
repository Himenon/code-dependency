import commander from "commander";
import { SourcePathInvalidError } from "../exceptions";
import * as PathFactory from "./PathFactory";

const isInvalidPath = require("is-invalid-path");

interface CLIArguments {
  source: PathFactory.Type;
  port: number;
  tsconfig?: PathFactory.Type;
  exclude?: string;
  webpackConfig?: PathFactory.Type;
}

export const validateCliArguments = (args: commander.Command): CLIArguments => {
  if (typeof args["source"] !== "string" || isInvalidPath(args["source"])) {
    throw new SourcePathInvalidError("`--source` arguments does not selected.");
  }
  if (args["tsconfig"] && isInvalidPath(args["source"])) {
    throw new SourcePathInvalidError("`--source` arguments does not selected.");
  }
  return {
    source: PathFactory.create({ source: args["source"] }),
    port: args["port"],
    tsconfig: args["tsconfig"] && PathFactory.create({ source: args["tsconfig"] }),
    exclude: args["exclude"],
    webpackConfig: args["webpackConfig"] && PathFactory.create({ source: args["webpackConfig"] }),
  };
};

export const executeCommandLine = (): CLIArguments => {
  commander
    .version(process.env.VERSION!) // add webpack.DefinePlugin
    .option("-s --source [value]", "Source Directory or File")
    .option("-p --port [value]", "Port number", 3000)
    .option("--tsconfig [value]", "tsconfig.json path", undefined)
    .option("--webpack-config [value]", "webpack.config.json path")
    .option("--exclude [value]", "exclude pattern", "node_modules")
    .parse(process.argv);
  return validateCliArguments(commander);
};
