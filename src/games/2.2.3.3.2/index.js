/**
 * 游戏工程主文件
 */
import game from './xsjMain.js'; 
import publicGame from '../../common/publicGame'; //phaser封装
import vars from './globalData.js'; 
import resources from './resources.js'; 

var gameId = '2.2.3.3.2';

class index extends publicGame { //引入phaser封装
  constructor() {
    super(game, gameId, resources); 
    vars.game = this.config.game;
  }
}

new index();
