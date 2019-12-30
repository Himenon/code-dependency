import * as webpack from "webpack";
import { generateConfig } from "./webpack.config";
import * as webpackDevServer from "webpack-dev-server";

const main = async () => {
  const isProduction = process.env.NODE_ENV === "production";
  const config = generateConfig(isProduction);
  const compiler = webpack(config);
  const server = new webpackDevServer(compiler, {
    hot: true,
    open: true,
    historyApiFallback: true,
  });
  server.listen(9000);
};

main().catch(e => {
  if (e && e.message) {
    console.error(e.message);
  }
});
