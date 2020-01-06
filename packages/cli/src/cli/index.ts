import commander from "commander";
import { SourcePathInvalidError } from "../exceptions";
import * as PathFactory from "./PathFactory";

const isInvalidPath = require("is-invalid-path");

interface CLIArguments {
  source: PathFactory.Type;
  port: number;
  tsconfig?: PathFactory.Type;
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
  };
};

export const executeCommandLine = (): CLIArguments => {
  commander
    .version(process.env.VERSION)
    .option("-s --source [value]", "Source Directory or File")
    .option("-p --port [value]", "Port number", 3000)
    .option("--tsconfig [value]", "tsconfig.json path", undefined)
    .parse(process.argv);
  return validateCliArguments(commander);
};
