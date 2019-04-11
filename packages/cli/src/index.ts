import * as TsImportView from "@code-dependency/code-dependency";
import * as Types from "@code-dependency/interfaces";
import * as commander from "commander";
import * as path from "path";

interface CliReturnValue {
  file?: string;
}

const executeCommandLine = (): CliReturnValue => {
  const pkg = require(path.resolve(__dirname, "../../package.json"));
  commander
    .version(pkg.version)
    .option("-f --file [value]", "Select your file.")
    .parse(process.argv);
  return commander as CliReturnValue;
};

const main = async () => {
  const args = executeCommandLine();
  const options: Types.ResolveOption = {
    bustTheCache: true,
    alias: {},
  };
  if (args.file) {
    const source = path.resolve(process.cwd(), path.normalize(args.file));
    const executeDirectory = process.cwd();
    const result = await TsImportView.execute({ source, executeDirectory }, options);
    console.log(result);
  }
};

main();
