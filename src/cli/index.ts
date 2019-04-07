import * as commander from "commander";
import * as path from "path";
import * as TsImportView from "../";

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

const main = () => {
  const args = executeCommandLine();
  if (args.file) {
    const inputTsFile = path.resolve(process.cwd(), path.normalize(args.file));
    const result = TsImportView.Extract.getDeps(inputTsFile);
    console.log(result);
  }
};

main();
