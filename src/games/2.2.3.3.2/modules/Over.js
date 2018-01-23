import gm from './gameManager.js';

export default class Over {
  constructor(vars) {
    this.vars = vars;
    this.overBg0 = this.vars.game.add.image(0, 0, 'pauseBg');
    this.overBg0.alpha = 0;
    this.overBg = this.vars.game.add.image(0, 0, 'stateOverBg');
  }
  init() {
    const {vars} = this;
    const {game} = vars;

    let data = this.stat(vars);
    let rawData = JSON.stringify(data);
    console.log(data)
    if(vars.debug){
      return;
    }

    let LightEffect = this.overBg.addChild(game.add.group());
    let starts = this.overBg.addChild(game.add.group());
    let floatPic = this.overBg.addChild(game.add.group());
    
    //答对题数
    let answer = this.overBg.addChild(game.add.image(840, 495, 'answer', 0)
    );
    answer.visible = false;

    let answerTxt = answer.addChild(game.add.text(30, 60, "全部答对", {font: "20px",fill: "#afafaf"}));

    let answerGroup = this.answerGroup = answer.addChild(game.add.group());
    answerGroup.create(80, 10, 'stateOverNo');
    answerGroup.create(60, 10, 'stateOverYes');
    answerGroup.children[0].visible = false;
    answerGroup.children[1].visible = false;
    
    let scor = this.overBg.addChild(game.add.image(580, 495, 'scoring', 0));
    scor.visible = false;

    let scorArr = ["stateOverS", "stateOverA", "stateOverB", "stateOverC", "stateOverD"];
    this.scorGroup = scor.addChild(game.add.group());
    for(let i = 0; i < scorArr.length; i++){
      this.scorGroup.create(30, -60, scorArr[i]);
      this.scorGroup.children[i].visible = false;
    }
    let scorTxt = scor.addChild(game.add.text(0, 60, "获得C级以上评分", {font: "20px",fill: "#afafaf"}));
    
    let time = this.overBg.addChild(game.add.image(320, 495, 'timing', 0));
    time.visible = false;
    let timeTxt = time.addChild(game.add.text(0, 60, "15分钟之内通关", {font: "20px",fill: "#afafaf"}));
    
    let answerTimeOut = setTimeout(()=>{
      answer.visible = true;
      clearTimeout(answerTimeOut);
    }, 1000);
    let scorTimeOut = setTimeout(()=>{
      scor.visible = true;
      clearTimeout(scorTimeOut);
    }, 1000);
    let timeTimeOut = setTimeout(()=>{
      time.visible = true;
      clearTimeout(timeTimeOut);
    }, 1000);

    //创建星星
    let grayStart1 = starts.create(395, 106, 'grayStart');
    let grayStart2 = starts.create(600, 2, 'grayStart');
    let grayStart3 = starts.create(808, 112, 'grayStart');
    let starts1 = starts.create(630, 280, 'starts');
    let starts2 = starts.create(630, 280, 'starts');
    let starts3 = starts.create(630, 280, 'starts');
    for(let i = 0; i < starts.length; i++){
      starts.children[i].visible = false;
    }
    let starsTimeOut = setTimeout(()=>{
      LightEffect.create(0, -100, 'gradient');
      for(let i = 0; i < starts.length; i++){
        starts.children[i].visible = true;
      } 
      clearTimeout(starsTimeOut);
    }, 1000);
    let startL = 0;
    let score = vars.score;
    if (vars.score >= 60) {
      startL++;
      game.time.events.add(Phaser.Timer.SECOND * 1.9, () => {
        scor.frame = 1;
        scorTxt.fill = "#f9ff4a";
        if(score >= 100){
          this.scorGroup.children[0].visible = true;
        }else if(score <= 99 && score >= 86){
          this.scorGroup.children[1].visible = true;
        }else if(score <= 85 && score >= 76){
          this.scorGroup.children[2].visible = true;
        }else if(score <= 75 && score >= 60){
          this.scorGroup.children[3].visible = true;
        }
      }, this);
    }else{
      this.scorGroup.children[4].visible = true;
    };
    
   
    if (vars.minite < 15) {
      startL++;
      game.time.events.add(Phaser.Timer.SECOND * 1.5, ()=>{
        time.frame = 1;
        timeTxt.fill = "#f9ff4a";
        time.addChild(
          game.add.text(60, 10, vars.minite + ":" + vars.seconds, {
            font: "30px",
            fill: '#393939'
          })
        );
      })
    };
    if (vars.score == 100) {
      startL++;
      game.time.events.add(Phaser.Timer.SECOND * 2.2, ()=>{
        answer.frame = 1;
        answerTxt.fill = "#f9ff4a";
        this.answerGroup.children[1].visible = true;
      })
    }else{
      game.time.events.add(Phaser.Timer.SECOND * 2.2, ()=>{
        this.answerGroup.children[0].visible = true;
      });
    }
    //判断是成功还是失败
    if (startL > 0) {
      //判断横竖屏位置适配
      game.add.audio('sucess').play();
      let cloth = floatPic.create(354, 285, 'cloth', 0);
      cloth.animations.add('scissors1', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 25, false).play();
      //成功字体的创建和动效
      let overSuccessText = cloth.addChild(
        floatPic.create(170, 200, 'overSuccess', 0)
      );
      overSuccessText.animations.add('scissors1', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], 25, true).play();
      let overSuccessTextTween = game.add.tween(overSuccessText).to({y: 21}, 500, "Linear", true); 
      game.add.tween(overSuccessText).to({alpha: [0, 1]}, 500, "Linear", true); 
      overSuccessTextTween.onComplete.add(()=>{
        game.add.tween(this.overBg0).to({alpha: 1}, 1000, "Linear", true);
        let animal = cloth.addChild(
          floatPic.create(155, -175, "animal1", 0)
        );

        //动物出现后延迟一秒出现光效
        let gradientTimeOut = setTimeout(()=>{
          let gradient1 = LightEffect.create(667, 334, 'gradient');
          gradient1.alpha = 0.5;
          gradient1.anchor.set(0.5, 1);
          let gradient2 = LightEffect.create(667, 334, 'gradient');
          gradient2.anchor.set(0.5, 1);
          gradient2.alpha = 0.5;
          setInterval(()=>{
            if(gradient1.angle < 10){
              gradient1.angle += 0.005;
            }else{
              gradient1.angle = 350;
              gradient1.angle += 0.005;
            }
          }, 5);
          setInterval(()=>{
            if(gradient2.angle > -10){
              gradient2.angle -= 0.005;
            }else{
              gradient2.angle = -350;
              gradient2.angle -= 0.005;
            }
          }, 5);
          clearTimeout(gradientTimeOut);
        },1000);
        animal.animations.add('scissors1', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 25, true).play();
      });
    } else {
      // 失败动画
      game.add.audio('failure').play();
      //判断横竖屏位置适配
      if (game.scale.isLandscape) {
        let cloth = floatPic.create(game.width / 2 - 245, game.height / 2 - 90, 'cloth2');
      } else {
        let cloth = floatPic.create(game.height / 2 - 245, game.width / 2 - 90, 'cloth2');
      }
      let s = game.add.tween(cloth.scale).to({
        x: [1, 1],
        y: [1, 1]
      }, 1000, Phaser.Easing.Linear.None);
      s.start();
      let animal2 = cloth.addChild(
        floatPic.create(100, -145, 'animal2', 0)
      );
      animal2.animations.add('scissors1', [0, 1, 2, 3, 4, 5, 6, 7, 8], 25, true).play();
      this.failure();
      cloth.addChild(
        floatPic.create(100, 21, 'tiaozhan')
      );
      let shibai = cloth.addChild(
        floatPic.create(225, 10, 'shibai')
      );
      shibai.anchor.setTo(-.7, 0.5);
      game.add.tween(shibai).to({
        angle: [60, 40, 55]
      }, 1000, "Linear", true);
    }
    //亮的星星飘上去
    let starssss = setTimeout(()=>{
      switch (startL) {
        case 1:
          s = game.add.tween(starts1).to({x: 395,y: 106}, 500, "Linear", this);
          break;
        case 2:
          s = game.add.tween(starts1).to({x: 395,y: 106}, 500, "Linear", this);
          s.onComplete.add(() => {
            let q = game.add.tween(starts2).to({x: 600,y: 2}, 500, "Linear", this);
          }, this);
          break;
        case 3:
          s = game.add.tween(starts1).to({x: 395,y: 160}, 500, "Linear", this);
          s.onComplete.add(() => {
            let q = game.add.tween(starts2).to({x: 600,y: 2}, 500, "Linear", this);
            q.onComplete.add(() => {
              game.add.tween(starts3).to({x: 808,y: 112}, 500, "Linear", this);
            })
          }, this);
          break;
      }
      clearTimeout(starssss);
    }, 1000);

    //重新挑战
    let overBtnTimeOut = setTimeout(() => {
      this.overBg.addChild(
        game.make.button(
          400, 590, "overBtn",
          () => {
            game.add.audio('click').play();
            vars.key = 1;
            vars.minite = 0;
            vars.seconds = 0;
            vars.dialogueL = 0;
            vars.score = 0;
            vars.answer = 0;
            vars.scale_y = 1;
            vars.beginTime = false;
            game.state.start("Game");

            vars.stateOneIndex = 0;
            vars.stateTwoIndex = 0;
            vars.stateThreeIndex = 0;
            vars.stateFourIndex = 0;
          },
          vars, 1, 0, 1, 0
        )
      );
      clearTimeout(overBtnTimeOut);
    }, 3000);
    
    //不玩了
    let notTimeOut = setTimeout(() => {
      this.overBg.addChild(
        game.make.button(
          750, 590, "notBtn",
          () => {
            game.add.audio('click').play();
            let t;
            if (startL !== 0) {
              t = true;
            } else {
              t = false;
            }
            let a = JSON.stringify(gameData);
            window.location.href = "../../common/gameOver.html?completed=" + rawData;
            vars.key = 1;
            vars.minite = 0;
            vars.seconds = 0;
            vars.answer = 0;
            vars.dialogueL = 0;
            vars.score = 0;
            vars.scale_y = 1;
            vars.beginTime = false;
          },
          vars, 1, 0, 1, 0
        )
      );
      clearTimeout(notTimeOut);
    },3000);
  };
  stat(vars){
    let data = {
      second: vars.minite * 60 + vars.seconds,
      stars: vars.debug?'':startL,
      id: vars.id,
      GameTotalscore: 100,
      groud: vars.score,
    };
    console.log(vars)
    let stat = vars.stat;
    let quId = {};
    stat.forEach((item, index) => {
      let sub  = item.sub;
      let xt = {};
      if(sub){
        sub.forEach((item, index) => {
          xt[index+1] = {
            Totalscore: item.total,
            groud: item.score
          }
        });
      }
      quId[index+1] = {
        Totalscore: item.total,
        groud: item.score,
        xt
      }
    });
    data.quId = quId;

    return data;

    
    // let gameData = {
    //   "second": 0, 
    //   "stars": 0, 
    //   "id": "4.3.2.2", 
    //   "GameTotalscore": 100, 
    //   "groud": 0, 
    //   "quId": { 
    //     "1": { 
    //       "Totalscore": 0,
    //       "groud": 0, 
    //       "xt": { 
    //         "1": {
    //           "Totalscore": 0, 
    //           "groud": 0 
    //         },
    //         "2": {
    //           "Totalscore": 0,
    //           "groud": 0
    //         }
    //       }
    //     }
    //   }
    // };
  }

  //失败的粒子效果
  failure() {
    let xue = this.vars.game.add.emitter(this.vars.game.world.centerX, -32, 600);
    xue.scale.setTo(2);
    xue.makeParticles('xue', [0, 1, 2, 3, 4, 5]);
    xue.maxParticleScale = 0.6;
    xue.minParticleScale = 0.2;
    xue.setYSpeed(20, 100);
    xue.gravity = 0;
    xue.width = this.vars.game.world.width * 1.5;
    xue.minRotation = 0;
    xue.maxRotation = 40;

    let xue2 = this.vars.game.add.emitter(this.vars.game.world.centerX, -32, 600);
    xue2.scale.setTo(3);
    xue2.makeParticles('xue', [0, 1, 2, 3, 4, 5]);
    xue2.maxParticleScale = 0.6;
    xue2.minParticleScale = 0.2;
    xue2.setYSpeed(20, 100);
    xue2.gravity = 0;
    xue2.width = this.vars.game.world.width * 1.5;
    xue2.minRotation = 0;
    xue2.maxRotation = 40;

    xue.start(false, 14000, 50);
    xue2.start(false, 14000, 50);
  };
};

