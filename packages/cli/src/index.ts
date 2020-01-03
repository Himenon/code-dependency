import { createServer } from "./server";
import { gather } from "./utils";
import * as path from "path";
import * as Cli from "./cli";

import * as Service from "./service";
import * as Config from "./config";

const main = async () => {
  const args = Cli.executeCommandLine();
  const executeRootPath = process.cwd();
  const absoluteRootPath = args.source.startsWith("/") ? args.source : path.relative(executeRootPath, args.source);
  const pathList = await gather(absoluteRootPath);

  const config = Config.create(absoluteRootPath, pathList);
  const service = await Service.create();
  const server = createServer(service, config);

  console.log("Run: http://localhost:3000");
  server.listen(3000);
};

main().catch(error => {
  console.error(error);
});
