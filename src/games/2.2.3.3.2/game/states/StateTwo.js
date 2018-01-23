import vars from '../../globalData.js'; 
import stateTwoJson from '../../data/stateTwo.json';

import Xsj from 'Xsj';
import t from 'tookit';
const {InputBox, Cache, Controller, Keyboard, Guide} = Xsj;

let m,

total = 20,
sub = [10,10],
step = 2.5,
chances = 2,

keys = [];

/**
 * main class
 */
export default class StateTwo{
    constructor(){
        this.background = vars.game.add.image(0,0,'background'); 
        this.questionBg = vars.game.add.image(0,0,'bg'); 
        this.questionBg.visible = false; //hack: 默认隐藏答题背景
        
        if(vars.stateTwoIndex==0){
            this.pre();
        }else{
            this.init();
        }
    }
    pre(){
        new Guide(vars,[
            '爸爸真是的，报纸上都写着还要我记下，报纸又不会消失\n掉。',
            '?这报纸看完又不扔，这两父子。',
            '嗯......爸爸真是智者。'
            ],{
            npc: ['yangyang_yh', 'yangyangMother', 'yangyang']
        },this);
    }
    init(){
        this.makeNumbers();

        this.questionBg.visible = true; 
        let question = new Question(vars, stateTwoJson);
        let controller = new Controller(vars, {total, step, sub});
        let cache = new Cache(vars, question, keys, controller, {chances});
        new Keyboard(vars, cache);
    }
    makeNumbers(){
        keys = []; //清除缓存

        let a = t.random(1,9);
        let b = t.random(1,9);
        let c = t.random(1,9);
        let d = t.random(1,9);

        m = parseInt(''+a+b+c+d);
        
        keys.push(a*1000);
        keys.push(b*100);
        keys.push(c*10);
        keys.push(d);
    }
};


class Question extends InputBox{
    constructor(vars, jsonData,config){
        const {game} = vars;
        const {imageJson, textJson, boxJson} = jsonData;
        t.perf()
        t.image(game, jsonData.imageJson);
        t.text(game, jsonData.textJson);
        t.perf()
        t.perf()
        super(game, boxJson, config);
        t.perf()
        t.perf()
        this.append();
        t.perf()
    }
    append(){
        const {game} = this;

        t.text(game, {
            x:380, y:342, content:'（'+(vars.stateTwoIndex+1)+'）    '+m, size:'35px'
        });
    }
}

