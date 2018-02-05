const merge = require('webpack-merge');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const PATHS = require('./paths');
const stats = require('./stats');

const isTest = process.argv[1].includes('karma');
const { PORT_NUMBER } = process.env;

module.exports = merge([
  {
    devServer: {
      compress: true,
      historyApiFallback: true,
      hot: true,
      overlay: {
        errors: true,
        warnings: true,
      },
      port: PORT_NUMBER,
      publicPath: PATHS.publicPath,
      stats,
      watchOptions: {
        aggregateTimeout: 300,
        ignored: /node_modules/,
        poll: 1000,
      },
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          include: [PATHS.app, PATHS.nodeModules],
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: false,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: PATHS.postCSS,
                },
              },
            },
          ],
        },
      ],
    },
    output: {
      chunkFilename: 'js/[id].chunk.js',
      filename: 'js/[name].js',
      path: PATHS.build,
      pathinfo: true,
      publicPath: PATHS.publicPath,
    },
    plugins: [
      ...(isTest
        ? []
        : [
            new webpack.DllReferencePlugin({
              context: PATHS.root,
              manifest: PATHS.vendorManifest,
            }),
          ]),
      new AddAssetHtmlPlugin({
        filepath: PATHS.vendorFilepath,
        includeSourceMap: true,
      }),
      new CaseSensitivePathsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new FriendlyErrorsPlugin(),
    ],
    performance: {
      hints: false,
    },
  },
]);
