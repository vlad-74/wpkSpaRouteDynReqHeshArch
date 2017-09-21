'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const NODE_ARCH = process.env.NODE_ARCH || 1;
const webpack = require('webpack');
//assetsPlugin - СОЗДАЕТ ФАЙЛ assets.json С ИНФОРМАЦИЕЙ О СБОРКЕ (hesh)
const assetsPlugin = require('assets-webpack-plugin');
const rimraf = require('rimraf'); //УДАЛЯЕТ СТАРЫЕ JS ФАЙЛЫ ИЗ ПАПКИ
//HtmlWebpackPlugin - СОЗДАЕТ ФАЙЛ /index.html С ОБНОВЛЕННЫМ ПОДКЛЮЧЕННЫМ ФАЙЛОМ app.js
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

var CopyWebpackPlugin = require('copy-webpack-plugin');

let t = Date.parse(new Date()); //milliseconds


module.exports = {
  context: __dirname + '/frontend',

  entry: {
    app: './app'
  },

  output: {
    path:     __dirname + '/version/js',
    publicPath: '/js/',  //   /js/app.js
    filename: "[name][hash].js"
  },

  // watch: NODE_ENV == 'development',

  watchOptions: {
    aggregateTimeout: 100
  },

  plugins: [
    {
      apply: (compiler) => {
        rimraf.sync(compiler.options.output.path);
      }
    },
    new webpack.NoErrorsPlugin(),
    new assetsPlugin ({
      filename: 'assets.json',
      path: __dirname + '/version'
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      chunks: ['app']
    }),
  ],

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions:         ['', '.js', 'styl']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates:    ['*-loader', '*'],
    extensions:         ['', '.js', 'styl']
  },

    devServer: {
    contentBase: __dirname + '/version',
    hot: true
  }

};

if(NODE_ARCH == 0){
  console.log('!!!!!!WEBPACK - АРХИВАЦИЯ!!!!! ОТМЕНА АРХИВАЦИИ - set NODE_ARCH=1&webpack')
  module.exports.plugins.push(
    new CopyWebpackPlugin([// Copy directory contents to {output}/to/directory/
        { from: __dirname + '/version', to: __dirname + '/old_versions/'+ t +'/' }
    ])
  )
}else{
  console.log('!!!!!!WEBPACK - БЕЗ АРХИВАЦИИ!!!!! АРХИВАЦИЯ - set NODE_ARCH=0&webpack')
};

if (NODE_ENV == 'production') {
  console.log('!!!!!!WEBPACK - production!!!!! ДЕВ - set NODE_ENV=development&webpack')
  module.exports.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          // don't show unreachable variables etc
          warnings:     false,
          drop_console: true,
          unsafe:       true
        }
      })
  );
}else{
  console.log('!!!!!!WEBPACK - development!!!!! ПРОД - set NODE_ENV=production&webpack')
};

console.log('http://127.0.0.1:3000/ver')
