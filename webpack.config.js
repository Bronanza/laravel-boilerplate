'use strict';

const webpack = require('webpack');

const providePlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  Promise: 'exports?self.Promise!es6-promise',
  fetch: 'exports?self.fetch!whatwg-fetch',
  bootstrap: 'bootstrap'
});

const babelLoader = {
  test: /\.jsx?$/,
  exclude: /(node_modules|bower_components)/,
  loader: 'babel',
  query: {
    presets: ['es2015']
  }
};

module.exports = {
  entry: './assets/js/main.js',
  output: {
    path: __dirname,
    filename: './public/dist/js/main.js'
  },
  module: {
    loaders: [babelLoader]
  },
  plugins: [providePlugin]
};
