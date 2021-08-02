const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
var paths = require('./paths.config');
var srcPath = 'src/main/resources/static/js/';
var targetPath = 'target/classes/static/js/';
var entry = getEntry(paths,srcPath,targetPath);
var config = {
  entry: entry,
  // entry: {
  //   'src/main/resources/static/js/build/test/react': path.resolve(__dirname, 'react/index.js'),
  //   'target/classes/static/js/build/test/react': path.resolve(__dirname, 'react/index.js'),
  //   'src/main/resources/static/js/build/search': path.resolve(__dirname, 'search/index.js'),
  //   'target/classes/static/js/build/search': path.resolve(__dirname, 'search/index.js'),
  // },
  output: {
    publicPath: '../../js/',
    // path: path.resolve(__dirname, '../src/main/resources/static/js/build'),
    // path: path.resolve(__dirname, '..'),
    filename: '[name].js',
    // chunkFilename: '[name].js'
  },
  optimization: {
    // minimizer: [
    //   new UglifyJsPlugin({
    //     uglifyOptions: {
    //       ie8: true
    //     }
    //   })
    // ],
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          test: (module) => {
            return /react|react-dom|antd|antd4/.test(module.context);
          },
          chunks: 'all',
          priority: 0,
        },
      }
    }
  },
  plugins: [
    new MonacoWebpackPlugin(
        // {
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      // languages: ['json','javascript']
    // }
    ),
    new AntdDayjsWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,  //对这个不做处理
        use: {
          loader: 'babel-loader',
          // options: {
          //   "plugins": ["transform-decorators-legacy"],
          //   presets: ['es2015', 'stage-0', 'react']    //在react环境下,也可以进行打包
          // }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader",
          options: {
            javascriptEnabled: true
          }
        }]
      },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

function getEntry(paths,srcPath,targetPath) {
  var entry = {};
  for(var i in paths){
    var p = paths[i];
    entry[p.target] = path.resolve(__dirname, p.source);
    // entry[srcPath + p.target] = path.resolve(__dirname, p.source);
    // entry[targetPath + p.target] = path.resolve(__dirname, p.source);
  }
  return entry;
}

module.exports = config;