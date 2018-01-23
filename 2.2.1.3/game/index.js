/**
 * 游戏运行主文件
 */
import vars from '../globalData.js'; //全局变量
import Xsj from 'Xsj';
const {gameManager} = Xsj;

//状态：游戏模式
import StateOne from './states/StateOne.js';
import StateTwo from './states/StateTwo.js';
import StateThree from './states/StateThree.js';
import stateFour from './states/stateFour.js';      

export default {
    create() {
        switch (vars.key){
            case 1:
                new StateOne();
                
                break;
            case 2:
                new StateTwo();
                break;
            case 3:
                new StateThree();
                break;
            case 4:
                new stateFour();
                break;
        }
        let gameMgr = vars.gameMgr = new gameManager(vars);
        gameMgr.init();
        if(vars.key==1 && vars.stateOneIndex==0){
            gameMgr.bg.visible = false;
        }
        if(vars.key==2 && vars.stateTwoIndex==0){
            gameMgr.bg.visible = false;
        }
    }
}
