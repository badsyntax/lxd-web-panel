'use strict';

// import dependencies
var path = require('path');
var util = require('util');
var webpack = require('webpack');
var pkg = require('./package.json');

// paths
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var modelsPath = path.resolve(__dirname, '..', 'models');

// setup environment flags
var DEVELOPMENT = process.env.NODE_ENV === 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';

// webpack configuration
var config = {
  entry: {
    bundle: [
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
        test: /\.scss$/,
        loader: 'style!css?sourceMap!sass?' + [
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
      { test: /\.(woff2?|svg)$/, loader: 'url?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'API_HOST': JSON.stringify(process.env.API_HOST),
        'API_PORT': JSON.stringify(process.env.API_PORT)
      }
    })
  ],
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js', '.json', '.jsx']
  },
  devServer: {
    port: pkg.config.devPort
  }
};

// export configuration
module.exports = config;
