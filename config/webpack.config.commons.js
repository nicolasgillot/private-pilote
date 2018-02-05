const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const PATHS = require('./paths');
const stats = require('./stats');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = merge([
  {
    bail: true,
    cache: !isProduction,
    context: PATHS.app,
    entry: {
      main: [
        isProduction ? PATHS.polyfills : 'react-hot-loader/patch',
        path.join(PATHS.app, 'entries', 'main.entry.tsx'),
      ],
    },
    module: {
      noParse: [/\.min\.js$/],
      rules: [
        {
          loader: 'url-loader',
          options: {
            limit: 1,
            name: isProduction
              ? 'fonts/[name]-[hash].[ext]'
              : 'fonts/[name].[ext]?[hash]',
          },
          test: /\.ttf?$/,
        },
        {
          include: PATHS.app,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: isProduction
              ? 'img/[name]-[hash].[ext]'
              : 'img/[name].[ext]?[hash]',
          },
          test: /\.(jpg|png|svg)$/,
        },
        {
          include: PATHS.app,
          loader: 'awesome-typescript-loader',
          test: /\.tsx?$/,
        },
      ],
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new HtmlWebpackPlugin({
        chunksSortMode: 'dependency',
        favicon: PATHS.favicon,
        filename: 'index.html',
        inject: true,
        minify: isProduction && {
          collapseWhitespace: true,
          keepClosingSlash: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
        template: PATHS.indexHtml,
        title: 'App',
        xhtml: true,
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: process.env.NODE_ENV || 'development',
      }),
      new webpack.NamedChunksPlugin(),
      new webpack.NamedModulesPlugin(),
    ],
    resolve: {
      alias: {
        '@': PATHS.app,
      },
      descriptionFiles: ['package.json'],
      enforceExtension: false,
      extensions: ['.js', '.json', '.ts', '.tsx'],
      modules: ['node_modules', PATHS.app],
    },
    stats,
  },
]);
