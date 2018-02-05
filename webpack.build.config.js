const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const cdnPath = "../../"; //静态资源路径


const fsdir = fs.readFileSync("./config.json");
const gameId = JSON.parse(fsdir).id;

let config = {
  entry: {
    "common/common": [
          "./src/common/Game/index.js"
    ]

  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "[name].js",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(png|gif|jpg|jpeg|bmp)$/i,
        loader: 'url-loader',
        options: {
          limit: 5000,
          publicPath: cdnPath,
          outputPath: 'static/image/',
          name: function(path) {
            var gamePath = path.match(/\\([0-9\.]{0,})\\/);
            return (gamePath ? gamePath[1] : "public") + "/" + '[name].[ext]'
          }
        }
      },
      {
        test: /\.(mp3|mp4|wav|webm)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'static/media/',
          publicPath: cdnPath,
          name: function(path) {
            var gamePath = path.match(/\\([0-9\.]{0,})\\/);
            return (gamePath ? gamePath[1] : "public") + "/" + '[name].[ext]'
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'static/fonts/',
          publicPath: cdnPath,
          name: '[name].[ext]'
        }
      }

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: gameId,
      filename: "games/" + gameId + "/index" + ".html",
      template: path.resolve(__dirname, './src/index.temp.html'),
      chunks: ["common/common", "common/vendor", 'games/' + gameId + "/build"],
      phaserPath: "../../common/phaser.min.js",
      otfPath: (cdnPath === "" ? cdnPath : "../../") + "static/fonts/b.otf"
    }),
   
    new webpack.optimize.CommonsChunkPlugin({
      name: "common/common",
      chunks: ["games+" + gameId + "+build"],
      minChunks: Infinity
    }),
    //将js文件删除注释并且压缩
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false
      }
    }),
    //将phaser框架添加到生成的build文件夹中的common文件夹中
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './src/phaser.min.js'),
      to: path.resolve(__dirname, './build/common/phaser.min.js'),
    }]),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
  ],
  resolve: {
    alias: {
      "Xsj": path.join(__dirname, "./src/games/common/modules/index.js"),
      "tookit": path.join(__dirname, "./src/games/common/library/tookit.js")
    }
  }
};
config.entry['games/' + gameId + "/build"] = path.resolve(__dirname, './src/games/' + gameId + '/index.js');

module.exports = config;

