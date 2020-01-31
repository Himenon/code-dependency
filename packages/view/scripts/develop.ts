import webpack from "webpack";
import { generateDistConfig } from "./configFactory";
import webpackDevServer from "webpack-dev-server";
import express from "express";
import resolvePkg from "resolve-pkg";

const find = (searchPath: string) => {
  const result = resolvePkg(searchPath);
  if (result) {
    return result;
  }
  throw new Error(`Not found: ${searchPath}`);
};

const main = async () => {
  const isProduction = process.env.NODE_ENV === "production";
  const config = generateDistConfig(isProduction);
  const compiler = webpack(config);
  const server = new webpackDevServer(compiler as any, {
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
    before: (app: express.Application, _server: any) => {
      app.use("/scripts/full.render.js", express.static(find("viz.js/full.render.js")));
      app.use("/scripts/react.development.js", express.static(find("react/umd/react.development.js")));
      app.use("/scripts/react-dom.development.js", express.static(find("react-dom/umd/react-dom.development.js")));
    },
  });
  server.listen(9000);
};

main().catch(e => {
  if (e && e.message) {
    console.error(e.message);
  }
});
