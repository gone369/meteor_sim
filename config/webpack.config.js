const base = require("./webpack.config.base.js");

module.exports = Object.assign({}, base, {
  devtool: "eval-inline-source-map"
});
