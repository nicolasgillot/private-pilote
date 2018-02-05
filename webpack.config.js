const merge = require('webpack-merge');
const commonsConfig = require('./config/webpack.config.commons');
const developmentConfig = require('./config/webpack.config.development');
const productionConfig = require('./config/webpack.config.production');

module.exports = env =>
  env === 'production'
    ? merge(commonsConfig, productionConfig)
    : merge(commonsConfig, developmentConfig);
