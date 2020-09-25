const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // применять это правило только к CSS-файлам
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // к этим файлам нужно применить пакеты, которые мы уже установили
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'style.css' }),
  ],
};
