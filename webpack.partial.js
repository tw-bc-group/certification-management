const webpack = require('webpack');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'local') {
  dotenv.config({ path: '.env.local' });
}

const envVars = [
  'LC_APP_ID',
  'LC_APP_KEY',
  'IRITA_WALLET_ADDRESS',
  'IRITA_WALLET_PRIVATE_KEY',
  'REMOVE_BG_API_KEY'
];

let definePluginObject = {};

for(let envVar of envVars) {
  definePluginObject = {
    ...definePluginObject,
    [envVar]: JSON.stringify(process.env[envVar])
  }
}

module.exports = {
  plugins: [
    new webpack.DefinePlugin(definePluginObject)
  ]
}
