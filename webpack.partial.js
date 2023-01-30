const webpack = require('webpack');
require('dotenv').config({ path: '.env' });

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'LC_APP_ID': JSON.stringify(process.env.LC_APP_ID),
      'LC_APP_KEY': JSON.stringify(process.env.LC_APP_KEY)
    })
  ]
}
