import * as webpack from "webpack";
import { paths } from "../../../config/paths";

export const generateRule = (): webpack.Rule => {
  // First, run the linter.
  // It's important to do this before Babel processes the JS.
  return {
    test: /\.(js|mjs|jsx)$/,
    enforce: "pre",
    use: [
      {
        options: {
          formatter: require.resolve("react-dev-utils/eslintFormatter"),
          eslintPath: require.resolve("eslint"),
        },
        loader: require.resolve("eslint-loader"),
      },
    ],
    include: paths.appSrc,
  };
};
