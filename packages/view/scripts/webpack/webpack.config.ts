import * as path from "path";
import * as webpack from "webpack";
import { getClientEnvironment } from "../../config/env";
import { moduleFileExtensions, paths } from "../../config/paths";
import * as commonConfig from "./common";
import { minimizerPluginMap } from "./optimization";
import { plugins } from "./plugins";
import { rules as defaultRules } from "./rules";
const PnpWebpackPlugin = require("pnp-webpack-plugin");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== "false";

export const configFactory = (webpackEnv: "development" | "production"): webpack.Configuration => {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";

  const publicPath = isEnvProduction ? paths.servedPath : isEnvDevelopment && "/";
  const publicUrl = isEnvProduction && publicPath ? publicPath.slice(0, -1) : isEnvDevelopment && "";
  const env = getClientEnvironment(publicUrl);

  const shouldUseRelativeAssetPaths = publicPath === "./";

  return {
    mode: isEnvProduction ? "production" : "development",
    bail: isEnvProduction,
    stats: "errors-only",
    entry: {
      index: paths.appIndexJs,
    },
    target: "electron-renderer",
    devtool: "cheap-module-source-map",
    output: {
      path: isEnvProduction ? paths.appBuild : undefined,
      publicPath: isEnvProduction ? paths.servedPath : isEnvDevelopment ? "/" : undefined,
      chunkFilename: isEnvProduction
        ? "static/js/[name].[chunkhash:8].chunk.js"
        : isEnvDevelopment
        ? "static/js/[name].chunk.js"
        : undefined,
      filename: isEnvProduction ? "static/js/[name].[chunkhash:8].js" : isEnvDevelopment ? "static/js/bundle.js" : undefined,
      pathinfo: isEnvDevelopment,
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, "/")
        : isEnvDevelopment
        ? info => path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
        : undefined,
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        minimizerPluginMap.terser({ shouldUseSourceMap }),
        // This is only used in production mode
        minimizerPluginMap.optimizeCssAssetsPlugin({ shouldUseSourceMap }),
      ],
      // Automatically split vendor and commons
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      splitChunks: {
        chunks: "all",
        name: false,
      },
      // Keep the runtime chunk separated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      runtimeChunk: true,
    },
    module: {
      strictExportPresence: true,
      rules: [
        // Disable require.ensure as it's not a standard language feature.
        { parser: { requireEnsure: false } },
        defaultRules.babelLoader(),
        defaultRules.assetsLoader({ isEnvDevelopment, isEnvProduction, shouldUseRelativeAssetPaths }),
        defaultRules.tsLoader(),
      ],
    },
    plugins: [
      plugins.HtmlWebpackPlugin({ isEnvProduction }),
      isEnvProduction && shouldInlineRuntimeChunk && plugins.InlineChunkHtmlPlugin,
      plugins.InterpolateHtmlPlugin(env),
      plugins.ModuleNotFoundPlugin(paths),
      plugins.DefinePlugin(env),
      isEnvDevelopment && plugins.HotModuleReplacementPlugin(),
      isEnvDevelopment && plugins.CaseSensitivePathsPlugin(),
      isEnvProduction && plugins.MiniCssExtractPlugin(),
      publicPath && plugins.ManifestPlugin({ publicPath }),
      plugins.IgnorePlugin(),
      isEnvProduction && publicUrl && plugins.WorkboxWebpackPlugin({ publicUrl }),
      plugins.ForkTsCheckerWebpackPlugin({ isEnvDevelopment, isEnvProduction }),
    ].filter(Boolean),
    resolveLoader: {
      plugins: [
        // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
        // from the current package.
        PnpWebpackPlugin.moduleLoader(module),
      ],
    },
    resolve: {
      extensions: moduleFileExtensions,
      alias: commonConfig.alias,
      plugins: [
        // Adds support for installing with Plug'n'Play, leading to faster installs and adding
        // guards against forgotten dependencies and such.
        PnpWebpackPlugin,
        // Prevents users from importing files from outside of src/ (or node_modules/).
        // This often causes confusion because we only process files within src/ with babel.
        // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
        // please link the files into your node_modules/ and let module-resolution kick in.
        // Make sure your source files are compiled, as they will not be processed in any way.
        new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
      ],
    },
    node: commonConfig.nodepPolyfill,
    performance: false,
  };
};
