import { getPaths } from "@code-dependency/view";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";
import { copyAssetFiles, mkdirP, readConfig, saveConfig } from "./filesystem";
import { StaticConfig } from "./types";
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");

const generateConfig = (config?: StaticConfig): StaticConfig => {
  return {
    projects: [],
    ...config,
  };
};

const generateHtml = (outputDir: string) => {
  const viewPaths = getPaths();
  console.log(viewPaths.public.index.html);
  console.log(outputDir);
  const config: webpack.Configuration = {
    mode: "production",
    entry: {
      "index.html": viewPaths.public.index.html,
    },
    output: {
      path: outputDir,
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: viewPaths.public.index.html,
        minify: false,
      }),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
        PUBLIC_URL: "/",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: "html-loader",
        },
      ],
    },
  };
  webpack(config).run((err, stats) => {
    if (err) {
      console.error(err);
    }
  });
};

export const distribution = async (staticDist: string) => {
  const distPath = path.join(process.cwd(), staticDist);
  const configPath = path.join(distPath, "config.json");
  const config = generateConfig(readConfig(configPath));
  mkdirP(distPath);
  const viewPaths = getPaths();
  await copyAssetFiles(viewPaths.build, distPath, [".css", ".js", ".json"]);
  mkdirP(path.join(distPath, "projects"));
  generateHtml(distPath);
  saveConfig(configPath, config);
};
