/**
 * 游戏公用的parts
 */
export default class gameManager {
  constructor(vars, s, m) {
    this.vars = vars;
    this.state = {
      isDownPer: false,
      score: 1000,
      timeSeconds: vars.seconds,
      timeMinutes: vars.minite
    }
    this.clickNum = 1;  //?
  }
  init() {
    this.dynamicElements();
  }
  dynamicElements(){
    let vars = this.vars;
    let bg = this.bg = vars.game.add.image(0, 0, "managerBg");;

    //暂停
    bg.addChild(
      vars.game.make.button(1208,0,"pause",() => {
          vars.game.add.audio('click').play();
          this.pause();
        },vars,1,0,1,0)
    );
    //退出
    bg.addChild(
      vars.game.make.button(20,0,"exit",() => {
          vars.game.add.audio('click').play();
          this.exit();
        },vars,1,0,1,0) 
    );
    // 计时器
    let timeBox = bg.addChild(vars.game.make.image(370, 10, "timeBox"));
    this.progressTextTime = timeBox.addChild(vars.game.make.text(30, 0, this.state.timeMinutes + ":" + "00", {fill: "#bbfdff",font: "38px"}));
    vars.game.time.events.loop(
      Phaser.Timer.SECOND, () => {
        if (vars.beginTime === true) {
          this.countTime();
        }
      },this);
    //分数
    bg.addChild(vars.game.make.sprite(530, 0, "gradeBox"));
    let gradeBox1 = this.gradeBox1 = bg.addChild(vars.game.make.sprite(530, 0, "gradeBox1"));
    this.countGrade(bg);
    //提示
    bg.addChild(
      this.oldMan = vars.game.make.button(1070,0,"tips",() => {
          vars.game.add.audio('click').play();
          this.hint()
        },this,0, 1, 0, 1)
    );
    this.oldMan.scale.setTo(1, 1);
  }
  exit() {
    let vars = this.vars;

    if(this.clickNum!=1){ //?
      return;
    }
    let pauseBg = vars.game.add.image(0, 0, "pauseBg");
    let bounce = pauseBg.addChild(vars.game.make.image(340, -616, "arc"));
    bounce.addChild(vars.game.make.text(270, 110, "退出", {fill: "#965427",font: "50px"}));
    bounce.addChild(vars.game.make.text(230, 300, "确认退出", {fill: "#9c6a23",font: "40px"}));
    
    bounce.addChild(
      vars.game.make.button(200,400,"noBack",() => {
          vars.game.add.audio('click').play();
          pauseBg.destroy();
          vars.game.paused = false;
          this.clickNum = 1; //?
        },vars,1,0,1,0));
    
    bounce.addChild(
      vars.game.make.button(400,400,"pauseack",() => {
          vars.game.add.audio('click').play();
          vars.key = 1;
          vars.minite = 0;
          vars.seconds = 0;
          vars.answer = 0;
          vars.dialogueL = 0;
          vars.score = 0;
          vars.beginTime = false;
          vars.scale_y = 1;
          window.location.href = "../../common/gameOver.html";
        },vars,1,0,1,0));

    let pauseStart = vars.game.add.tween(bounce).to({y: 0}, 1000, "Linear", true);
    pauseStart.onComplete.addOnce(() => {
      vars.game.add.audio('click').play();
      vars.game.paused = true;
    });

    this.clickNum = 2; //?
  }
  pause() {
    let vars = this.vars;

    if (this.clickNum == 1) {
      let pauseBg = vars.game.add.image(0, 0, "pauseBg");

      let bounce = pauseBg.addChild(vars.game.make.image(340, -616, "arc"));
      bounce.addChild(vars.game.make.text(270, 110, "暂停", {fill: "#965427",font: "50px"}));
      bounce.addChild(vars.game.make.text(200, 300, "休息一会儿啦", {fill: "#9c6a23",font: "40px"}));
      let pauseStart = vars.game.add
        .tween(bounce)
        .to({
          y: 0
        }, 1000, "Linear", true);
      pauseStart.onComplete.addOnce(() => {
        vars.game.add.audio('click').play();
        vars.game.paused = true;

      });
      let reBack = bounce.addChild(
        vars.game.make.button(200,400,"return",() => {
            vars.game.add.audio('click').play();
            pauseBg.destroy();
            vars.game.paused = false;
            this.clickNum = 1;
          },vars,1,0,1,0));
      reBack.addChild(
        vars.game.make.text(80, 20, "继续", {fill: "#9c6a23",font: "40px"}));
      this.clickNum = 2;
    }
  }
  //计时
  countTime() {
    let vars = this.vars;

    vars.seconds = vars.seconds + 1;
    if (vars.seconds > 59) {
      vars.minite++;
      vars.seconds = 0;
    }
    if (vars.seconds >= 10) {
      this.progressTextTime.text = vars.minite + ":" + vars.seconds;
    } else {
      this.progressTextTime.text = vars.minite + ":" + "0" + vars.seconds;
    }
  }
  //分数动画
  countGrade(bg) {
    let vars = this.vars;

    let angles_y = 1 - (vars.score / 100);
    vars.game.add.tween(this.gradeBox1.scale).to({
      x: 1,
      y: angles_y
    }, 1000, "Linear", true);
    bg.addChild(vars.game.make.sprite(530, 0, "gradeBox2"));
    vars.scale_y = angles_y;
  }
  hint() { 
    let vars = this.vars;
    const hintList = [
      '你是怎么数的？一边数一边拨一拨。',
      '请你认真观察，一个（100格）有几个（10格）有几个（1格）？一个（100格）有几个（1格）？',
      '请你认真观察，一个（100格）有几个（10格）有几个（1格）？一个（100格）有几个（1格）？',
      '每一站数是如何变化的？每次变化了多少？'
    ]

    let mask = this.mask = vars.game.add.image(0, 0, "pauseBg");
    mask.inputEnabled = true;
    mask.events.onInputDown.add(() => {
      mask.destroy();
      staPreBox.destroy();
      vars.game.add.audio('click').play();
    })

    let staPreBox = this.staPreBox = vars.game.add.image(70, 500, "backbox");
    staPreBox.addChild(vars.game.add.text(100, 50, hintList[vars.key-1], {font: "30px",fill: "#000000"}));
    staPreBox.addChild(vars.game.add.text(450, 150, "点任意处继续", {font: "25px",fill: "#9d9876"}));
    staPreBox.addChild(vars.game.add.image(1000, -200, "older"));
  }
}
