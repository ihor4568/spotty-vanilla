const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
  {
    entry: ["./src/index.scss", "./src/index.js"],
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "main.js"
    },

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: "css-loader",
                options: { sourceMap: true }
              },
              {
                loader: "postcss-loader",
                options: {
                  sourceMap: true,
                  plugins: [
                    autoprefixer({
                      browsers: ["ie >= 8", "last 4 version"]
                    })
                  ]
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true,
                  includePaths: ["./node_modules"]
                }
              }
            ],
            fallback: "style-loader"
          })
        },
        {
          test: /\.(png|gif|jpe?g)$/,
          loaders: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]"
              }
            }
          ]
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
      new ExtractTextPlugin("./style.css"),
      new HtmlWebpackPlugin({
        template: "./index.html"
      })
    ]
  }
];
