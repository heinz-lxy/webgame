/**
 * 创建键盘界面
 */
export default class Keyboard{
    constructor(game, cache, config){
        this.game = game;
        this.cache = cache;
        if(!config){
            config = {};
        }
        this.config = config;
        if(typeof cache == 'object'){
          cache.keyboard = this; //cache调用keyboard
        }
        this.init();
    }
    init(){
      this.keys();
    }
    execute(order){
      switch(order){
        case 0:
          this.enableConfirm();
          break;
        case 1:
          this.disableConfirm();
          break;
      }
    }
    command(order){
      const {cache} = this;
      if(typeof cache != 'object'){
        console.log(order);
        return;
      }
      cache.current = order;
    }
    /**
     *  生成按键
     */
    keys(){
      const {game, cache, config} = this;
      const keyMap = [
        {value: '1',name: 1,},
        {value: '2',name: 2,},
        {value: '3',name: 3,},
        {value: '4',name: 4,},
        {value: '5',name: 5,},
        {value: '6',name: 6,},
        {value: '7',name: 7,},
        {value: '8',name: 8,},
        {value: '9',name: 9,},
        {value: '0',name: "zero",},
        {value: "-",name: "sub",},
        {value: "+",name: "add",},
        {value: "=",name: "sign",},
        {value: "×",name: "ride",},
        {value: "÷",name: "except",} 
      ];

      let keybg = game.add.image(982, 130, "keyBg"); //键盘区背景
      
      //确定键
      let confirmKey = this.confirmKey = game.add.image(1002, 640, "confirm", 2);
      confirmKey.inputEnabled = true;
      confirmKey.events.onInputDown.add(target => { 
          target.animations.add("clickAn", [0,1], 10, false).play();
          // game.add.audio('click').play();
          this.command('enter');
      });
      if(config.numbers===false){  //只生成确定键
        keybg.visible = false;
        return;
      }

      //数字按键
      let group = keybg.addChild(game.make.group()); 
      let keyList = [];
      let height = -70;
      for (let i = 0; i < 15; i++) {
        if (i % 3 == 0) { 
          height += 100; 
        }
        let key = group.create((20+110*(i%3)), height, keyMap[i].name);
        keyList.push(key);
      }
      keyList.forEach((key, index) => { 
          key.inputEnabled = true;
          key.events.onInputDown.add(() => {
              key.animations.add("clickAn", [1, 0], 10, false).play(); 
              // game.add.audio('click').play();
              this.command(keyMap[index].value);
          });
      });
      
      //清除键
      let backKey = keybg.addChild(game.add.image(220, 510, "onMiss", 2)); 
      backKey.inputEnabled = true;
      backKey.events.onInputDown.add(target => {
          // game.add.audio('click').play();
          target.animations.add("clickAn", [1, 0,1], 10, false).play();
          this.command('backspace');
      });
    }
    enableConfirm(){
        this.confirmKey.inputEnabled = true;
        this.confirmKey.frame = 1;
    }
    disableConfirm(){
        this.confirmKey.inputEnabled = false;
        this.confirmKey.frame = 2;
    }
}


