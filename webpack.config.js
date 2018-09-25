var path = require('path');
//create index.html for us and put it in the dist folder also its going to include the script in the html file
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    //Cannot get /popular component when refreshing
    //what's happening is the browser making a request to your server in order to get the assets for /popular the are none because we using react router to handle all of the rounting
    //the publicPath property let us set the base path for all of the assets
    publicPath: '/'
  },
  module: {
    //rules for the loaders of the transformation we want to make
    rules: [
      //babel is a code transformer
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  //what the devServer property does is instead of requesting the assets of /popular (after the page is refreshed) it wll redirect us to the basepath as setup up and then react router will load the route for /popular
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      //pass a template (the html file) we want to use
      template: 'app/index.html'
    })
  ],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};
