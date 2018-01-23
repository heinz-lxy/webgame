/**
 * 游戏工程主文件
 */
import game from './xsjMain.js'; 
import commonGame from '../../common/publicGame'; //phaser封装
import vars from './globalData.js'; //参数
import resources from './resources.js'; //资源加载

var gameId = '2.2.1.3';

if (gameId === undefined) {
  throw Error('在游戏下面的index文件夹中赋值gameId为游戏编号');
}

class index extends commonGame { //引入phaser封装
  constructor() {
    super(game, gameId, resources); 
    vars.game = this.config.game;
  }
}

new index();
