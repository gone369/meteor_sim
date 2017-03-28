const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const config = require("./config.js");
const webpack = require('webpack');

module.exports = {
  entry: {
    "index":path.resolve(__dirname,config.entry)
  },
  devServer: {
    hot: true
  },
  devtool: 'eval-inline-source-map',
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
        ]
        //exclude: [path.resolve(__dirname, "../node_modules")]
      },
      {
        test:/\.css$/,
        use:[
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
      },
      {
        test:/\.(scss|sass)$/,
        use:[
          {
            loader:"style-loader"
          },
          {
            loader:"css-loader"
          },
          {
            loader:"sass-loader"
          },
          {
            loader:"resolve-url-loader"
          },
          {
            loader:"sass-loader",
            options:{
              sourceMap:true
            }
          },
          {
            loader:"import-glob"
          }
        ]
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
        loader: 'url-loader',
        query:{
          limit: "8192",
          mimetype: "image/png",
          name: "images/[name].[ext]"
        }
      },
      {
        test: /\.(woff2|woff|eot|ttf)$/,
        loader: 'file-loader',
        query: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(wav|mp3)$/,
        loader: 'file-loader',
        query: {
          name: 'sounds/[name].[ext]'
        }
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        query:{
          minimize: false
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
    new HTMLWebpackPlugin({
      title: config.name,
      template : config.client.html_index_template_path,
      //favicon: config.client.favicon,
      inject: 'body'
    })
  ]
};


