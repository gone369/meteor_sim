const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const config = require("./config.js");
const webpack = require("webpack");
const devMode = process.env.NODE_ENV !== "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: path.resolve(__dirname, config.entry)
  },
  output: {
    path: path.resolve(__dirname, "..", "build"),
    filename: "[name].js",
    chunkFilename: "[id].js",
    publicPath: "/"
  },
  stats: {
    colors: true,
    timings: true
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    modules: [
      path.resolve(__dirname, "..", "node_modules"),
      path.resolve(__dirname, "..", "src", "client", "client_modules")
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          }
        ]
        //exclude: [path.resolve(__dirname, "../node_modules")]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: "url-loader",
        query: {
          limit: "8192",
          mimetype: "image/png",
          name: "images/[name].[ext]"
        }
      },
      {
        test: /\.(woff2|woff|eot|ttf)$/,
        loader: "file-loader",
        query: {
          name: "fonts/[name].[ext]"
        }
      },
      {
        test: /\.(wav|mp3)$/,
        loader: "file-loader",
        query: {
          name: "sounds/[name].[ext]"
        }
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: config.name,
      template: config.client.html_index_template_path,
      //favicon: config.client.favicon,
      inject: "body"
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
