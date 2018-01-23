var path = require('path')
var fs = require('fs');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');


var fsdir = fs.readFileSync("./test.json");
var componentName = JSON.parse(fsdir).component;


let config = {
  entry: {
    "script": "./ui-test/test.js"
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
        options:{
        	name: function(path){
        		console.log(path)
        	}
        }
        
        
      },
      {
        test: /\.(mp3|mp4|wav|webm)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader'
      }
    ]
  },
  devtool: "inline-source-map",
  devServer: {
    hot: true
  },
  resolve:{
  },
  plugins: [
    //生成html
    new HtmlWebpackPlugin({
     template: path.resolve(__dirname, './ui-test/index.htm'),
     phaserPath: "./ui-test/phaser.min.js"
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
};

config.entry['Component'] = './src/games/common/modules/components/'+componentName+'/index.js';
config.entry['Resource'] = './src/games/common/modules/components/'+componentName+'/resources.js';

config.resolve.alias = {
	Component: path.join(__dirname, './src/games/common/modules/components/'+componentName+'/index.js'),
	Resource: path.join(__dirname, './src/games/common/modules/components/'+componentName+'/resources.js')
}



module.exports = config;

