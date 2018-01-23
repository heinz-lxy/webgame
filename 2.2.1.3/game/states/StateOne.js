import vars from '../../globalData.js'; 
import stateOneJson from '../../data/stateOne.json';

import Xsj from 'Xsj';
import t from 'tookit';
const {InputBox, Keyboard, Cache, Controller, Guide, animations} = Xsj;
const {CountDown, Task} = animations;

let m,n,a,b,
totalBook,

stateOneIndex,
total = 25,
sub = [10,15],
step = 1,
chances = 3,
text = '完成下方竖式计算',
keys = [];

/**
 * main class
 */
export default class StateOne{ 
    constructor(){
        vars.game.add.image(0,0,'background'); 
        this.bg = vars.game.add.image(0,0,'bg');
        this.bg.visible = false; 
        if(vars.stateOneIndex==0){
            new CountDown(vars, () => {
                vars.beginTime = true;
                this.pre();
            })
        }else{
            this.init();
        }
    }
    pre(){
        vars.game.add.audio('BGM',1,true,true).play();
        new StateOneGuide(vars,[
            '好了好了！快点把昨天的作业都交上来！'
            ],{
            npc: 'qiqi_yh'
        },this);
    }
    init(){
        stateOneIndex = vars.stateOneIndex;
        this.makeNumbers();
        
        this.bg.visible = true; 
        let config = stateOneIndex==1?{hide:true}:{};
        let question = new Question(vars, stateOneJson[stateOneIndex], config);
        let controller = new Controller(vars, {total, step, sub, text});
        let cache = new Cache(vars, question, keys, controller, {chances});

        new Keyboard(vars, cache);

        if(stateOneIndex==0){
            new Task(vars, '把下方的作业堆分成'+n+'组', true).taskPanelDown();
        }else{
            setTimeout(() => { //hack
                new Task(vars, '一共有'+m+'个人，平均分成'+n+'个组，每组\n能分到多少本，还剩下多少本', true).taskPanelDown();
            },20);
        }
    }
    makeNumbers(){
        if(stateOneIndex==0){
            do{
                m = totalBook = t.random(30,50);
                n = t.random(1,4);
                a = t.divide(m,n);
            }while(m%n==0 || a>9); //每组最多14本
            b = m%n;
            keys = [a, b];
        }else{
            keys = [a, t.ten(a*n), t.one(a*n), b];
        }
    }
};


class Question extends InputBox{
    constructor(vars, jsonData){
        const {game} = vars;
        t.image(game, jsonData.imageJson);
        t.text(game, jsonData.textJson);
        
        super(game, jsonData);
        
        if(stateOneIndex==0){
            this.bookList = []; 

            this.stackIndex = 0;
            this.inputIndex = -1;
            this.boxList[0].children[0].frame = 0;  //取消第一个输入框选定
        }else{
            this.inputIndex = 0;
        }
        this.append();
    }
    append(){
        const {game} = this;
       
        if(stateOneIndex==0){
            this.stacks();
            t.text(game, {x: 189, y: 185, content: ('一共有'+m+'人，平均分成'+n+'组，那么：'), size:'30px', color:'#464643'});
        }else{
            t.text(game, [
                {x:333, y:326, content:n, size:'30px', color:'#464643'},
                {x:435, y:326, content:parseInt(m/10), size:'30px', color:'#464643'},
                {x:539, y:326, content:(m%10), size:'30px', color:'#464643'},
                {x:657, y:336, content:('有'+m+'个人，平均分成'+n+'份'), size:'20px', color:'#464643'},
            ]);
        }
    }
    stacks(){ 
        const {game} = this;
    
        let mainStack = game.add.group();
        for(let i=0; i<14; i++){
            let book = mainStack.addChild(game.add.image(97,595-15*i,'single_book'));
            book.inputEnabled = true;
            book.events.onInputDown.add(() => {
                if(this.hand){
                    this.hand.destroy();
                    this.hand = null;
                }
                //生成书本
                this.makeStack(a); 
                if(this.stackIndex>=n){ 
                    this.inputIndex = 0;
                    this.bookList.forEach((item,index) => {
                        if(index>=b){
                            item.destroy();
                        }
                    })
                }
            });
            this.bookList.push(book);
        }

        let hand = this.hand = mainStack.addChild(game.add.image(150,492,'hand'));
        game.time.events.loop(Phaser.Timer.SECOND * 0.4,() => {
            hand.frame = (hand.frame+1)%2;
        });
    }
    /**
     * 生成书堆
     */
    makeStack(count){
        const {game} = this;
        const seatList = [290,445,600,753];
       
        let stack = game.add.group();
        for(let i=0; i<count; i++){
            stack.addChild(game.add.image(seatList[this.stackIndex],(750-140-15*(i+1)),'single_book'));    
        }
        this.stackIndex++;
    }
}

class StateOneGuide extends Guide{
    constructor(vars, data, config, state){
        super(vars, data, config);
        this.state = state;
    }
    onEnd(){
        super.onEnd();
        this.state.init();
    }
}

