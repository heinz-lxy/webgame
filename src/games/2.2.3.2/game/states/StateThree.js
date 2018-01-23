import vars from '../../globalData.js'; 
import stateThreeJson from '../../data/stateThree.json';

import Xsj from 'Xsj';
import t from 'tookit';

const {Cache, Controller, components, animations} = Xsj;
const {InputBox, Keyboard} = components; 
const {Guide} = animations;

let a,b,c,d,

total = 20,
sub = [5,5,5,5],
step = 2.5,
chances = 4,

keys = [];

/**
 * main class
 */
export default class StateThree{
    constructor(){
        
        this.questionBg.visible = false;

        if(vars.stateThreeIndex==0){
            this.pre();
        }else{
            this.init();
        }
    }
    pre(){
        new Guide(vars,['看我搭一个摩天大楼！'],{
            npc: 'qiqi'
        },this);
    }
    init(){
        this.makeNumbers();

        this.questionBg.visible = true; 
        let question = new Question(vars, stateThreeJson);
        let controller = new Controller(vars, {total, step, sub});
        let cache = new Cache(vars,question, keys, controller, {chances});
        new Keyboard(vars, cache);
    }
    makeNumbers(){
        keys = [];
        a = t.random(1,4);
        b = t.random(1,2); //空间不足，限为1~2
        c = t.random(1,4); //空间不足，限为1~2
        d = t.random(1,9);
        keys.push(parseInt(''+a+b+c+d));
    }
};

class Question extends InputBox{
    constructor(vars, jsonData){
        const {game} = vars;
        t.image(game, jsonData.imageJson);
        t.text(game, jsonData.textJson);

        super(game, jsonData);
        
        this.append();
    }
    append(){
        this.boxes();
    }
    boxes(){
        const {game} = this;
        let seatList; //公共存储位置信息的变量
       
        //千位
        if(a==1){
            game.add.image(217,469,'thousand');
        }else if(a>1){
            seatList = [
                {x: 156, y: 469}, {x: 305, y: 469}, {x: 156, y: 321}, {x: 305, y: 321}
            ];
            for(let i=0; i<a; i++){
                let seat = seatList[i];
                game.add.image(seat.x, seat.y,'thousand');
            }
        }

        //百位
        seatList = [
            {x: 473, y: 495}, {x: 473, y: 352}
        ];
        for(let i=0; i<b; i++){
            let seat = seatList[i];
            game.add.image(seat.x, seat.y,'hundred2');
        }
        
        //十位
        let originX = 610; //公共变量
        let gap = (120-14*c)/c;
        if(c==1){
            game.add.image(665,495,'ten2');
        }else{
            for(let i=0; i<c; i++){
                game.add.image((originX+(gap+14)*i),495,'ten2');
            }
        }

        //个位
        originX = 737;
        gap = (130-14*4)/4; //每行4个

        let height = 636;
        for(let i=0; i<d; i++){
            let row = i%4;
            if(row == 0){ //每行4个
                height -= 40;
            }
            game.add.image((originX+(gap+14)*row),height,'one2');
        }
    }

}

