const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { NODE_ENV, STYLE_DEBUG, ENV_LOCALE } = process.env;
const __PRO__ = NODE_ENV === 'production';
const extractLess = new ExtractTextPlugin('style.[hash].css');
const rsuiteStylePath = path.resolve(__dirname, './node_modules/rsuite/styles');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    disableHostCheck: true,
    historyApiFallback: true,
    compress: true,
    host: '0.0.0.0',
    port: 3900
  },
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          //'transform-loader?brfs', // Use browserify transforms as webpack-loader.
          'babel-loader?babelrc'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(less|css)$/,
        loader: extractLess.extract({
          use: ['css-loader', 'less-loader'],
          // use style-loader in development
          fallback: 'style-loader?{attrs:{prop: "value"}}'
        })
      },
      {
        test: /\.(jpg|png|svg)$/,
        //`publicPath`  only use to assign assets path in build
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              publicPath: '/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)($|\?)/,
        include: [rsuiteStylePath],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              size: 16,
              hash: 'sha512',
              digest: 'hex',
              name: 'resources/[hash].[ext]',
              publicPath: '/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    extractLess,
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-gb/),
    new webpack.NamedModulesPlugin(),
    new HtmlwebpackPlugin({
      title: 'Wakatime Dashboard',
      template: 'src/index.html',
      inject: true
    })
    // new BundleAnalyzerPlugin({ openAnalyzer: false })
  ]
};
