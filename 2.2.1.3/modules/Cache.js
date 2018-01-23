/**
 * 处理键盘传值
 * config{realtime:是否开启实时模式 chances:重试机会}
 */
export default class Cache{
    constructor(vars, question, keys, controller, config){ //连接键盘和答题区
        this.game = vars.game;
        this.question = question;
        this.keys = keys;
        this.controller = controller;
        if(!config){
            config = {};
        }
        this.config = config;

        this.answers = new Array(keys.length).fill('');
        this._current = '';
        this.chances = config.chances; 
        this.err = 0; //错误个数
        this.totalErr = 0; //错误个数(全局模式)
    }
    get current(){
        return this._current;
    }
    /**
     * 缓存状态机
     */
    set current(value){ 
        const {question, keys, config} = this;
        let inputIndex = question.inputIndex;  

        if(!this.isAvailable()){
            return;
        }
        
        let answer = this.answers[inputIndex];
        let keyLength = keys[inputIndex].toString().length;
        //点击输入
        if(answer.length>=keyLength){ //重写
            this.answers[inputIndex] = value;
        }else{ 
            this.answers[inputIndex] = '' + answer + value; //增加数位
        }
        question.updateInput(this.answers); //手动更新
        //输入完成
        answer = this.answers[inputIndex];
        if(answer.length>=keyLength){ 
            if(config.realtime===true){
                this.check(answer, inputIndex);
            }else{
                question.inputIndex++;
            }
        }
        if(question.inputIndex>=keys.length){ //输入完成
            this.confirmKey.inputEnabled = true;
            this.confirmKey.frame = 1;
        }
        this._current = value;
    }
    /**
     * 清除当前输入
     */
    backspace(){
        const {question} = this;
        let inputIndex = question.inputIndex;
       
        if(this.isAvailable()){
            this.answers[inputIndex] = '';
            question.clear(inputIndex);
        }
    }
    /**
     * 判断当前是否可以输入
     */
    isAvailable(){
        const {question, keys} = this;
        let inputIndex = question.inputIndex;

        if(inputIndex<0 || inputIndex>=keys.length){ //inputIndex<0:禁用输入
            return false;
        }else{
            return true;
        }
    }
    /**
     * 统计错误个数
     */
    submit(){
        const {game, keys, question, controller, config} = this;
       
        //实时模式
        if(config.realtime===true){
            if(inputIndex>=keys.length){
                controller.next(this.err);
            }else if(inputIndex == -1){
                controller.next();
            }
            return;
        }

        //全局模式-答案比对
        this.answers.forEach((answer, index) => { 
            if(answer!=keys[index]){ //错误
                question.drawRect(index,1);
                this.err++;
            }else{ //正确
                question.drawRect(index,0);
            }
        });
        this.totalErr += this.err;

        //判断结果初步处理
        if(this.err==0){
            game.add.audio('true').play();
            controller.next(this.totalErr);
        }else{
            game.add.audio('false').play();
            if(this.chances>1){ //重玩
                this.chances--;
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
    /**
     * 实时判断
     */
    check(answer, inputIndex){ 
        const {game, question, keys} = this;
        let key = keys[inputIndex];

        if(answer==key){ //正确
            game.add.audio('true').play();
            question.drawRect(inputIndex,0);
            question.inputIndex++;
        }else{  //错误
            this.err++;
            game.add.audio('false').play();
            question.drawRect(inputIndex,1);
            if(this.chances <= 1){ 
                question.inputIndex = -1;
                this.chances = this.config.chances; 
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
