import commander from "commander";
import pkg from "../package.json";

interface CLIArguments {
  source: string;
  port: number;
}

export const validateCliArguments = (args: commander.Command): CLIArguments => {
  if (typeof args["source"] !== "string") {
    throw new Error("Invalid source");
  }
  return {
    source: args["source"],
    port: args["port"],
  };
};

export const executeCommandLine = (): CLIArguments => {
  commander
    .version(pkg.version)
    .option("-s --source [value]", "Source Directory or File")
    .option("-p --port [value]", "Port number", 3000)
    .parse(process.argv);
  return validateCliArguments(commander);
};
