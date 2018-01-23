import vars from '../../globalData.js'; 
import stateFourJson from '../../data/stateFour.json';


import Xsj from 'Xsj';
const {Keyboard, Controller} = Xsj;

import t from 'tookit';

let m, n, a, b, 

total = 25,
step = 1,
chances = 3, 

text = '算出正确的答案',
key,
options = [];
/**
 * main class
 */
export default class StateFour{
    constructor(){
        this.init();
    }
    init(){
        this.makeNumbers();

        vars.game.add.image(0,0,'background'); 
        vars.game.add.image(0,0,'bg'); 
        
        let question = new Question(vars, stateFourJson);
        let controller = new Controller(vars, {total, step, text});
        let cache = new Cache(question, controller);
        let keyboard = new Keyboard(vars, cache, {numbers: false});
        question.keyboard = keyboard;
    }
    makeNumbers(){
        n = t.random(3,9); 
        do{
            m = t.random(10,99);
        }while(m%n==0);
        a = Math.floor(m/n);
        b = m%n;

        do{
            key = t.random(0,3) //正确选项index
        }while(key==2&&n!=5&&n!=6);
        //生成选项数字
        for(let i=0; i<4; i++){
            if(i==key){ //正确选项
                options.push(n);
            }else{
                let group;
                do{
                    group = t.random(5,9);
                }while(group==n);
                options.push(group);
            }
        }
    }
};

class Question{
    constructor(vars, jsonData){
        const {game} = vars;
        t.image(game, jsonData.imageJson);
        t.text(game, jsonData.textJson);

        this.game = game;
        this.boxJson = jsonData.boxJson;

        this.boxList = [];
        this.marker = null;
        this._inputIndex = -1; 
        this.append();
    }
    append(){
        const {game, boxJson} = this;

        let book = t.image(game, {x: 50, y:84, name:'book2'});
        t.text(game, {x:56, y:53, content:(m+'÷'+n+'='+a+'......'+b+'解决的是哪个问题？请在下方点击选择。'), size:'30px', color:'#464643'}
            ,book);
        let group = book.addChild(vars.game.make.group());
        boxJson.forEach((item, index) => {
            let box = group.create(item.x, item.y, 0);
            box.inputEnabled = true;
            box.events.onInputDown.add(() => {
                this.inputIndex = index;
            });
            this.boxList.push(box);
            let board = t.image(game, {x:40, y:0, name:'board'}, box);
            let num = options[index];
            let text; //公共变量
            switch(index){ //最多显示10只动物
                case 0:
                    for(let i=0; i<num; i++){ 
                        let index = parseInt(i/2);
                        if(i%2==0){ //左排
                            t.image(game, {
                                x: (88-(88-0)/5*index),
                                y: (39+(66-39)/5*index),
                                name: parseInt(index%2)==0?'male_monkey1':'female_monkey1'
                            },box);
                        }else{
                            t.image(game, {
                                x: (194+(274-194)/5*index),
                                y: (39+(77-39)/5*index),
                                name: parseInt(index%2)==0?'male_monkey2':'female_monkey2'
                            },box);   
                        }
                    }
                    t.text(game, {x:38, y:6, content:'一共有'+m+'个桃子', size:'30px', color:'#464643'}
                        ,board);
                    t.image(game, {x:34, y:82, name:'peaches'}, box);
                    t.evenText(game, {x:0, y:185, width:400, height:40, content:'平均每只猴子能分到几个桃子？还剩下几个？', size:'22px', color:"#464643"}
                        ,box);
                    break;
                case 1:
                    const seatsList = [
                        {x:100, y:40},
                        {x:204, y:40},
                        {x:73, y:44},
                        {x:231, y:44},
                        {x:49, y:52},
                        {x:255, y:52},
                        {x:24, y:62},
                        {x:280, y:62},
                        {x:0, y:77},
                        {x:304, y:77}
                    ]
                    for(let i=0; i<num; i++){
                        let seat = seatsList[i];
                        t.image(game, {x:seat.x, y:seat.y, name:parseInt(i%2)==0?'cat1':'cat2'}
                            ,box);
                    }
                    t.text(game, {x:38, y:6, content:'鱼缸里有'+m+'条鱼', size:'30px', color:'#464643'}
                        ,board);
                    t.image(game, {x:115, y:100, name:'fish_tank'},box);
                    t.evenText(game, {x:0, y:185, width:400, height:40, content:'平均每只肥猫能分到几条鱼？还剩几条？', size:'22px', color:'#464643'}
                        ,box);
                    break;
                case 2:
                    t.text(game, {x:38, y:6, content:'一共有'+m+'个洋娃娃', size:'30px', color:'#464643'}
                        ,board);
                    t.image(game, {x:20, y:40, name:num==6?'pile2':'pile1'},box);
                    t.evenText(game, {x:0, y:220, width:400, height:40, content:'能站几排？还剩几个人？', size:'22px', color:'#464643'}
                        ,box);
                    break;
                case 3:
                    t.text(game,{x:38, y:6, content:'一共有'+m+'个皮球', size:'30px', color:'#464643'}
                        ,board);
                    let balls = t.image(game,{x:37, y:60, name:'balls'}, box);
                    t.text(game, {x:180, y:100, content:num+'个装',size:'30px',color:'#464643'},balls);
                    t.evenText(game, {x:0, y:220, width:400, height:40, content:'能站几排？还剩几个人？', size:'22px', color:'#464643'}
                        ,box);
                    break;
            }
        });
    }
    get inputIndex(){
        return this._inputIndex;
    } 
    set inputIndex(inputIndex){
        const {boxJson, keyboard} = this;

        if(this.inputIndex>=0){ //当前已选中输入框,则清除
            let box = this.boxList[this.inputIndex];
            this.marker.destroy();
            box.scale.setTo(1,1);
        }
        if(inputIndex>=0){ //绘制新输入框
            let box = this.boxList[inputIndex];

            box.scale.setTo(1.1,1.1);
            this.drawRect(inputIndex,2);
        }
        this._inputIndex = inputIndex;
        keyboard.confirmKey.frame = 1;
        keyboard.confirmKey.inputEnabled = true;
    }
    drawRect(index, flag){ //flag: 0为正确,1为错误
        let game = this.game;
        let box = this.boxList[index];
        let boxData = this.boxJson[index];

        if(this.marker){
            this.marker.destroy();
        }
        let marker = this.marker = box.addChild(game.add.graphics(0,0));
        let color;
        switch(flag){
            case 0:
                color = 0x85f04a;
                break;
            case 1:
                color = 0xff6b6b;
                break;
            case 2:
                color = 0x00ffff;
                break;
        }
        marker.lineStyle(3,color, 2);    
        marker.drawRect(0,0,boxData.width,boxData.height);
    }
    empty(){
        const {inputIndex, boxList, keyboard} = this;
        let box = boxList[inputIndex];
        
        keyboard.confirmKey.frame = 2;
        keyboard.confirmKey.inputEnabled = false;
        this.marker.destroy();
        box.scale.setTo(1,1);
    }
}


class Cache{
    constructor(question, controller){
        this.question = question;
        this.controller = controller;
        this.chances = 3;
    }
    submit(){
        const {question, controller} = this;
        const {inputIndex, boxList} = question;

        //正确
        if(inputIndex==key){ 
            question.drawRect(inputIndex,0);
            controller.next(0);
        }else{ //错误
            this.chances --;
            if(this.chances>=1){
                question.drawRect(inputIndex,1);
                setTimeout(() => {
                    question.empty()
                },5000);
            }else{
                controller.next();
            }
        }
    }
}

class StateFourKeyboard extends Keyboard{
    constructor(vars,cache,config,question){
        super(vars,cache,config);
    }
}