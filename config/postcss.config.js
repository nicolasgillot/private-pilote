module.exports = ({ file, env }) => ({
  plugins: Object.assign(
    {
      'postcss-import': { root: file.dirname },
      'postcss-mixins': {},
      'postcss-cssnext': {
        browsers: [
          'Android >= 5',
          'Chrome >= 45',
          'Firefox >= 40',
          'Explorer >= 11',
          'iOS >= 9',
          'Opera >= 32',
          'Safari >= 9',
        ],
      },
      'postcss-flexbugs-fixes': {},
    },
    env === 'production'
      ? {
          cssnano: {
            autoprefixer: false,
            safe: true,
          },
        }
      : {}
  ),
});
