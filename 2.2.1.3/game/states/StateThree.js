import vars from '../../globalData.js'; 
import stateThreeJson from '../../data/stateThree.json';

import Xsj from 'Xsj';
const {InputBox, Keyboard, Cache, Controller} = Xsj;

import t from 'tookit';

let numberList,

stateThreeIndex,
total = 30,
sub = [5,5,5,5,5,5],
step = 1,
chances = 1, 
text = '算出字母所代替的数字',
keys = [];

/**
 * main class
 */
export default class StateThree{
    constructor(){
        this.init();
    }
    init(){
        stateThreeIndex = vars.stateThreeIndex;
        this.makeNumbers();

        vars.game.add.image(0,0,'background'); 
        vars.game.add.image(0,0,'bg');
        let question = new Question(vars, stateThreeJson);
        let controller = new StateThreeController(vars, {total, step, sub, text}, question);
        let cache = new Cache(vars, question, keys, controller, {chances});

        new Keyboard(vars, cache);
    }
    makeNumbers(){
        numberList = [];
        keys = [];

        let m,n,a,b;
        for(let i=0 ;i<2; i++){
            do{
              n = t.random(1,9);
              a = t.random(1,9);
              b = t.random(1,n-1);
              m = a*n + b;  
            }while(a*n<10);
            numberList.push({m,n,a,b});
            keys.push(a);
        }
    }
};
/**
 * 扩充Question
 */
class Question extends InputBox{
    constructor(vars, jsonData){
        const {game} = vars;
        t.image(game, jsonData.imageJson);
        t.text(game, jsonData.textJson);

        super(game, jsonData);

        this.inputIndex = 0;
        this.append();
    }
    append(){
        const {game} = this; 

        t.text(game, [
            {x:438, y:346, content:(numberList[0].n+' × M < '+numberList[0].m), size:'45px', color:'#393939'},
            {x:438, y:540, content:(numberList[1].n+' × N < '+numberList[1].m), size:'45px', color:'#393939'}
        ]);
    }
    flip(){ //翻页效果
        const {game} = this; 

        game.add.audio('flip2').play();
        let flip = vars.game.add.image(295, 159, 'flip');
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
/**
 * 重写Controller nextSub实现翻页
 */
class StateThreeController extends Controller{
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