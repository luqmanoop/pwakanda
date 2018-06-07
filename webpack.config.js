const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './public/js/index.js',
    movie: './public/js/movie.js'
  },
  mode: 'production',
  devtool: 'none',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './public/js/')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { url: false }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/[name].css'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
};
