import vars from '../../globalData.js'; 
import stateOneJson from '../../data/stateOne.json';

import Xsj from 'Xsj';
import t from 'tookit';
const {Cache, Controller, components, animations} = Xsj;
const {InputBox, Keyboard} = components; 
const {Guide} = animations;

let m,n,a,

total = 20,
sub,
step = 2.5,
chances = 4,

append = 0, //hack:用户拨动的算盘数值
keys = [];
/**
 * main class
 */
export default class StateOne{
    constructor(){
        t.image(vars.game, [{x:0, y:0, name:'bg'}]);

        this.pre();
    }
    pre(){
        const {game} = vars;
     
        const wrapper = this.wrapper = t.wrapper(game); //便于destory

        const [,light1, light2, light3] = t.sprite(game,[
            {x:300, y:245, name:'board2'},
            {x:199, y:120, name:'light1'},
            {x:177, y:125, name:'light2'},  
            {x:417, y:60, name:'light3'}         
            ],wrapper);
      
        t.flicker(game, light1,1000);
        setTimeout(() => {
            t.flicker(game, light2, 1000);
        },300);
        setTimeout(() => {
            t.flicker(game, light3, 1000);
        },600);

        new Guide(vars,['又到手了新的数学用具呢。','先试试看顺不顺手。'],{
            npc: 'qiqi'
        },this);
    }
    init(){
        this.makeNumbers();

        this.wrapper.destroy();

        let question = new Question(vars, stateOneJson);
        let controller = new Controller(vars, {total, step, sub});
        let cache = new StateOneCache(vars,question, keys, controller, {chances});
        new Keyboard(vars, cache);
    }
    makeNumbers(){
        let ten1,one1,ten2,one2;

        do{
            ten1 = t.random(1,9);
            one1 = t.random(1,9);
            ten2 = t.random(1,9);
            one2 = t.random(1,9);
        }while(ten2<=ten1 || one2<=one1);
        n = parseInt('99'+ten1+one1);
        m = parseInt('99'+ten2+one2);
        a = m-n;
        keys.push(a);
    }
};

class Question extends InputBox{
    constructor(vars, jsonData){
        const {game} = vars;
        const {imageJson, textJson, boxJson} = jsonData;
        t.image(game, imageJson);
        t.text(game, textJson);

        super(game, boxJson); 

        this.tenItemList = [];
        this.oneItemList = [];
        this.append();
    }
    append(){
        this.initDigits();

        const {game} = this;

        t.text(game, [
            {x:187, y:566, content: ('从'+n+'到'+m+'有几个数字呢？拨一拨，数一数')},
            {x:312, y:610, content: (n+' ———> '+m)}
        ]);

        t.dynamic(() => {
            return t.image(game, {x:510, y:135, name:'rect'});
        }, elem => {
            this.hand.destroy();
            elem.destroy();
        })

        let hand = this.hand = t.image(game, {x:600, y:206, name:'hand'});  
        t.interval(game, 400, () => {
            hand.frame = (hand.frame+1)%2;
        })
    }
    initDigits(){
        if(this.board){
            this.board.destroy();
            this.hand.destroy();
            this.oneItemList = [];
            this.tenItemList = [];
        }
        let board = this.board = vars.game.add.image(306,89,'board1');   

        this.setDigit(board,0,0); // 万位
        this.setDigit(board,1,9);
        this.setDigit(board,2,9);
        this.setDigit(board,3,t.ten(n)); //十位
        this.setDigit(board,4,t.one(n)); //个位
    }
    /**
     * 设置算盘个位上的珠子
     */
    setDigit(board, digit, value){ //0,1,2,3,4 代表万,千,百,个位
        const {game} = this;
        // 算盘下方 
        for(let i=0; i<value; i++){
            t.image(game,{
                x: 53+55*digit,
                y: 366-17*i,
                name: 'item'
            },board);
        }
        // 算盘上方
        for(let i=0; i<(9-value); i++){
            let item = t.image(game,{
                x:53+55*digit,
                y:55+17*i,
                name:'item'
            },board);
            if(digit>2){ //十位个位上方动态珠子
                if(digit==3){ //十位
                    t.bindClick(item, () => {
                        append += 10; //hack
                        let length = this.tenItemList.length;
                        let target = this.tenItemList.pop();
                        i = 9 - length;
                        t.moveTo(game, target, { x:(53+55*digit), y: (366-17*i) },2000);
                    });
                     this.tenItemList.push(item);
                }else{ //个位
                    t.bindClick(item, () => {
                        append ++; //hack
                        let length = this.oneItemList.length;
                        let target = this.oneItemList.pop();
                        i = 9 - length;
                        t.moveTo(game, target, { x:(53+55*digit), y: (366-17*i) },2000);
                    });
                    this.oneItemList.push(item);
                }
            }
        }
    }
}

class StateOneCache extends Cache{
    constructor(vars,question, keys, controller, config){
        super(vars,question, keys, controller, config);
    }
    submit(){
        const {game, keys, question, controller, config} = this;
       
        //算盘拨动判断
        if(append!=a){
            this.err++;            
        }

        this.answers.forEach((answer, index) => { 
            if(answer!=keys[index]){ //错误
                question.drawRect(index,1);
                this.err++;
            }else{ 
                question.drawRect(index,0);
            }
        });
        this.totalErr += this.err;

        if(this.err==0){
            game.add.audio('true').play();
            controller.next(this.totalErr);
        }else{
            game.add.audio('false').play();
            if(this.chances>1){ 
                this.chances--;
                //还原算盘
                append = 0;
                question.initDigits();
                setTimeout(() => {
                    this.answers = new Array(keys.length).fill('');
                    question.empty();
                    this.err = 0; 
                    this.confirmKey.inputEnabled = false;
                    this.confirmKey.frame = 2;
                },5000);
            }else{ 
                question.reveal(keys);
                setTimeout(() => {
                    controller.next();
                },5000);
            }
        }
    }
}
