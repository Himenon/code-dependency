import * as webpack from "webpack";

export const generateRule = (): webpack.Rule => {
  return {
    test: /\.html$/,
    loader: "html-loader",
  };
};
