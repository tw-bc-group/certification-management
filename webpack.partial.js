const webpack = require('webpack');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'local') {
  dotenv.config({ path: '.env.local' });
}

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'LC_APP_ID': JSON.stringify(process.env.LC_APP_ID),
      'LC_APP_KEY': JSON.stringify(process.env.LC_APP_KEY),
      'IRITA_WALLET_ADDRESS': JSON.stringify(process.env.IRITA_WALLET_ADDRESS),
      'IRITA_WALLET_PRIVATE_KEY': JSON.stringify(process.env.IRITA_WALLET_PRIVATE_KEY)
    })
  ]
}
