const webpackConfig = require('../webpack.config')();

module.exports = config => {
  config.set({
    basePath: '../',
    browsers: ['ChromeHeadless'],
    files: [
      {
        instrument: false,
        pattern: 'node_modules/core-js/client/core.js',
      },
      {
        pattern: 'src/**/*.spec.+(ts|tsx)',
        watched: false,
      },
    ],
    frameworks: ['mocha', 'chai'],
    preprocessors: {
      'src/translations/messages.json': ['json_fixtures'],
      'src/**/*.spec.+(ts|tsx)': ['webpack', 'sourcemap'],
    },
    reporters: 'mocha',
    webpack: {
      // Required for enzyme to work properly
      externals: {
        cheerio: 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react-addons-test-utils': 'react-dom',
      },

      module: webpackConfig.module,
      plugins: webpackConfig.plugins,
      resolve: webpackConfig.resolve,
    },

    // We do not want crazy logs in the term
    webpackMiddleware: {
      noInfo: true,
    },
  });
};
