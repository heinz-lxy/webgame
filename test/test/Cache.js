/**
 * 处理键盘传值
 * config{realtime:是否开启实时模式 chances:重试机会}
 */
class Cache{
    constructor(vars, question, keys, controller, config){ //连接键盘和答题区
        this.game = vars.game;
        this.question = question;
        this.keys = keys;
        this.controller = controller;
        if(!config){
            config = {};
        }
        this.config = config;

        this._index = 0; //输入索引
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
        const {index, keys, config} = this;

        if(value=='enter'){
            this.judge();
            return;
        }
        if(value=='backspace'){
            this.clear();
            return;
        }

        if(!this.isAvailable()){ return; }
        let answer = this.answers[index];
        let keyLength = keys[index].toString().length;
        answer = answer.length>=keyLength?value:(answer + value);
        
        if(answer.length>=keyLength){ //输入完成
            if(config.realtime===true){
                this.check(answer, index);
            }else{
                this.index++;
            }
        }

        let temp = this.answers;
        temp[index] = answer;
        this.answers = temp;

        this._current = value;
    }
    keyboardCommand(order){
        const {keyboard} = this;
        if(typeof keyboard != 'object'){
            console.log('keyboard:'+order)
            return;
        }
        switch(order){
            case 0:
                keyboard.execute(1); //禁用确定
                break;
            case 1:
                keyboard.execute(0); //开启确定
                break;
        }
    }
    questionCommand(){
        const args = Array.from(arguments);
        const {question} = this;
        if(typeof question != 'object'){
            console.log('question:'+order)
            return;
        }
        question.execute.apply(question,args);
    }
    controllerCommand(order){
        const {controller} = this;
        if(typeof controller != 'object'){
            console.log('controller:'+order)
            return;
        }
        switch(order){
            case 0:
                controller.next();
                break;
            case 1:
                controller.next(this.err);
                break;
            case 2:
                controller.next(this.totalErr);
                break;
        }
    }
    gameCommand(order){
        const {game} = this;
        if(typeof game != 'game'){
            console.log('game:'+order)
            return;
        }
        switch(order){
            case 0:
                game.add.audio('false').play();
                break;
            case 1:
                game.add.audio('true').play();
                break;
        }
    }
    get index(){
        return this._index;
    }
    set index(idx){
        this.questionCommand(4, idx);
        this._index = idx;
    }
    get answers(){
        return this._answers;
    }
    set answers(arr){
        const {index, keys} = this;

        if(arr[0] == undefined){
            arr = new Array(keys.length).fill('');
            this.index = 0;
            this.err = 0;
        }
        if(this.isCompleted()){ 
            this.keyboardCommand(1);
        }
        this.questionCommand(3, arr);
        this._answers = arr;
    }
    /**
     * 判断当前是否可以输入
     */
    isAvailable(){ 
        return !(this.isFailed() || this.isCompleted());
    }
    isCompleted(){
        const {index, keys} = this;
        return index>=keys.length;
    }
    isFailed(){
        return this.index<0;
    }
    /**
     * 清除当前输入
     */
    clear(){
        const {index} = this;
       
        if(this.isAvailable()){
            let temp = this.answers;
            temp[index] = '';
            this.answers = temp;
        }
    }
    /**
     * 错误判断统计
     */
    judge(){
        const {index, keys, config, answers} = this;

        if(!this.isCompleted()) {return;}

        //实时模式
        if(config.realtime===true){
            if(this.isFailed()){
                this.controllerCommand(0);
            }else{
                this.controllerCommand(1);
            }
            return;
        }
        //全局模式-答案比对
        answers.forEach((answer, index) => { 
            let isWrong = answer!=keys[index];
            isWrong && this.err++;
            this.questionCommand(2, index, isWrong);
        });
        this.totalErr += this.err;

        //判断结果初步处理
        const isAllRight = this.err==0;
        this.gameCommand(isAllRight?1:0); //true,false
        if(isAllRight){
            this.controllerCommand(2);
        }else{
            if(this.chances>1){ //重玩
                this.chances--;
                setTimeout(() => {
                    this.answers = [];
                    this.keyboardCommand(0);
                },5000);
            }else{ 
                this.questionCommand(1, keys);
                setTimeout(() => {
                    this.controllerCommand(0);
                },5000);
            }
        }
    }
    /**
     * 实时判断
     */
    check(answer, index){ 
        const {game, keys} = this;
        const key = keys[index];

        const isWrong = answer!=key;
        this.gameCommand(isWrong?0:1);
        this.questionCommand(2, index, isWrong);
        if(!isWrong){ 
            this.index++;
        }else{  //错误
            this.err++;
            if(this.chances <= 1){ 
                this.index++;
            }else{ //继续
                this.chances--;
                setTimeout(() => {  //清除当前空格
                    let temp = this.answers;
                    temp[index] = '';
                    this.answers = temp;
                    this.questionCommand(0);
                },2000);
            }
        }
    }
}

module.exports = Cache