import * as webpack from "webpack";
import { generateConfig } from "./webpack.config";

const main = async () => {
  const isProduction = process.env.NODE_ENV === "production";
  const config = generateConfig(isProduction);
  const compiler = webpack(config);
  compiler.run(err => {
    console.error(err);
  });
};

main().catch(e => {
  if (e && e.message) {
    console.error(e.message);
  }
});
