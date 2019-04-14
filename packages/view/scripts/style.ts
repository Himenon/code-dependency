process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

import * as glob from "glob";
import * as path from "path";
import * as webpack from "webpack";
import { paths } from "../config/paths";
import { plugins } from "./webpack/plugins";
import { rules } from "./webpack/rules";

process.on("unhandledRejection", err => {
  throw err;
});
const entries: { [key: string]: string } = { "style.scss": "./src/style.scss" };

glob.sync("./src/**/*.scss").map(filepath => {
  const filename = path.basename(filepath);
  if (filename.charAt(0) !== "_") {
    entries[filename] = filepath;
  }
});

const config: webpack.Configuration = {
  mode: "production",
  target: "node",
  entry: entries,
  output: {
    // library名を指定しないことでdefault exportにする
    libraryTarget: "commonjs",
    path: paths.appLib,
  },
  plugins: [plugins.MiniCssExtractPlugin()],
  module: {
    rules: [rules.assetsLoader({ isEnvDevelopment: false, isEnvProduction: true, shouldUseRelativeAssetPaths: false })],
  },
};

export default config;
