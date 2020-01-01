import webpack from "webpack";
import { generateConfig } from "./webpack.config";

process.on("unhandledRejection", console.dir);

const isProduction = process.env.NODE_ENV === "production";

const main = async () => {
  const config = generateConfig({ isProduction });
  const compiler = webpack(config);
  compiler.run(err => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (err) {
      console.error(err);
    }
  });
};

// tslint:disable-next-line:no-console
main().catch(console.log);
