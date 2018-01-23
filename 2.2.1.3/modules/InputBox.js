/**
 * 创建问题界面
 */
import Cursor from './Cursor.js';
export default class InputBox{
    constructor(game, jsonData, config){
        this.game = game;
        this.boxJson = jsonData.boxJson;
        if(!config){
            config = {};
        }
        this.config = config;

        this.boxList = [];
        this.boxTextList = [];
        this.marker = null;
        
        this._inputIndex = 0; //inputIndex

        this.init();
    }
    init(){ 
        const {game, config, boxJson, boxList, boxTextList} = this;
      
        let group = game.add.group();
        boxJson.forEach((boxData, index) => {
            let wrapper = group.create(boxData.x, boxData.y, 0);

            let box = wrapper.addChild(game.add.image(0,0,'box'))
            if(index==0){ //初始默认输入框
                box.frame = 1;
            }else{
                box.frame = 0;
                if(config.hide === true){
                    wrapper.visible = false;
                }
            }
            box.width = boxData.width;
            box.height = boxData.height;
            box.inputEnabled = true;
            box.events.onInputDown.add(() => {
                if(index<=this.inputIndex){ //未启用不可点击
                    this.inputIndex = index;
                }
            });
            boxList.push(wrapper);

            let boxText = wrapper.addChild(game.add.text(0, 0, "", { fill: "#464643",font: "30px",boundsAlignH: "center", boundsAlignV: "middle"}));
            boxText.setTextBounds(0, 0, boxData.width, boxData.height); //文本居中
            boxTextList.push(boxText);
        })    
    }
    get inputIndex(){
        return this._inputIndex;
    }
    /**
     * 通过改变选中输入框的index来自动触发背景切换
     */
    set inputIndex(inputIndex){
        const {config, boxList} = this;

        boxList.forEach((wrapper, index) => {
            let box = wrapper.children[0]; //image
            if(index == inputIndex){ //active状态
                console.log(wrapper.children[0]);
                Cursor.change(wrapper.children[0],wrapper, wrapper.children[1]);
                box.frame = 1;
            }else{
                box.frame = 0;
            }
        })
        if(config.hide === true){
            try{
                this.boxList[inputIndex].visible = true;
            }catch(err){}
        }
        this._inputIndex = inputIndex;
    }
    /**
     * 更新输入框显示
     */
    updateInput(answers){
        const {boxTextList} = this;

        boxTextList.forEach((boxText, index) => {
            boxText.text = answers[index];
        })
    }
    /**
     * 绘制输入边框
     */
    drawRect(index, flag){ //flag: 0为正确,1为错误
        const {game, boxList, boxJson} = this;
        let box = boxList[index];
        let boxData = boxJson[index];

        let marker = this.marker = box.addChild(game.add.graphics(0,0));
        marker.lineStyle(7,flag?0xff6b6b:0x85f04a, 2); 
        marker.drawRoundedRect(0,0,boxData.width,boxData.height,5);
    }
    /**
     * 清除输入内容
     */
    empty(){
        this.boxList.forEach(wrapper => {  
            try{
                wrapper.children[1].text = ''; 
                wrapper.children[2].destroy(); 
            }catch(err){}
        });
        if(this.marker){ //hack
            this.marker.destroy();
        }
        this.inputIndex = 0;
    }
    /**
     * 清除单个输入框
     */
    clear(inputIndex){
        if(this.marker){
            this.marker.destroy();
        }
        this.boxTextList[inputIndex].text = '';
    }
    /**
     * 显示正确答案
     */
    reveal(keys){
        const {game, boxList, boxJson} = this;

        boxList.forEach((wrapper, index) => { //显示正确答案
           let boxData = boxJson[index];
           wrapper.addChild(game.add.text(boxData.width,boxData.height,keys[index],{fill:'#393939',font:'22px'}));  //显示正确答案
        });
    }
}
