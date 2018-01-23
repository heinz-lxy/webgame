/**
 * 游戏运行主文件
 */
import vars from '../globalData.js'; 
import Xsj from 'Xsj';
const {gameManager} = Xsj;

import StateOne from './states/StateOne.js';
import StateTwo from './states/StateTwo.js';
import StateThree from './states/StateThree.js';
import StateFour from './states/StateFour.js';
     
export default {
    create() {
        vars.game.add.image(0,0,'background');
        switch (vars.key){
            case 1:
                new StateOne();
                vars.game.add.audio('BGM',1,true,true).play(); 
                vars.beginTime = true;
                break;
            case 2:
            	new StateTwo();
            	break;
            case 3:
                new StateThree();
                break;
            case 4:
                new StateFour();
                break;
        }
        let gameMgr = vars.gameMgr = new gameManager(vars);
        gameMgr.init();

        if(vars.key==2&&vars.stateTwoIndex>0 || vars.key==3&&vars.stateThreeIndex>0){
            return;
        }
        gameMgr.bg.visible = false; //引导时隐藏
    }
}
