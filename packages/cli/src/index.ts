import * as CodeDependency from "@code-dependency/code-dependency";
import * as Types from "@code-dependency/interfaces";
import * as commander from "commander";
import * as fs from "fs";
import * as path from "path";
import { createServer } from "./server";

interface CliReturnValue {
  file?: string;
  output?: string;
  serve?: boolean;
  input?: string;
}

const executeCommandLine = (): CliReturnValue => {
  const pkg = require(path.resolve(__dirname, "../../../package.json"));
  commander
    .version(pkg.version)
    .option("-f --file [value]", "Select your file.")
    .option("-o --output [value]", "Output file path.")
    .option("-s --serve", "Start server")
    .option("-i --input [value]", "input file.")
    .parse(process.argv);
  return commander as CliReturnValue;
};

const main = async () => {
  const args = executeCommandLine();
  const options: Types.ResolveOption = {
    alias: {},
  };
  if (args.serve && args.input) {
    const inputFile = path.resolve(process.cwd(), args.input);
    console.log(`Load file .... ${inputFile}`);
    const flatDependencies: Types.FlatDependencies = require(inputFile);
    const server = createServer(flatDependencies);
    await server.listen(10005);
    console.log(`Serve start: http://localhost:10005`);
    return;
  }
  if (args.file) {
    const source = path.resolve(process.cwd(), path.normalize(args.file));
    const executeDirectory = process.cwd();
    const flatDependencies = await CodeDependency.getDependencies({ source, executeDirectory }, options);
    if (args.output) {
      const outputFile = path.resolve(executeDirectory, args.output);
      console.log(`Output: ${outputFile}`);
      fs.writeFileSync(outputFile, JSON.stringify({ flatDependencies }, null, 2), { encoding: "utf-8" });
    }
  }
};

main();
