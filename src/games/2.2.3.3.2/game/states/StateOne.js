import vars from '../../globalData.js'; 
import stateOneJson from '../../data/stateOne.json';

// import Xsj from 'Xsj'; 
// import t from 'tookit';
// const {Cache, Controller, components, animations} = Xsj;
// const {Heart, Success} = animations;
// const {InputBox, Keyboard, Guide} = components;

let 
total = 60,
step = 10,
chances = 3,
 
keys = [];
/**
 * main class
 */
export default class StateOne{
    constructor(){
        t.perf()
        this.background = vars.game.add.image(0,0,'background'); 
        let questionBg = this.questionBg = vars.game.add.image(0,0,'bg');  
  
        // this.init();
    }
    pre(){
        new Guide(vars,[
            '喂，爸爸？',
            '儿子啊，爸爸今天要晚点回来，你帮我记一下电话旁边报\n纸上写着的这两期竞猜的号码。',
            '报纸？哦，看到了，好的。'
            ],{
            npc: ['yangyang', 'yangyangFather', 'yangyang']
        },this);
    }
    init(){
        this.makeNumbers(); 

        // let question = new Question(vars, stateOneJson);
        // let controller = new Controller(vars, {total, step});
        // let cache = new StateOneCache(vars, question, keys, controller, {realtime:true, chances});
        // new Keyboard(vars, cache);

        this.heart = new Heart(vars,this.questionBg, () => {  
            // new Success(vars,'hehe').init();
        });
        setTimeout(()=>{
            this.heart.play()
            t.perf()
        },5000)
        
    }
    makeNumbers(){
        keys.push(125);
        keys.push(t.random(100,9999));
    }
};

class Question extends InputBox{
    constructor(vars, jsonData, config){
        const {game} = vars;
        const {imageJson, textJson, boxJson} = jsonData;
        t.image(game, jsonData.imageJson);
        t.text(game, jsonData.textJson);
     
        super(game, boxJson, config);
        
        this.append();
    }
    append(){
        this.paper('235',keys[0]);
    }
    paper(issue, value){ //issue期数
        const {game} = this;

        if(this.wrapper){
            this.wrapper.destroy();
        }
        let group = game.make.group();
        let wrapper = this.wrapper = group.create(0,0,0);
        //文字
        t.text(game, {
            x:562, y:392, content:issue, size:'30px',color:'#7a7673'
        }, wrapper);
        //圆点
        this.makeDots(0,t.thousand(value));
        this.makeDots(1,t.hundred(value));
        this.makeDots(2,t.ten(value));
        this.makeDots(3,t.one(value));
    }
    makeDots(digit, value){ //0,1,2,3代表 千，百,十,个位
        const {game, wrapper} = this;

        for(let i=0; i<value; i++){
            t.image(game, {
                x:543+digit*84+(i%3)*26,
                y:491+Math.floor(i/3)*32,
                name:'dot'
            }, wrapper);
        }
    }
}
/**
 * 重写check方法
 */
class StateOneCache extends Cache{
    constructor(vars, question, keys, controller, config){
        super(vars, question, keys, controller, config);
    }
    check(answer, inputIndex){ 
        const {game, question, keys} = this;
        const key = keys[inputIndex];

        const isWrong = answer!=key;
        game.add.audio(isWrong?'false':'true').play();
        question.drawRect(inputIndex,isWrong);
        if(!isWrong){ 
            //如果第一题正确显示下一题
            if(question.inputIndex==0){
                question.paper('236',keys[1]);
            }
            question.inputIndex++;
        }else{  
            this.err++;
            if(this.chances <= 1){ 
                question.inputIndex = -1;
            }else{ 
                this.chances--;
                setTimeout(() => {  
                    let temp = this.answers;
                    temp[inputIndex] = '';
                    this.answers = temp;
                    question.clear(inputIndex);
                },2000);
            }
        }
    }
}
