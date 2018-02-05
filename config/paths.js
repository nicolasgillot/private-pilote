const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  app: resolvePath('src'),
  build: resolvePath('build'),
  dll: resolvePath('dll'),
  favicon: resolvePath('src/images/favicon.ico'),
  images: resolvePath('src/images'),
  indexHtml: resolvePath('src/index.html'),
  nodeModules: resolvePath('node_modules'),
  polyfills: resolvePath('config/polyfills'),
  postCSS: resolvePath('config/postcss.config.js'),
  publicPath: isProduction ? './' : '/',
  root: process.cwd(),
  vendorFilepath: resolvePath('dll/vendors.dll.js'),
  vendorManifest: resolvePath('dll/vendors-manifest.json'),
};
