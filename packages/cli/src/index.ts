import { createServer } from "./server";
import { gather } from "./gather";
import * as path from "path";

import * as Service from "./service";
import * as Config from "./config";

const main = async () => {
  const service = await Service.create();
  const config = Config.create();
  const project = path.join(process.cwd(), "../view/src");
  const pathList = await gather(project);
  const relativeRoot = path.join(path.dirname(process.cwd()), "view");
  const server = await createServer(service, config);

  console.log("Run: http://localhost:3000");
  server.listen(3000);
};

main().catch(error => {
  console.error(error);
});
