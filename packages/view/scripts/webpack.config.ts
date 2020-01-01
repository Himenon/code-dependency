import * as webpack from "webpack";
import * as path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
// import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CopyPlugin from "copy-webpack-plugin";
import resolvePkg from "resolve-pkg";
import ScriptExtHtmlWebpackPlugin from "script-ext-html-webpack-plugin";

// const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const rootPath = path.resolve(__dirname, "../");
const appPath = (nextPath: string) => path.join(rootPath, nextPath);
const pkg = require("../package.json");

export const find = (searchPath: string) => {
  const result = resolvePkg(searchPath);
  if (result) {
    return result;
  }
  throw new Error(`Not found: ${searchPath}`);
};

export const generatePublicPath = (isProduction: boolean): string => {
  if (isProduction) {
    return pkg.homepage;
  }
  return "http://localhost:9000";
};

export interface Option {
  output: webpack.Output;
  isProduction: boolean;
  isLibrary: boolean;
  entry: webpack.Entry;
  splitChunks: webpack.Options.Optimization["splitChunks"];
}

export const generateConfig = ({ isProduction, isLibrary, ...option }: Option): webpack.Configuration => {
  // const isCI = process.env.CI;
  const publicPath = generatePublicPath(isProduction);

  const tsLoader: webpack.RuleSetUse = {
    loader: "ts-loader",
    options: {
      configFile: "tsconfig.json",
      transpileOnly: true,
    },
  };

  const babelLoader: webpack.RuleSetUse = {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      presets: ["@babel/preset-env"],
    },
  };

  const cssLoaders: webpack.RuleSetUse = [
    {
      loader: "css-loader",
      options: {
        localsConvention: "camelCase",
        importLoaders: 2,
        modules: {
          localIdentName: "___[local]___[hash:base64:5]",
        },
      },
    },
    {
      loader: "postcss-loader",
      options: {
        plugins: [
          require("autoprefixer")({
            grid: true,
          }),
        ],
      },
    },
    {
      loader: "sass-loader",
      options: {
        implementation: require("sass"),
        sassOptions: {
          fiber: false,
        },
      },
    },
  ];

  return {
    mode: isProduction ? "production" : "development",
    target: isLibrary ? "node" : "web",
    optimization: {
      minimize: isLibrary ? false : isProduction,
      runtimeChunk: false,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.optimize\.css$/g,
          cssProcessor: require("cssnano"),
          cssProcessorPluginOptions: {
            preset: ["default", { discardComments: { removeAll: true } }],
          },
          canPrint: true,
        }),
      ],
      splitChunks: option.splitChunks,
    },
    entry: option.entry,
    devtool: isProduction ? undefined : "inline-source-map",
    plugins: [
      // isProduction && isLibrary && new BundleAnalyzerPlugin(),
      // new ProgressBarPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      new WebpackNotifierPlugin(),
      new ForkTsCheckerWebpackPlugin({
        memoryLimit: 8192,
        useTypescriptIncrementalApi: true,
      }),
      new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: true }),
      new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin(),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "stylesheets/[name].[contenthash:8].css",
          chunkFilename: "stylesheets/[name].[contenthash:8].chunk.css",
        }),
      !isLibrary &&
        new HtmlWebpackPlugin({
          title: "@code-dependency/view",
          template: "public/index.html",
          React: isProduction ? "scripts/react.production.min.js" : "scripts/react.development.js",
          ReactDOM: isProduction ? "scripts/react-dom.production.min.js" : "scripts/react-dom.development.js",
          "full.render.js": "scripts/full.render.js",
          meta: {
            description: "visualize code dependency with graphviz.",
          },
        }),
      !isLibrary &&
        new ScriptExtHtmlWebpackPlugin({
          defaultAttribute: "async",
        }),
      !isLibrary && new ManifestPlugin(),
      new webpack.DefinePlugin({
        "process.env.isProduction": JSON.stringify(isProduction),
        "process.env.isLibrary": JSON.stringify(isLibrary),
        "process.env.PUBLIC_PATH": JSON.stringify(publicPath),
        "process.env.workerURL": JSON.stringify("scripts/full.render.js"),
        __isBrowser__: "false", // https://tylermcginnis.com/react-router-server-rendering/
      }),
      !isLibrary &&
        new CopyPlugin([
          { to: "scripts", from: find("react-dom/umd/react-dom.production.min.js") },
          { to: "scripts", from: find("react/umd/react.production.min.js") },
          { to: "scripts", from: find("viz.js/viz.js") },
          { to: "scripts", from: find("viz.js/full.render.js") },
        ]),
    ].filter(Boolean),
    output: option.output,
    externals: [
      {
        react: "React",
        "react-dom": "ReactDOM",
      },
      isLibrary && nodeExternals(),
    ].filter(Boolean),
    performance: { hints: false },
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".scss", ".json"],
      alias: {
        "@app/component": appPath("./src/component/index.ts"),
        "@app/container": appPath("./src/container/index.ts"),
        "@app/domain": appPath("./src/domain/index.ts"),
        "@app/infra": appPath("./src/infra/index.ts"),
        "@app/interface": appPath("./src/interface/index.d.ts"),
        "@app/style": appPath("./src/style/index.ts"),
        React: appPath("../../node_modules/react"),
        ReactDOM: appPath("../../node_modules/react-dom"),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: [/__tests__/, /node_modules/],
          loaders: [babelLoader, tsLoader],
        },
        {
          test: /\.scss$/,
          loaders: [isProduction ? MiniCssExtractPlugin.loader : "style-loader", ...cssLoaders].filter(Boolean) as webpack.RuleSetUse,
        },
        {
          test: /\.js$/,
          loader: babelLoader,
        },
      ],
    },
  };
};
