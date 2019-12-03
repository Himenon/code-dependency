import * as enhancedResolve from "enhanced-resolve";
const PnpWebpackPlugin = require("pnp-webpack-plugin");
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const CACHE_DURATION = 4000;

type ResolverOption = enhancedResolve.ResolverFactory.ResolverOption;

interface ExtraOption {
  tsConfig?: string;
  externalModuleResolutionStrategy?: string;
}

export const compileResolveOptions = (option: ResolverOption, extraOption: ExtraOption = {}): ResolverOption => {
  const DEFAULT_RESOLVE_OPTIONS: ResolverOption = {
    // for later: check semantics of enhanced-resolve symlinks and
    // node's preserveSymlinks. They seem to be
    // symlink === !preserveSynlinks - but using it that way
    // breaks backwards compatibility
    //
    // Someday we'll rely on this and remove the code that manually
    // does this in extract/resolve/index.js
    symlinks: false,
    // if a webpack config overrides extensions, there's probably
    // good cause. The scannableExtensions are an educated guess
    // anyway, that works well in most circumstances.
    // Note that if extract/transpile/index gets an unknown extension
    // passed, it'll fall back to the javascript parser
    extensions: [".js"],
  };

  const NON_OVERRIDABLE_RESOLVE_OPTIONS: ResolverOption = {
    fileSystem: new enhancedResolve.CachedInputFileSystem(new enhancedResolve.NodeJsInputFileSystem(), CACHE_DURATION) as any, // TODO
    useSyncFileSystemCalls: true,
  };

  const plugins: ResolverOption["plugins"] = [];

  if (extraOption.tsConfig) {
    plugins.push(new TsConfigPathsPlugin({ configFile: extraOption.tsConfig }));
  }

  if (extraOption.externalModuleResolutionStrategy === "yarn-pnp") {
    plugins.push(PnpWebpackPlugin);
  }

  return { ...DEFAULT_RESOLVE_OPTIONS, ...{ plugins }, ...option, ...NON_OVERRIDABLE_RESOLVE_OPTIONS };
};
