var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var isProduction=process.env.NODE_ENV === 'production';

var plugins = [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(), //热加载插件
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({//设置环境变量
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }),
      // new CleanWebpackPlugin(
      //     ['dist','build'],　 //删除整个文件夹
      //     {
      //         root: __dirname,       　　　　　　　　　　//根目录
      //         verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
      //         dry:      false        　　　　　　　　　　//启用删除文件
      //     }
      // ),
      new webpack.LoaderOptionsPlugin({//css兼容插件
          options: {
              postcss: function() {
                  return [require('autoprefixer')];
              }
          }
      }),
      new ExtractTextPlugin({ 
          filename: 'css/main.[hash].css'
      }),
      // new CopyWebpackPlugin([//拷贝整个目录
      //     { 
      //       from: './css',
      //       to:'./css'
      //     },
      //     {
      //       from:'./js',
      //       to:'./js'
      //     },
      //     {
      //       from:'./img',
      //       to:'./img'
      //     }
      // ]),
      // new webpack.ProvidePlugin({//把jq作为全局变量插入到所有的代码中，不再需要import $ from 'jquery';
      //     $: "jquery",
      //     jQuery: "jquery",
      //     "window.jQuery": "jquery"
      // }),
      new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
      new HtmlWebpackPlugin({
          filename:'sign.html',
          // inject: false,
          template: __dirname + "/src/sign.html",
          chunks:['sign','vendor']
      }),
      new HtmlWebpackPlugin({
          filename:'vue.html',
          // inject: false,
          template: __dirname + "/src/vue.html",
          chunks:['main','vendor']
      })
  ];

if (isProduction) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({sourceMap: true }));
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  devtool: isProduction?'nosources-source-map':'inline-source-map',
  entry:{
      // jq:['jquery'],
      vendor:['vue','vuex'],
      main:'./entries/main',
      sign:'./entries/sign'
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: __dirname + '/dist'
  },
  devServer: {
      port:3004,
      compress:true,
      contentBase: "dist/",//本地服务器所加载的页面所在的目录
      historyApiFallback: true,//不跳转
      inline: true//实时刷新
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=true',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[{
            loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            'postcss-loader',
            'less-loader'
          ]
        })
      },
      {
          test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'url-loader?limit=20000'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins:plugins
}
