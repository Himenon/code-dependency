import { logger } from "./logger";
import { createServer } from "./server";
import * as Exporter from "./exporter";
import { gather } from "./utils";
import * as path from "path";
import * as Cli from "./cli";

import { SourcePathInvalidError } from "./exceptions";

import * as Service from "./service";
import * as Config from "./config";

const main = async () => {
  const args = Cli.executeCommandLine();
  const pathList = await gather(args.source.absoluteRootPath);

  const filePathList = pathList.map(pathname => ({
    source: path.relative(args.source.rootDir, pathname),
  }));
  const config = Config.create({
    port: args.port,
    absoluteRootPath: args.source.absoluteRootPath,
    filePathList,
    rendererType: args.engine === "dot" ? "server" : "client",
  });
  const tsconfigFilePath = args.tsConfig && args.tsConfig.absoluteRootPath;
  const webpackConfigPath = args.webpackConfig && args.webpackConfig.binRelativePath;
  const service = await Service.create({ tsconfigFilePath, webpackConfigPath, exclude: args.exclude, engine: args.engine });

  if (args.exportStatic) {
    const exporter = Exporter.create(service, config, args.dryRun);
    await exporter.generateStaticHtml(args.publicPath || "/", args.exportStatic.absoluteRootPath);
  } else {
    const server = createServer(service, config);
    logger.info(`Start: http://localhost:${args.port}/project`);
    server.listen(args.port);
  }
};

main().catch(error => {
  if (error instanceof SourcePathInvalidError) {
    process.exit(0);
  } else {
    console.error(error);
    process.exit(1);
  }
});
