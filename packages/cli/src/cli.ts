import commander from "commander";
import { SourceNotFoundError } from "./exceptions";
import pkg from "../package.json";

interface CLIArguments {
  source: string;
  port: number;
  tsconfig?: string;
}

export const validateCliArguments = (args: commander.Command): CLIArguments => {
  if (typeof args["source"] !== "string") {
    throw new SourceNotFoundError("`--source` arguments does not selected.");
  }
  return {
    source: args["source"],
    port: args["port"],
    tsconfig: args["tsconfig"],
  };
};

export const executeCommandLine = (): CLIArguments => {
  commander
    .version(pkg.version)
    .option("-s --source [value]", "Source Directory or File")
    .option("-p --port [value]", "Port number", 3000)
    .option("--tsconfig [value]", "tsconfig.json path", undefined)
    .parse(process.argv);
  return validateCliArguments(commander);
};
