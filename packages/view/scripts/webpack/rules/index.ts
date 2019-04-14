import * as AssetsLoader from "./AssetsLoader";
import * as BabelLoader from "./BabelLoader";
import * as CacheLoader from "./CacheLoader";
import * as FileLoader from "./FileLoader";
import * as HtmlLoader from "./HtmlLoader";
import * as SourceMapLoader from "./SourceMapLoader";
import * as StyleLoader from "./StyleLoader";
import * as TsLoader from "./TsLoader";
import * as UrlLoader from "./UrlLoader";

export const rules = {
  babelLoader: BabelLoader.generateRule,
  sourceMapLoader: SourceMapLoader.generateRule,
  cacheLoader: CacheLoader.generateRule,
  tsLoader: TsLoader.generateRule,
  htmlLoader: HtmlLoader.generateRule,
  urlLoader: UrlLoader.generateRule,
  fileLoader: FileLoader.generateRule,
  styleLoader: StyleLoader.generateRule,
  assetsLoader: AssetsLoader.generateRule,
};
