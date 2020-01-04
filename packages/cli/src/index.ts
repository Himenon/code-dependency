import { createServer } from "./server";
import { gather } from "./utils";
import * as path from "path";
import * as Cli from "./cli";

import { SourceNotFoundError } from "./exceptions";

import * as Service from "./service";
import * as Config from "./config";

const main = async () => {
  const args = Cli.executeCommandLine();
  const executeRootPath = process.cwd();
  const isSourceAbsolutePath = args.source.startsWith("/");
  const absoluteRootPath = isSourceAbsolutePath ? args.source : path.join(executeRootPath, args.source);
  const pathList = await gather(absoluteRootPath);

  const filePathList = pathList.map(pathname => ({
    source: isSourceAbsolutePath ? path.relative(path.dirname(args.source), pathname) : path.relative(executeRootPath, pathname),
  }));
  const config = Config.create(args.port, absoluteRootPath, filePathList);
  const tsconfigFilePath = args.tsconfig && (args.tsconfig.startsWith("/") ? args.tsconfig : path.join(executeRootPath, args.tsconfig));

  const service = await Service.create({ tsconfigFilePath });
  const server = createServer(service, config);

  console.log(`Run: http://localhost:${args.port}`);
  server.listen(3000);
};

main().catch(error => {
  if (error instanceof SourceNotFoundError) {
    process.exit(0);
  } else {
    console.error(error);
    process.exit(1);
  }
});
