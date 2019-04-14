import * as webpack from "webpack";

export const generateRule = (): webpack.Rule => {
  return {
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  };
};
