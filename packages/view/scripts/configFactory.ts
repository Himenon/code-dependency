import webpack from "webpack";
import { generateConfig } from "./webpack.config";
import * as path from "path";

export const generateDistConfig = (isProduction: boolean): webpack.Configuration => {
  return generateConfig({
    isProduction,
    isLibrary: false,
    entry: {
      application: ["core-js", "regenerator-runtime/runtime", "./src/application.tsx"],
    },
    output: {
      filename: "scripts/[name].js",
      path: path.resolve(__dirname, "../dist"),
      publicPath: undefined,
    },
    splitChunks: {
      chunks: "initial",
      cacheGroups: {
        default: false,
        vendors: false,
        lib: {
          name: "lib",
          chunks: "initial",
          filename: "scripts/lib.[chunkhash:10].js",
          minChunks: 2,
          test: ({ resource: filePath, context: dirPath }, chunk) => {
            return [/src/].some(pattern => pattern.test(filePath));
          },
          enforce: true,
        },
        vendor: {
          name: "vendor",
          chunks: "initial",
          filename: "scripts/vendor.[chunkhash:10].js",
          test: /node_modules/,
          enforce: true,
        },
        styles: {
          name: "styles",
          filename: "scripts/styles.[chunkhash:10].js",
          test: /\.scss$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  });
};

export const generateLibConfig = (isProduction: boolean): webpack.Configuration => {
  return generateConfig({
    entry: {
      application: ["core-js", "regenerator-runtime/runtime", "./src/index.tsx"],
    },
    output: {
      filename: "[name].lib.js",
      path: path.resolve(__dirname, "../lib"),
      publicPath: undefined,
      libraryTarget: "umd",
      hotUpdateFunction: undefined,
    },
    isProduction,
    isLibrary: true,
    splitChunks: undefined,
  });
};
