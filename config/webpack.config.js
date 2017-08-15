const env = process.env.NODE_ENV || 'development';
const isDev = (env === 'development');
const isProd = (env === 'production');
const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const extractCommonStyles = new ExtractTextPlugin({ filename: 'common.[contenthash].css', allChunks: true });

const entry = [
  './src/index.js',
  './src/less/main.less'
];

const plugins = [
  extractCommonStyles,
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    sourceMap: isDev
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html',
    inject: true
  }),
];

if (isDev) {
  entry.push('./bin/dev-client.js');
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new FriendlyErrorsPlugin());
}

if (isProd) {
  plugins.push(
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  );
}

module.exports = {
  context: path.resolve(__dirname, '..'),
  devtool: isDev ? 'cheap-module-eval-source-map' : false,
  entry: {
    app: entry
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        include: [path.resolve('./src')],
        use: extractCommonStyles.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                extract: isProd,
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
                extract: isProd,
              }
            }
          ],
          publicPath: '.'
        })
      },
      {
        test: /\.js$/,
        include: [path.resolve('./src')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
    ]
  },
  plugins
};
