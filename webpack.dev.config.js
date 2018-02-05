var path = require('path')
var fs = require('fs');
var webpack = require('webpack')

var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var fsdir = fs.readFileSync("./config.json");
var gameId = JSON.parse(fsdir).id;

let config = {
  entry: {
    "common/common": [
      "./src/common/Game/index.js",
    ]
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "[name].js"
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
        test: /\.scss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'
      },
      {
        test: /\.(png|gif|jpg|jpeg|bmp)$/i,
        loader: 'url-loader',
        options: {
          limit: 5000,
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
          name: function(path) {
            console.log(path)
            var gamePath = path.match(/\\([0-9\.]{0,})\\/);
            return (gamePath ? gamePath[1] : "public") + "/" + '[name].[ext]'
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/',
          name: '[name].[ext]'
        }
      }
    ]
  },
  devtool: "inline-source-map",
  devServer: {
    hot: true
  },
  plugins: [
    //生成html
    new HtmlWebpackPlugin({
     template: path.resolve(__dirname, './src/index.temp.html'),
     phaserPath: "./src/phaser.min.js",
     otfPath: "./" + "fonts/b.otf"
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    alias: {
      "Xsj": path.join(__dirname, "./src/games/common/modules/index.js"),
      "tookit": path.join(__dirname, "./src/games/common/library/tookit.js")
    }
  }
};

config.entry['games/' + gameId + "/build"] = path.resolve(__dirname, './src/games/' + gameId + '/index.js');

module.exports = config;

