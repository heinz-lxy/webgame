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

        this._answers = new Array(keys.length).fill('');
        this._current = '';
        this.chances = config.chances; 
        this.err = 0; //错误个数
        this.totalErr = 0; //错误个数(全局模式)
    }
    get current(){
        return this._current;
    }
    set current(value){ 
        const {question, keys, config} = this;
        const {inputIndex} = question;  

        if(!this.isAvailable()){ return; }
        
        let answer = this.answers[inputIndex];
        let keyLength = keys[inputIndex].toString().length;
        answer = answer.length>=keyLength?value:('' + answer + value);

        if(answer.length>=keyLength){ 
            if(config.realtime===true){
                this.check(answer, inputIndex);
            }else{
                question.inputIndex++;
            }
        }

        let temp = this.answers;
        temp[inputIndex] = answer;
        this.answers = temp;

        this._current = value;
    }
    get answers(){
        return this._answers;
    }
    set answers(arr){
        console.log(arr)
        const {question, keys} = this;
        const {inputIndex} = question;

        if(arr[0]===undefined){
            arr = new Array(keys.length).fill('');
            question.empty();
            this.err = 0;
        }
        if(this.isCompleted()){ 
            this.enableConfirm();
        }else{
            this.disableConfirm();
        }
        question.updateInput(arr);
        this._answers = arr;
    }
    enableConfirm(){
        this.confirmKey.inputEnabled = true;
        this.confirmKey.frame = 1;
    }
    disableConfirm(){
        this.confirmKey.inputEnabled = false;
        this.confirmKey.frame = 2;
    }
    /**
     * 判断当前是否可以输入
     */
    isAvailable(){ 
        return !(this.isFailed() || this.isCompleted());
    }
    isCompleted(){
        const {question, keys} = this;
        const {inputIndex} = question;
        return inputIndex>=keys.length;
    }
    isFailed(){
        const inputIndex = this.question.inputIndex;
        return inputIndex<0;
    }
    /**
     * 清除当前输入
     */
    backspace(){
        const {question} = this;
        const {inputIndex} = question;
       
        if(this.isAvailable()){
            let temp = this.answers;
            temp[inputIndex] = '';
            this.answers = temp;
        }
    }
    /**
     * 错误判断统计
     */
    judge(){
        const {game, keys, question, controller, config, answers} = this;
        const {inputIndex} = question;
        //实时模式
        if(config.realtime===true){
            if(this.isCompleted()){
                controller.next(this.err);
            }else if(this.isFailed()){
                controller.next();
            }
            return;
        }
        //全局模式-答案比对
        answers.forEach((answer, index) => { 
            let isWrong = answer!=keys[index];
            isWrong && this.err++;
            question.drawRect(index,isWrong);
        });
        this.totalErr += this.err;

        //判断结果初步处理
        const isAllRight = this.err==0;
        game.add.audio(isAllRight?'true':'false').play();
        if(isAllRight){
            controller.next(this.totalErr);
        }else{
            if(this.chances>1){ //重玩
                this.chances--;
                setTimeout(() => {
                    this.answers = [];
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
        const key = keys[inputIndex];

        const isWrong = answer!=key;
        game.add.audio(isWrong?'false':'true').play();
        question.drawRect(inputIndex,isWrong);
        if(isRight){ 
            question.inputIndex++;
        }else{  //错误
            this.err++;
            if(this.chances <= 1){ 
                question.inputIndex = -1;
            }else{ //继续
                this.chances--;
                setTimeout(() => {  //清除当前空格
                    let temp = this.answers;
                    temp[inputIndex] = '';
                    this.answers = temp;
                    question.clear(inputIndex);
                },2000);
            }
        }
    }
}
