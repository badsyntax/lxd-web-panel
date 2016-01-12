'use strict';

// import dependencies
var path = require('path');
var util = require('util');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var pkg = require('./package.json');

// paths
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var modelsPath = path.resolve(__dirname, '..', 'models');

// webpack configuration
var config = {
  entry: {
    app: [
      path.resolve(pkg.config.srcPath, 'index.js')
    ]
  },
  output: {
    path: path.resolve(pkg.config.buildPath),
    pathinfo: true,
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [
          nodeModulesPath,
        ],
        include: [
          modelsPath
        ],
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: [
          nodeModulesPath,
          modelsPath
        ]
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?' + [
          'outputStyle=expanded',
          'includePaths[]=' + path.resolve(__dirname, './src/scss'),
          'includePaths[]=' + nodeModulesPath
        ].join('&'))
      },
      {
        test: /bootstrap-sass\/assets\/javascripts\//,
        loader: 'imports?jQuery=jquery'
      },
      { test: /\.json$/, loader: 'json' },
      { test: /\.(woff2?|svg)$/, loader: 'url?limit=10000&name=[path][name].[ext]' },
      { test: /\.(ttf|eot|gif|png|ico|jpe?g)$/, loader: 'file?name=[path][name].[ext]' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'API_HOST': JSON.stringify(process.env.API_HOST),
        'API_PORT': JSON.stringify(process.env.API_PORT)
      }
    }),
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new HtmlWebpackPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false }
    })
  ],
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js', '.json', '.jsx']
  },
  postcss: function () {
    return [autoprefixer];
  }
};

// export configuration
module.exports = config;
