import * as path from "path";
import * as webpack from "webpack";

const ProgressBarPlugin = require("progress-bar-webpack-plugin");
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
      plugins: [
        new ProgressBarPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new webpack.DefinePlugin({
          "process.env.isProduction": JSON.stringify(isProduction),
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
