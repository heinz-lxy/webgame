/**
 * 游戏运行主文件
 */
import vars from '../globalData.js'; 
import gameManager from '../../common/modules/gameManager.js';

import StateOne from './states/StateOne.js';
import StateTwo from './states/StateTwo.js';
     
export default {
    create() {
        switch (vars.key){
            case 1:
                new StateOne();
                vars.game.add.audio('BGM',1,true,true).play(); 
                vars.beginTime = true;
                break;
            case 2:
            	new StateTwo();
            	break;
        }
        let gameMgr = vars.gameMgr = new gameManager(vars);
        gameMgr.init();
        if(vars.stateTwoIndex>0){
            return;
        }
        gameMgr.bg.visible = false; //引导时隐藏
    }
}
