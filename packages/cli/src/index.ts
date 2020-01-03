import { createServer } from "./server";
import { gather } from "./utils";
import * as path from "path";
import * as Cli from "./cli";

import * as Service from "./service";
import * as Config from "./config";

const main = async () => {
  const args = Cli.executeCommandLine();
  const executeRootPath = process.cwd();
  const absoluteRootPath = args.source.startsWith("/") ? args.source : path.join(executeRootPath, args.source);
  const pathList = await gather(absoluteRootPath);

  const filePathList = pathList.map(pathname => ({ source: path.relative(executeRootPath, pathname) }));
  const config = Config.create(args.port, absoluteRootPath, filePathList);

  const service = await Service.create();
  const server = createServer(service, config);

  console.log(`Run: http://localhost:${args.port}`);
  server.listen(3000);
};

main().catch(error => {
  console.error(error);
});
