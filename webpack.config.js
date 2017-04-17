const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './app/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html',
      filename: 'index.html',
      inject: 'body',
      hash: false,
      minify: {
        collapseWhitespace: true
      }
    }),
    // uglify and minify JS (for production)
    // new UglifyJSPlugin({
    //   sourceMap: false
    // })
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.sol/, loader: 'truffle-solidity' },
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {
        test: /\.css$/,
            include: [
                path.resolve(__dirname, "not_exist_path")
            ],
            loader: "style!css"
      },
      { test: /\.less$/,
          use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "less-loader" // compiles Less to CSS
          }]
      }
    ]
  }
}
