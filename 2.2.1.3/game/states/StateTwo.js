import vars from '../../globalData.js'; 
import stateTwoJson from '../../data/stateTwo.json';

import Xsj from 'Xsj';
import t from 'tookit';
const {InputBox, Keyboard, Cache, Controller, Guide} = Xsj;

let m,n,a,b,

stateTwoIndex,
total = 20,
sub = [5,5,5,5],
step = 1,
chances = 1, 
text = '完成下方竖式计算',
keys = [];

/**
 * main class
 */
export default class StateTwo{
    constructor(){
        vars.game.add.image(0,0,'background'); 
        this.bg = vars.game.add.image(0,0,'bg');
        this.bg.visible = false; 
        if(vars.stateTwoIndex==0){
            this.pre();
        }else{
            this.init();
        }
    }
    pre(){
        new StateTwoGuide(vars,[
            '老师来还有一段时间，那我们就再做几题吧。'
            ],{
            npc: 'qiqi_yh'
        },this);
    }
    init(){
        stateTwoIndex = vars.stateTwoIndex;
        this.makeNumbers();

        this.bg.visible = true; 
        let question = new Question(vars, stateTwoJson, {hide:true});
        let controller = new StateTwoController(vars, {total, step, sub, text}, question);
        let cache = new Cache(vars, question, keys, controller, {chances});

        new Keyboard(vars, cache);
    }
    makeNumbers(){
        do{
          n = t.random(1,9);
          a = t.random(1,9);
          b = t.random(1,n-1);
          m = a*n + b;  
        }while(a*n<10);
        
        keys = [a, t.ten(a*n), t.one(a*n), b];
    }
};

class Question extends InputBox{
    constructor(vars, jsonData,config){
        const {game} = vars;
        t.image(game, jsonData.imageJson);
        t.text(game, jsonData.textJson);

        super(game, jsonData,config);

        this.inputIndex = 0;
        this.append();
    }
    append(){
        const {game} = this;
        
        t.text(game, [
            {x:372, y:449, content:n, size:'30px', color:'#464643'},
            {x:475, y:449, content:Math.floor(m/10), size:'30px', color:'#464643'},
            {x:581, y:449, content:(m%10), size:'30px', color:'#464643'}
        ])
    }
    flip(){ //翻页效果
        const {game} = this;

        game.add.audio('flip2').play();
        let flip = game.add.image(295, 159, 'flip');
        flip.width = 1120;
        flip.height = 550;
        game.time.events.repeat(Phaser.Timer.SECOND * 0.03, 24, () => {
            flip.frame++;
            if(flip.frame>23){
                flip.destroy();
            }
        });
    }
}

class StateTwoController extends Controller{
    constructor(vars, config, question){
        super(vars, config);
        this.question = question;
    }
    nextSub(indexName){
        let question = this.question;

        question.flip();
        setTimeout(() => {
            super.nextSub(indexName);
        },700);
    }
}

class StateTwoGuide extends Guide{
    constructor(vars, data, config, state){
        super(vars, data, config, state);
    }
    onEnd(){
        this.mask.destroy();
        vars.gameMgr.bg.visible = true;

        this.state.init();
    }
}