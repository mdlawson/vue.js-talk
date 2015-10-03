var path = require('path');
var vue = require('vue-loader');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: "./main",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "build.js"
  },
  resolve: {
    extensions: ['', '.js', '.vue']
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: vue.withLoaders({
          // apply babel transform to all javascript
          // inside *.vue files.
          js: 'babel?optional[]=runtime&stage=1'
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Todo"
    })
  ]
};
