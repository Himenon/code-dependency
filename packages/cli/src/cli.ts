import commander from "commander";
import * as path from "path";

interface CLIArguments {
  source: string;
}

export const validateCliArguments = (args: commander.Command): CLIArguments => {
  if (typeof args["source"] !== "string") {
    throw new Error("Invalid source");
  }
  return {
    source: args["source"],
  };
};

export const executeCommandLine = (): CLIArguments => {
  const pkg = require(path.resolve(__dirname, "../package.json"));
  commander
    .version(pkg.version)
    .option("-s --source [value]", "Source Directory or File")
    .parse(process.argv);
  return validateCliArguments(commander);
};
