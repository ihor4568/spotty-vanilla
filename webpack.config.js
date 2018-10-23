const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
  {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "main.js"
    },

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [MiniCssExtractPlugin.loader],
            fallback: "style-loader",
            use: ["css-loader", "postcss-loader", "sass-loader"]
          })
        },
        {
          test: [/.(png|jpg)$/, /\.(ttf)/],
          use: "file-loader"
        },
        {
          test: /\.ejs$/,
          loader: "ejs-loader",
          query: {
            variable: "data",
            interpolate: "\\{\\{(.+?)\\}\\}",
            evaluate: "\\[\\[(.+?)\\]\\]"
          }
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("style.css"),
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
