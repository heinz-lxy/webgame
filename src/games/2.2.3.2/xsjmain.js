/**
 * 游戏运行class wrapper
 */
import game from "./game/index.js";
import resources from "./resources.js";

class xsjMain { 
  constructor(config) {
    this.game = config.game;
  }
  // load方法重写
  preload() { 
    var vars = this;

    var olimage = vars.game.load.image;
    vars.game.load.image = function(...args) { //重写load.image方法
      var u = args[1].match(/(assets\/[\w\/\.\_]{0,})$/); 
      if (u) {
        args[1] = require("./" + u[1]);
      } else{
        var _u = args[1].match(/\.\.\/([\w\.\/]{0,})$/);
        args[1] = require("../" + _u[1]);
      }
      console.log(args[1])

      olimage.apply(this, args);
    }

    var olaudio = vars.game.load.audio;
    vars.game.load.audio = function(...args) {
      var u = args[1].match(/(assets\/[\w\/\.\_]{0,})$/);
      if (u) {
        args[1] = require("./" + u[1]);
      } else{
        var _u = args[1].match(/\.\.\/([\w\.\/]{0,})$/);
        args[1] = require("../" + _u[1]);
      }
      olaudio.apply(this, args);
    }

    var olspritesheet = vars.game.load.spritesheet;
    vars.game.load.spritesheet = function(...args) {
      var u = args[1].match(/(assets\/[\w\/\.\_]{0,})$/);
      if (u) {
        console.log('test1')
        args[1] = require("./" + u[1]);
      } else{
        console.log('test2')
        var _u = args[1].match(/\.\.\/([\w\.\/]{0,})$/);
        console.log(args[1])
        console.log(_u)
        args[1] = require("../" + _u[1]);
      }
      olspritesheet.apply(this, args);
    }
    if (vars.game.scale.isLandscape) {
      // 游戏加载进度
      var progressText = vars.game.add.text(vars.game.width / 2, 500, '0%', {
        fontSize: '40px',
        fill: '#000'
      });
      vars.game.stage.backgroundColor = '#e6f4ff';
      progressText.anchor.setTo(0.5, 0.5); // 设置锚点，用于文字居中
      var car = vars.game.add.image(281, vars.game.height / 2 - 108, 'load_car');
      var exhaust = vars.game.add.sprite(271, vars.game.height / 2 - 130, 'load_exhaust', 0);
      var cloud1 = vars.game.add.sprite(347, 180, 'load_cloud1');
      var cloud2 = vars.game.add.sprite(986, 142, 'load_cloud2');
      var prog = vars.game.add.sprite(vars.game.width / 2 - 772 / 2, vars.game.height / 2, 'load_progressbar1');
      vars.game.add.tween(cloud2).to({
        x: 1086
      }, 5000, null, true, 0, Number.MAX_VALUE, true);
      vars.game.add.tween(cloud1).to({
        x: 447
      }, 5000, null, true, 0, Number.MAX_VALUE, true);
    } else {
      // 游戏加载进度
      var progressText = vars.game.add.text(vars.game.height / 2, 500, '0%', {
        fontSize: '40px',
        fill: '#000'
      });
      vars.game.stage.backgroundColor = '#e6f4ff';
      // vars.game.stage.backgroundColor = '#000000';
      progressText.anchor.setTo(0.5, 0.5); // 设置锚点，用于文字居中
      var car = vars.game.add.image(281, vars.game.width / 2 - 108, 'load_car');
      var exhaust = vars.game.add.sprite(0, vars.game.height / 2 - 130, 'load_exhaust', 0);
      var cloud1 = vars.game.add.sprite(347, 180, 'load_cloud1');
      var cloud2 = vars.game.add.sprite(986, 142, 'load_cloud2');
      var prog = vars.game.add.sprite(vars.game.height / 2 - 772 / 2, vars.game.width / 2, 'load_progressbar1');
      vars.game.add.tween(cloud2).to({
        x: 1086
      }, 5000, null, true, 0, Number.MAX_VALUE, true);
      vars.game.add.tween(cloud1).to({
        x: 447
      }, 5000, null, true, 0, Number.MAX_VALUE, true);
    }
    vars.game.load.onFileComplete.add(function(progress) {
      car.x = prog.x + progress * 6.1; //车子根据加载进度前进
      exhaust.animations.add('load_scissors1', [0, 1, 2, 3], 10, true).play();
      if (vars.game.scale.isLandscape) {
        exhaust.x = car.x - 120;
      } else {
        exhaust.y = car.y - 20;
        exhaust.x = car.x - 120;
      }
      if (vars.game.scale.isLandscape) {
        var preloadSprite = vars.game.add.sprite(vars.game.width / 2 - 760 / 2, vars.game.height / 2 + 6, 'load_progressbar');
      } else {
        var preloadSprite = vars.game.add.sprite(vars.game.height / 2 - 760 / 2, vars.game.width / 2 + 6, 'load_progressbar');
      }
      vars.game.load.setPreloadSprite(preloadSprite); //进度条的加载进度
      progressText.text = '加载中' + progress + '%';
    });
    resources.preload();
  }
  create() {
    this.game.state.add("Game", game);
    this.game.state.start("Game");
  }
}

export default xsjMain;
