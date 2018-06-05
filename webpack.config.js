const path = require('path');

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
  }
};
