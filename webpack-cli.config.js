// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/cli/src/index.ts',
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.join(__dirname, 'out/cli/src'),
    filename: 'index.js',
  },
  target: 'node',
};
