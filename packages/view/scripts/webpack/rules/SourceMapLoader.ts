import * as webpack from "webpack";
import { paths } from "../../../config/paths";

export const generateRule = (): webpack.Rule => {
  return {
    test: /\.(js|jsx|mjs)$/,
    loader: "source-map-loader",
    enforce: "pre",
    include: paths.appSrc,
  };
};
