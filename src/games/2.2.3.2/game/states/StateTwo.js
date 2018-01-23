import vars from '../../globalData.js'; 
import stateTwoJson from '../../data/stateTwo.json';

import Xsj from 'Xsj';
import t from 'tookit';

const {Cache, Controller, components, animations} = Xsj;
const {InputBox, Keyboard} = components; 
const {Guide} = animations;

let a,b,c,

total = 20,
sub = [5,5,5,5],
step = 1,
chances = 4,

keys = [];

/**
 * main class
 */
export default class StateTwo{
    constructor(){
        this.questionBg = vars.game.add.image(0,0,'bg'); 
        this.questionBg.visible = false; //hack: 默认隐藏答题背景
        
        if(vars.stateTwoIndex==0){
            this.pre();
        }else{
            this.init();
        }
    }
    pre(){
        new Guide(vars,['我需要劳逸结合，爷爷前几天给我买的积木呢?'],{
            npc: 'qiqi'
        },this);
    }
    init(){
        this.makeNumbers();
       
        this.questionBg.visible = true; //显示答题背景
        let question = new Question(vars, stateTwoJson);
        let controller = new Controller(vars,{total, step, sub});
        let cache = new Cache(vars,question, keys, controller, {chances});
        new Keyboard(vars, cache);
    }
    makeNumbers(){
        keys = [];
        a = t.random(1,2);
        b = t.random(1,5); //空间不足，限为1~5
        c = t.random(1,9);
        keys.push(parseInt(''+a+b+c));
    }
};

class Question extends InputBox{
    constructor(vars, jsonData){
        const {game} = vars;
        const {imageJson, textJson, boxJson} = jsonData;
        t.image(game, imageJson);
        t.text(game, textJson);

        super(game, boxJson);

        this.append();
    }
    append(){
        this.boxes();
        
        const {game} = this;
        let symbol;
        switch(vars.stateTwoIndex){
            case 0:
                symbol = '①';
                break;
            case 1:
                symbol = '②';
                break;
            case 2:
                symbol = '③';
                break;
            case 3:
                symbol = '④';
                break;

        }
        game.add.text(211,307,symbol,{fill:'#464643',font:'20px'});
    }
    boxes(){
        const {game} = this;

        //百位
        if(a==1){
            game.add.image(196,388,'hundred1');
        }else{
            const seatList = [
                {x: 269, y: 370}, {x: 269, y: 497}
            ];
            seatList.forEach(seat => {
                let hundred = game.add.image(seat.x,seat.y,'hundred1');
                hundred.width = 114;
                hundred.height = 109;
            })
        }

        //十位
        let originX = 430;
        let gap = (190-28*b)/b;
        if(b==1){
            game.add.image(520,388,'ten1');
        }else{
            for(let i=0; i<b; i++){
                game.add.image((originX+(gap+28)*i),388,'ten1');
            }
        }

        //个位
        let originX2 = 630;
        let originY2 = 544;
        let gap2 = (159-28*4)/4; //每行4个

        let height = 615;
        for(let i=0; i<c; i++){
            let row = i%4;
            if(row == 0){ //每行4个
                height -= 40;
            }
            game.add.image((originX2+(gap2+28)*row),height,'one1');
        }
    }

}
