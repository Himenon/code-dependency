import * as webpack from "webpack";
import * as path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const rootPath = path.resolve(__dirname, "../");
const appPath = (nextPath: string) => path.join(rootPath, nextPath);

export const generateConfig = (isProduction: boolean): webpack.Configuration => {
  const isCI = process.env.CI;
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
    target: "web",
    optimization: {
      minimize: isProduction,
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
    },
    entry: {
      application: ["core-js", "regenerator-runtime/runtime", "./src/application.tsx"],
    },
    devtool: isProduction ? "inline-source-map" : undefined,
    plugins: [
      isProduction && !isCI && new BundleAnalyzerPlugin(),
      new ProgressBarPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      new WebpackNotifierPlugin(),
      new ForkTsCheckerWebpackPlugin({
        memoryLimit: 8192,
      }),
      new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: true }),
      new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin(),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "stylesheets/[name].[contenthash:8].css",
          chunkFilename: "stylesheets/[name].[contenthash:8].chunk.css",
        }),
      new HtmlWebpackPlugin({
        title: isProduction ? "Production" : "Development",
        template: "public/index.html",
        React: isProduction ? "scripts/react.production.min.js" : "https://unpkg.com/react@16/umd/react.development.js",
        ReactDOM: isProduction ? "scripts/react-dom.production.min.js" : "https://unpkg.com/react-dom@16/umd/react-dom.development.js",
        "full.render.js": "scripts/full.render.js",
      }),
      new ManifestPlugin(),
      new webpack.DefinePlugin({
        "process.env.isProduction": JSON.stringify(isProduction),
        "process.env.PUBLIC_PATH": JSON.stringify(""),
        "process.env.workerURL": JSON.stringify("scripts/full.render.js"),
      }),
    ].filter(Boolean),
    output: {
      filename: "scripts/[name].js",
      path: path.resolve(__dirname, "../dist"),
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".scss", ".json"],
      alias: {
        "@app/component": appPath("./src/component/index.ts"),
        "@app/container": appPath("./src/container/index.ts"),
        "@app/domain": appPath("./src/domain/index.ts"),
        "@app/infra": appPath("./src/infra/index.ts"),
        "@app/style": appPath("./src/style/index.ts"),
        React: appPath("node_modules/react"),
        ReactDOM: appPath("node_modules/react-dom"),
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
