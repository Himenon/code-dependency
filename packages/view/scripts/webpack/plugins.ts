import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as webpack from "webpack";
const resolve = require("resolve");
import * as ManifestPlugin from "webpack-manifest-plugin";
import { paths } from "../../config/paths";
const ForkTsCheckerWebpackPlugin = require("react-dev-utils/ForkTsCheckerWebpackPlugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const ModuleNotFoundPlugin = require("react-dev-utils/ModuleNotFoundPlugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const typescriptFormatter = require("react-dev-utils/typescriptFormatter");

export const plugins = {
  // new BundleAnalyzerPlugin(),
  // ts-loader | tslint を別プロセスで動かす
  ForkTsCheckerWebpackPlugin: ({
    isEnvDevelopment,
    isEnvProduction,
  }: {
    isEnvDevelopment: boolean;
    isEnvProduction: boolean;
  }): webpack.Plugin =>
    new ForkTsCheckerWebpackPlugin({
      typescript: resolve.sync("typescript", {
        basedir: paths.appNodeModules,
      }),
      async: isEnvDevelopment,
      useTypescriptIncrementalApi: true,
      checkSyntacticErrors: true,
      tsconfig: paths.appTsConfig,
      reportFiles: ["**", "!**/*.json", "!**/__tests__/**", "!**/?(*.)(spec|test).*", "!**/src/setupProxy.*", "!**/src/setupTests.*"],
      watch: paths.appSrc,
      silent: true,
      // The formatter is invoked directly in WebpackDevServerUtils during development
      formatter: isEnvProduction ? typescriptFormatter : undefined,
    }),
  // https://github.com/jantimon/html-webpack-plugin/issues/218
  HtmlWebpackPlugin: ({ isEnvProduction }: { isEnvProduction: boolean }): webpack.Plugin =>
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      ...(isEnvProduction
        ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
        : undefined),
    }),
  MiniCssExtractPlugin: (): webpack.Plugin =>
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
  ModuleNotFoundPlugin: ({ appPath }: { appPath: string }) => new ModuleNotFoundPlugin(appPath),
  InlineChunkHtmlPlugin: () => new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
  InterpolateHtmlPlugin: (env: { raw: any }) => new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
  DefinePlugin: (env: { stringified: any }) => new webpack.DefinePlugin(env.stringified),
  HotModuleReplacementPlugin: () => new webpack.HotModuleReplacementPlugin(),
  WatchMissingNodeModulesPlugin: () => new WatchMissingNodeModulesPlugin(),
  CaseSensitivePathsPlugin: () => new CaseSensitivePathsPlugin(),
  ManifestPlugin: ({ publicPath }: { publicPath: string }) =>
    new ManifestPlugin({
      fileName: "asset-manifest.json",
      publicPath,
    }),
  IgnorePlugin: () => new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  WorkboxWebpackPlugin: ({ publicUrl }: { publicUrl: string }) =>
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      exclude: [/\.map$/, /asset-manifest\.json$/],
      importWorkboxFrom: "cdn",
      navigateFallback: publicUrl + "/index.html",
      navigateFallbackBlacklist: [
        // Exclude URLs starting with /_, as they're likely an API call
        new RegExp("^/_"),
        // Exclude URLs containing a dot, as they're likely a resource in
        // public/ and not a SPA route
        new RegExp("/[^/]+\\.[^/]+$"),
      ],
    }),
};
