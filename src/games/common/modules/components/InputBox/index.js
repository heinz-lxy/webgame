export default class InputBox{
    constructor(game, boxJson, config){
        this.game = game;
        this.boxJson = boxJson;
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

            let box = wrapper.addChild(game.add.image(0,0,'box'));
            box.frame = 0;
            if(config.hide === true && index>0){
                wrapper.visible = false;
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

        this.inputIndex = 0;
    }
    execute(order){
        const args = Array.from(arguments).slice(1);
        switch(order){
            case 0:
                this.clear.apply(this,args) //清除当前内容
                break;
            case 1:
                this.reveal.apply(this,args); //显示答案
                break;
            case 2:
                this.drawRect.apply(this,args) //绘制外框
                break;
            case 3:
                this.updateInput.apply(this,args); //更新输入框显示
                break;
            case 4:
                this.inputIndex = args[0]; //切换输入框
                break;
        }
    }

    get inputIndex(){
        return this._inputIndex;
    }
    /**
     * 通过改变选中输入框的index来自动触发背景切换
     */
    set inputIndex(inputIndex){
        const {game, config, boxList} = this;

        boxList.forEach((wrapper, index) => {
            let box = wrapper.children[0]; //image
            if(index == inputIndex){ //active状态
                box.frame = 1;
                this.cursor && this.cursor.destroy();
                let cursor = this.cursor = wrapper.addChild(game.add.sprite(0, 0, 'cursor'));
                let text = wrapper.children[1];
                let image = wrapper.children[0];
                if (!text.width) {
                    cursor.x = (image.width - image.width) / 2;
                } else {
                    cursor.x = (image.width - cursor.width) / 2+text.width/2+5;
                }
                cursor.y = (image.height - cursor.height) / 2;

                cursor.animations.add('run');
                cursor.animations.play('run', 2, true);

            }else{
                box.frame = 0;
            }
        })
        if(config.hide === true){
            try{
                boxList[inputIndex].visible = true;
            }catch(err){}
        }
        this._inputIndex = inputIndex;
    }
    /**
     * 更新输入框显示
     */
    updateInput(answers){
        const {boxList} = this;

        boxList.forEach((wrapper, index) => {  
            try{
                wrapper.children[1].text = answers[index];; 
                wrapper.children[2].destroy(); 
            }catch(err){}
        });
        this.inputIndex = this.inputIndex; //刷新光标
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
