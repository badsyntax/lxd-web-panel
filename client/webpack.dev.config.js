'use strict';

// import dependencies
var path = require('path');
var util = require('util');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
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
    pathinfo: true,
    filename: '[name].js',
    publicPath: util.format('http://0.0.0.0:%d/', pkg.config.devPort)
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
        loader: 'style?sourceMap!css?sourceMap!postcss?sourceMap!sass?' + [
          'sourceMap',
          'outputStyle=expanded',
          'includePaths[]=' + path.resolve(__dirname, './src/scss'),
          'includePaths[]=' + nodeModulesPath
        ].join('&')
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
        'NODE_ENV': JSON.stringify('development'),
        'API_HOST': JSON.stringify(process.env.API_HOST),
        'API_PORT': JSON.stringify(process.env.API_PORT)
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
  ],
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js', '.json', '.jsx']
  },
  devServer: {
    port: pkg.config.devPort
  },
  postcss: function () {
    return [autoprefixer];
  }
};

// export configuration
module.exports = config;
