import * as path from "path";
import * as webpack from "webpack";

const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const rootPath = path.resolve(__dirname, "../");
const appPath = (nextPath: string) => path.join(rootPath, nextPath);

export interface Option {
  isProduction: boolean;
}

export const generateConfig = ({ isProduction }: Option): webpack.Configuration[] => {
  const tsLoader: webpack.RuleSetUse = {
    loader: "ts-loader",
    options: {
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
      plugins: [new FriendlyErrorsWebpackPlugin()],
      target: "node",
      resolve: {
        extensions: [".js", ".ts", ".tsx"],
        alias: {
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
