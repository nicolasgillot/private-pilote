const webpack = require('webpack');
const PATHS = require('./paths');

const vendorFileName = 'vendors.dll.js';
const vendorLibraryName = 'vendors_lib';

module.exports = {
  context: PATHS.root,
  devtool: '#source-map',
  entry: [
    'axios',
    'classnames',
    'prop-types',
    'react',
    'react-dom',
    'react-intl',
    'react-redux',
    'redux',
    'redux-saga',
    'hoist-non-react-statics',
  ],
  output: {
    filename: vendorFileName,
    library: vendorLibraryName,
    path: PATHS.dll,
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DllPlugin({
      name: vendorLibraryName,
      path: PATHS.vendorManifest,
    }),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  target: 'web',
};
