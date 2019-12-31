import webpack from "webpack";
import { generateConfig } from "./webpack.config";
import cpx from "cpx";
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
  const config = generateConfig(isProduction);
  const compiler = webpack(config);
  compiler.run(err => {
    console.error(err);
    cpx.copySync(find("react-dom/umd/react-dom.production.min.js"), "dist/scripts/");
    cpx.copySync(find("react/umd/react.production.min.js"), "dist/scripts/");
    cpx.copySync(find("viz.js/viz.js"), "dist/scripts/");
    cpx.copySync(find("viz.js/full.render.js"), "dist/scripts/");
  });
};

main().catch(e => {
  if (e && e.message) {
    console.error(e.message);
  }
});
