import * as webpack from "webpack";

export const generateRule = (): webpack.Rule => {
  return {
    loader: "cache-loader",
  };
};
