import * as webpack from "webpack";

export const generateRule = (): webpack.Rule => {
  return {
    test: /\.(jpe?g|png|eot|svg|gif|woff2?|ttf)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "assets/[name].[ext]",
        },
      },
    ],
  };
};
