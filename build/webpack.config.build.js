/* ======================================================
/  WEBPACK BUILT - PRODUCTION ENV
/ ===================================================== */
const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',

  // -- ENTRY POINT -- //
  entry: {
    app: ['./src/app.js']
  },

  // -- OUTPUT -- //
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist/'),
    publicPath: '/dist/'
  },

  // -- RULES -- //
  module: {
    rules: [

      // -- BABEL
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          // .babelrc location
          loader: 'babel-loader?babelrc=false&extends=' + require('path').join(__dirname, '.babelrc')
        }
      },

      // -- ESLINT
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /(node_modules|bower_components)/,
        options: {
          failOnError: false,
          failOnWarning: false
        }
      },

      // -- STYLES
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, '../build/postcss.config.js')
              }
            }
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              // Include Settings & Mixins overall
              resources: path.resolve(__dirname, '../src/0-Quarks/_global.scss')
            }
          }
        ]
      },

      // -- VUEJS
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      },

      // -- IMAGES
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[ext]'
        }
      },

      // -- FONTS
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },

  // -- RESOLVE -- //
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },

  // -- OPTIMIZATION -- //
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },

  // -- PLUGINS -- //
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.(js|vue)$/,
      options: {
        eslint: {
          configFile: require('path').join(__dirname, '.eslintrc.js'),
          cache: false
        }
      }
    }),
    new StyleLintPlugin({
      configFile: require('path').join(__dirname, '.stylelintrc')
    }),
    new CleanWebpackPlugin(['../dist']),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
      // filename: isHot ? 'css/[name].css' : 'css/[name].css',
      // chunkFilename: 'css/[id].css'
    }),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
  ]
}
