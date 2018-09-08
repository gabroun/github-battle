var path = require('path');
//create index.html for us and put it in the dist folder also its going to include the script in the html file
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    //rules for the loaders of the transformation we want to make
    rules: [
      //babel is a code transformer
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      //pass a template (the html file) we want to use
      template: 'app/index.html'
    })
  ],
  mode: 'development'
};
