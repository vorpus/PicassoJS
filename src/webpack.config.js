const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./voronoi.js",
  output: {
    filename: "../bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  externals: {
    "jquery": "jQuery"
  },
  devtool: 'source-maps',
};
