module.exports = {
  '/api': {
    'target': 'https://api.remove.bg/',
    'secure': false,
    'pathRewrite': {
      '^/api': '',
    },
    'logLevel': 'debug',
  },
};
