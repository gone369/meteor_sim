const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const config = require("./config.js");
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname,config.entry),
  devtool: 'cheap-module-inline-source-map',
  output: {
    path: path.resolve(__dirname, '..','build'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: '/'
  },
  stats: {
    colors: true,
    timings: true
  },
  resolve:{
    extensions: ['.js','.jsx','.json'],
    modules: [
      path.resolve(__dirname,"..","node_modules"),
      path.resolve(__dirname,"..","src","client","client_modules")
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use:[
          {
            loader:"babel-loader",
            options:{
              cacheDirectory:true,
              presets:"es2015"
            }
          },
          {
            loader:"import-glob"
          }
        ],
        exclude: [path.resolve(__dirname, "../node_modules")]
      },
      {
        test:/\.css$/,
        loader:ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader:[
            {
              loader:"style-loader"
            },
            {
              loader:"css-loader"
            },
            {
              loader:"resolve-url-loader"
            }
          ]
        })
      },
      {
        test:/\.(scss|sass)$/,
        loader:ExtractTextPlugin.extract({
          loader:[
            {
              loader:"css-loader"
            },
            {
              loader:"sass-loader"
            },
            {
              loader:"resolve-url-loader"
            }
          ]
        })
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url',
        query:{
          limit: "8192",
          mimetype: "image/png",
          name: "images/[name].[ext]"
        }
      },
      {
        test: /\.(woff2|woff|eot|ttf)$/,
        loader: 'file',
        query: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(wav|mp3)$/,
        loader: 'file',
        query: {
          name: 'sounds/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      chunks: ['client'],
      minChunks: 1
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new ExtractTextPlugin({
      filename:"[name].css",
      allChunks:true
    }),
    new HTMLWebpackPlugin({
      title: config.name,
      template : config.client.html_index_template_path,
      //favicon: config.client.favicon,
      inject: 'body'
    })
  ]
};



