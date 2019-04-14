import * as webpack from "webpack";

export const generateRule = (): webpack.Rule => {
  return {
    test: /\.(jpe?g|png|eot|svg|gif|woff2?|ttf)$/,
    use: [
      {
        // file-loader, mime, url-loaderが必要
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "assets/[name].[ext]?[hash]",
        },
      },
    ],
  };
};
