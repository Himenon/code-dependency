import * as AssetsLoader from "./AssetsLoader";
import * as BabelLoader from "./BabelLoader";
import * as TsLoader from "./TsLoader";

export const rules = {
  babelLoader: BabelLoader.generateRule,
  tsLoader: TsLoader.generateRule,
  assetsLoader: AssetsLoader.generateRule,
};
