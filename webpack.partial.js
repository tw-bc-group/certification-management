const webpack = require('webpack');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'local') {
  dotenv.config({ path: '.env.local' });
}

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'LC_APP_ID': JSON.stringify(process.env.LC_APP_ID),
      'LC_APP_KEY': JSON.stringify(process.env.LC_APP_KEY)
    })
  ]
}
