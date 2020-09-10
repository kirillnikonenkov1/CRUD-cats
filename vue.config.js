const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'src/assets', to: 'assets' },
        ],
      }),
    ]
  }
};
