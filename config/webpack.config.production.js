const merge = require('webpack-merge');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const isVendor = require('./isVendor');
const PATHS = require('./paths');

const pluginExtractText = new ExtractTextPlugin({
  allChunks: true,
  disable: false,
  filename: 'css/[name].[hash:8].css',
});

module.exports = merge([
  {
    devtool: 'source-map',
    module: {
      rules: [
        {
          include: [PATHS.app, PATHS.nodeModules],
          test: /\.css$/,
          use: pluginExtractText.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                query: {
                  importLoaders: 1,
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
          }),
        },
      ],
    },
    output: {
      chunkFilename: 'js/[name].[chunkhash].js',
      filename: 'js/[name].[chunkhash].js',
      path: PATHS.build,
      publicPath: PATHS.publicPath,
    },
    performance: {
      hints: 'warning',
      maxAssetSize: 300000,
      maxEntrypointSize: 300000,
    },
    plugins: [
      pluginExtractText,
      new webpack.optimize.AggressiveMergingPlugin(),
      new PreloadWebpackPlugin({
        as: 'script',
        include: 'asyncChunks',
        rel: 'preload',
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
          warnings: false,
        },
      }),
      new webpack.optimize.CommonsChunkPlugin({
        async: true,
        children: true,
        name: 'main',
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: isVendor,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['main', 'vendor'],
      }),
      new webpack.HashedModuleIdsPlugin(),
      new WebpackChunkHash(),
      new CompressionPlugin({
        algorithm: 'gzip',
        asset: '[path].gz[query]',
        minRatio: 0.8,
        test: /\.(css|js)$/,
        threshold: 10240,
      }),
    ],
  },
]);
