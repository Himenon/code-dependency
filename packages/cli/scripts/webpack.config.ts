import * as path from "path";
import * as webpack from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const rootPath = path.resolve(__dirname, "../");
const appPath = (nextPath: string) => path.join(rootPath, nextPath);

export interface Option {
  isProduction: boolean;
}

export const generateConfig = ({ isProduction }: Option): webpack.Configuration[] => {
  console.log(`isProduction = ${isProduction}`);
  const tsLoader: webpack.RuleSetUse = {
    loader: "ts-loader",
    options: {
      transpileOnly: true,
      configFile: "tsconfig.json",
      compilerOptions: {
        sourceMap: !isProduction,
      },
    },
  };
  const babelLoader: webpack.RuleSetUse = {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
    },
  };
  return [
    {
      mode: isProduction ? "production" : "development",
      entry: {
        index: "./src/index.ts",
      },
      optimization: {
        minimize: isProduction,
        noEmitOnErrors: true,
      },
      devtool: isProduction ? undefined : "inline-source-map",
      node: {
        __dirname: false,
        __filename: false,
      },
      plugins: [
        new ProgressBarPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify("production"),
          "process.env.isProduction": JSON.stringify(isProduction),
          "process.env.VERSION": JSON.stringify(require("../package.json").version),
        }),
      ],
      target: "node",
      resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs"],
        alias: {
          React: appPath("../../node_modules/react"),
          ReactDOM: appPath("../../node_modules/react-dom"),
        },
      },
      externals: [/^(?!^(src|\.|\.\.)\/)/],
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            exclude: [/__tests__/, /node_modules/],
            loaders: [babelLoader, tsLoader],
          },
          {
            test: /\.mjs$/,
            type: "javascript/auto",
          },
        ],
      },
      output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].js",
        libraryTarget: "commonjs2",
      },
    },
  ];
};
