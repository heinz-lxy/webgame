/**
 * 游戏引导
 * 传入文字数组 npc信息
 * 引导结束后 执行onEnd方法
 */
import Cache from './Cache.js';

export default class Guide {
    constructor(vars, data, config, state){
        this.vars = vars;
        this.data = data;
        this.config = config;
        this.state = state;

        this.__guideIndex = -1;

        if(vars.debug){ //调试模式
            this.onEnd();
            return;
        }
        this.init();
    }
    get guideIndex(){
        return this.__guideIndex;
    }
    /**
     * 指引index状态机 更新npc和文字
     */
    set guideIndex(guideIndex){
        const {vars, config, data, tipBox} = this;
        let npc = config.npc;
        const npcData = {
            qiqi: {
                seat: {x: 1334-472, y: 750-496},
                textSeat: {x: 250, y: 50}
            },
            qiqi_yh: {
                seat: {x: 1334-472, y: 750-496},
                textSeat: {x: 250, y: 50}
            },
            yangyang: {
                seat: {x: 15, y: 750-496},
                textSeat: {x: 345, y: 63}

            },
            yangyang_yh: {
                seat: {x: 15, y: 750-496},
                textSeat: {x: 345, y: 63}

            },
            yangyangFather: {
                seat: {x: 1334-260, y: 750-456},
                textSeat: {x: 167, y: 66}
            },
            yangyangMother: {
                seat: {x: 0, y: 750-496},
                textSeat: {x: 345, y: 63}
            }
        }

        if(guideIndex>=data.length){ //指引结束
            this.onEnd();
            return;
        }
        if(typeof npc !='string'){ //传入的是npc数组
            npc = npc[guideIndex];
        }
        let npcSeat = npcData[npc].seat;
        let textSeat = npcData[npc].textSeat;      
        // npc
        if(this.npcImage){
            this.npcImage.destroy();
        }
        this.npcImage = this.mask.addChild(vars.game.add.image(npcSeat.x,npcSeat.y,npc)); 
        // 文字
        if(this.guideText){
            this.guideText.destroy();
        }
        this.guideText = tipBox.addChild(vars.game.add.text(textSeat.x,textSeat.y,data[guideIndex],{font:'30px',file:'#393939'}));

        this.__guideIndex = guideIndex;
    }
    init(){
        const {vars, config} = this;
        let {npc} = config;
       
        if(typeof npc !='string'){ //传入的是npc数组
            npc = npc[0];
        }

        //罩层
        let mask = this.mask = vars.game.add.image(0,0,'pauseBg');
        mask.inputEnabled = true;
        mask.events.onInputDown.add(() => {
            vars.game.add.audio('click').play();
            this.guideIndex++;
        });

        let tipBox = this.tipBox = mask.addChild(vars.game.add.image(92,750-227,'pre_box'));
        tipBox.addChild(vars.game.add.text(500,170,'点击任意处继续',{font:'20px'}));

        //载入引导
        this.guideIndex = 0; 
    }
    onEnd(){
        try{
            this.mask.visible = false;
            this.vars.gameMgr.bg.visible = true;
        }catch(err){}
        this.state.init();
    }
}
