const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var config = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname, '../target/classes/static/js/dev'),
  },
  plugins: [
      new webpack.DefinePlugin({
        ROOT_PATH: '"/apsc-datav"'
      })
  ]
};

module.exports = merge(common,config);