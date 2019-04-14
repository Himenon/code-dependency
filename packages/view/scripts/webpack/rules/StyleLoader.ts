import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as webpack from "webpack";

export const generateRule = (): webpack.Rule => {
  return {
    test: /\.(scss|css)$/,
    exclude: /node_modules/,
    use: [
      // linkタグを出力
      process.env.NODE_ENV !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
      // 'style-loader',
      // MiniCssExtractPluginがcss-loaderのmodulesを殺してしまう
      // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/10
      // {
      //     loader: MiniCssExtractPlugin.loader,
      //     options: {
      //         // you can specify a publicPath here
      //         // by default it use publicPath in webpackOptions.output
      //         publicPath: '../'
      //     }
      // },
      {
        loader: "css-loader",
        options: {
          modules: true,
          camelCase: true,
          importLoaders: 3,
          localIdentName: "___[local]___[hash:base64:5]",
        },
      },
      {
        loader: "postcss-loader",
        options: {
          // PostCSS側でもソースマップを有効にする
          sourceMap: true,
          plugins: [
            // Autoprefixerを有効化
            // ベンダープレフィックスを自動付与する
            require("autoprefixer")({
              grid: true,
            }),
          ],
        },
      },
      "sass-loader",
    ],
  };
};
