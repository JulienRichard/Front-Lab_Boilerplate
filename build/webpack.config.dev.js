/* ======================================================
/  WEBPACK DEV SERVER - DEVELOPMENT ENV
/ ===================================================== */
const path = require('path')
const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')
const BrowserSync = require('browser-sync')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { VueLoaderPlugin } = require('vue-loader')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = env => {
  const devConfig = {
    mode: 'development',

    // -- ENTRY POINT -- //
    entry: {
      app: ['./src/app.js']
    },

    // -- OUTPUT -- //
    output: {
      filename: 'js/[name].js',
      path: path.resolve(__dirname, '../'),
      publicPath: 'http://localhost:8080/'
    },

    // -- DEV SERVER -- //
    devServer: {
      hot: true,
      inline: true,
      publicPath: '/',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
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
            'css-hot-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
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
      new DashboardPlugin(),
      new BundleAnalyzerPlugin({
        analyzerHost: 'localhost',
        analyzerPort: 4000
      }),
      new webpack.HotModuleReplacementPlugin(),
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
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      })
    ]
  }

  // BrowserSync server
  BrowserSync({
    proxy: 'http://localhost:8888/',
    open: false,
    port: 3000,
    files: ['**/*.php'],
    ghostMode: {
      clicks: false,
      location: false,
      forms: false,
      scroll: false
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'info',
    logPrefix: 'browserSync',
    notify: false,
    reloadDelay: 0
  })

  return devConfig
}
