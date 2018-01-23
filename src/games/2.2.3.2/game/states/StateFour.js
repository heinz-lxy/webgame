import vars from '../../globalData.js'; 
import stateFourJson from '../../data/stateFour.json';

import Xsj from 'Xsj';
import t from 'tookit';
const {Cache, Controller, components, animations} = Xsj;
const {InputBox, Keyboard} = components; 
const {Guide} = animations;

let numberList = [],

total = 40,
step = 40/3/9,
chances = 3,

keys = [];
/**
 * main class
 */
export default class StateFour{
    constructor(){
        vars.game.add.image(0,0,'bg'); 
        this.map = vars.game.add.image(415,190,'closed_map'); 

        this.init(); 
    }
    pre(){
        new Guide(vars,['等等？看我在积木堆里发现了什么？','藏！宝！图！要叫上洋洋嘛？算了，好像挺近的。'],{
            npc: 'qiqi2'
        },this);
    }
    init(){
        this.makeNumbers();
        this.map.visible = false;

        let question = new Question(vars, stateFourJson);
        let controller = new Controller(vars,{total, step})
        let cache = new StateFourCache(vars,question, keys, controller, {chances,realtime:true});
        new Keyboard(vars, cache);
    }
    makeNumbers(){
        for(let i=0; i<4; i++){
            let base = t.random(400,749); //三位数
            switch(i){
                case 0: //第一站
                    let temp1 = [];
                    for(let i=0; i<5;i++){
                        temp1.push(base-10*i);
                    }
                    numberList.push(temp1);
                    break;
                case 1:
                    let temp2 = [];
                    for(let i=0; i<6;i++){
                        temp2.push(base+10*i);
                    }
                    numberList.push(temp2);
                    break;
                case 2:
                    let temp3 = [];
                    for(let i=0; i<6;i++){
                        temp3.push(base+50*i);
                    }
                    numberList.push(temp3);
                    break;
                case 3:
                    let temp4 = [];
                    for(let i=0; i<6;i++){
                        temp4.push(base+100*i);
                    }
                    numberList.push(temp4);
                    break;
            }
        }

        keys.push(numberList[0][3]);
        keys.push(numberList[0][4]);

        keys.push(numberList[1][3]);
        keys.push(numberList[1][4]);
        keys.push(numberList[1][5]);

        keys.push(numberList[2][4]);
        keys.push(numberList[2][5]);

        keys.push(numberList[3][3]);
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
        const {game} = this;
        let boxJson; //公共变量

        //第一站
        boxJson = [
            {x: 195, y: 645, width:107, height: 38},
            {x: 323, y: 562, width:109, height: 44},
            {x: 173, y: 493, width:109, height: 44}
        ]
        boxJson[0].content = numberList[0][0];
        boxJson[1].content = numberList[0][1];
        boxJson[2].content = numberList[0][2];
        this.makeBoxes(boxJson);

        //第二站
        boxJson = [
            {x: 169, y: 219, width:109, height: 44},
            {x: 344, y: 176, width:109, height: 44},
            {x: 314, y: 383, width:109, height: 44}
        ]
        boxJson[0].content = numberList[1][0];
        boxJson[1].content = numberList[1][1];
        boxJson[2].content = numberList[1][2];
        this.makeBoxes(boxJson);

        //第三站
        boxJson = [
            {x: 444, y: 333, width:109, height: 44},
            {x: 496, y: 208, width:109, height: 44},
            {x: 646, y: 167, width:109, height: 44},
            {x: 674, y: 290, width:109, height: 44}
        ]
        boxJson[0].content = numberList[2][0];
        boxJson[1].content = numberList[2][1];
        boxJson[2].content = numberList[2][2];
        boxJson[3].content = numberList[2][3];
        this.makeBoxes(boxJson);

        //第四站
        boxJson = [
            {x: 570, y: 567, width:109, height: 44},
            {x: 710, y: 637, width:109, height: 44},
            {x: 800, y: 547, width:109, height: 44}
        ]
        boxJson[0].content = numberList[3][0];
        boxJson[1].content = numberList[3][1];
        boxJson[2].content = numberList[3][2];
        this.makeBoxes(boxJson);

        this.avatar = game.add.sprite((195-85),(645-89),'avatar');
    }
    makeBoxes(jsonData){
        const {game} = this;

        let group = game.add.group();
        jsonData.forEach((boxData, index) => {
            let wrapper = group.create(boxData.x, boxData.y, 0);

            let box = wrapper.addChild(game.add.image(0,0,'box'))
            box.frame = 0;
            box.width = boxData.width;
            box.height = boxData.height;

            let boxText = wrapper.addChild(game.add.text(0, 0, boxData.content, { fill: "#464643",font: "30px",boundsAlignH: "center", boundsAlignV: "middle"}));
            boxText.setTextBounds(0, 0, boxData.width, boxData.height); //文本居中
        })
    }
}
class StateFourCache extends Cache{
    constructor(vars,question, keys, controller, config){
        super(vars,question, keys, controller, config);
    }
    check(answer, inputIndex){ 
        const {game, question, keys} = this;
        const {boxJson} = question;
        let boxData = boxJson[inputIndex];
        let key = keys[inputIndex];

        if(answer==key){ //正确
            game.add.audio('true').play();
            question.drawRect(inputIndex,0);
            
            //移动人像到当前位置
            t.moveTo(game,question.avatar,{
                x:(boxData.x-85),
                y:(boxData.y-89)
            },3000);
            
            question.inputIndex++;

            //到达终点 打开宝箱
            if(question.inputIndex >= question.boxJson.length){
                let boxOpen = vars.game.add.sprite(0,0,'treasure2');
                boxOpen.scale.setTo(0,0);
                let i = 0;
                vars.game.time.events.repeat(Phaser.Timer.SECOND * 0.03, 24, () => {
                    i++;
                    boxOpen.scale.setTo(i/24,i/24);
                    boxOpen.x = 498-309*i/24/2;
                    boxOpen.y = 423-255*i/24/2;
                });
            }
        }else{  //错误
            this.err++;
            game.add.audio('false').play();
            question.drawRect(inputIndex,1);
            if(this.chances <= 1){ 
                question.inputIndex = -1;
            }else{ //继续
                this.chances--;
                setTimeout(() => {  //清除当前空格
                    this.answers[inputIndex] = '';
                    question.clear(inputIndex);
                },2000);
            }
        }
    }
}
