import * as webpack from "webpack";
import { paths } from "../../../config/paths";

export const generateRule = (): webpack.Rule => {
  return {
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
          configFile: paths.appTsConfig,
        },
      },
    ],
  };
};
