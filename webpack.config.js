const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
  {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].[hash].js"
    },

    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                minimize: {
                  safe: true
                }
              }
            },
            {
              loader: "postcss-loader",
              options: {
                autoprefixer: {
                  browsers: ["last 2 versions"]
                },
                plugins: () => [autoprefixer]
              }
            },
            {
              loader: "sass-loader",
              options: { includePaths: ["./node_modules"] }
            }
          ]
        },
        {
          test: [/.(png|jpg)$/, /\.(ttf)/],
          use: "file-loader"
        },
        {
          test: /\.html$/,
          loader: "ejs-loader"
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(["dist"]),
      new HtmlWebpackPlugin({
        template: "index.html",
        minify: {
          collapseWhitespace: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        }
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[id].[hash].css"
      })
    ]
  }
];
