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

// get entries
var entries = {
  bundle: [
    path.resolve(pkg.config.srcPath, 'index.js')
  ]
};

// webpack configuration
var config = {
  entry: entries,
  output: {
    path: path.resolve(pkg.config.buildPath),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
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
    }, {
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: [
        nodeModulesPath,
        modelsPath
      ],
      query: {
        presets: ['es2015', 'stage-0', 'react']
      }
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass?' + [
      'outputStyle=expanded',
      'includePaths[]=' + path.resolve(__dirname, './src/scss'),
      'includePaths[]=' + nodeModulesPath
      ].join('&')
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }]
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
