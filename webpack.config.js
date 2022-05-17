const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src') + '/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
