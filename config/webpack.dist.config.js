const base = require("./webpack.config.base.js");

module.exports = Object.assign({},base,{
  devtool: 'cheap-module-inline-source-map',
  optimization: {
    ...base.optimization,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
});
