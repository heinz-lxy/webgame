/**
 * 游戏结束界面
 */
export default class Over {
  constructor(vars) {
    this.vars = vars;
    vars.game.add.image(0, 0, "background");
    this.overBg = vars.game.add.image(0, 0, 'pauseBg');
  }
  init() {
    let overBg = this.overBg;
    let vars = this.vars;

    let LightEffect = overBg.addChild(vars.game.add.group());
    let starts = overBg.addChild(vars.game.add.group());
    let floatPic = overBg.addChild(vars.game.add.group());

    let answer = overBg.addChild(vars.game.add.image(320, 495, 'answer', 0));
    answer.addChild(vars.game.add.text(70, 10, vars.answer, {font: "30px",fill: '#393939'}));
    let answerTxt = answer.addChild(vars.game.add.text(20, 60, "答对3道题", {font: "20px",fill: "#afafaf"}));
    
    let scor = overBg.addChild(vars.game.add.image(580, 495, 'scoring', 0));
    scor.addChild(vars.game.add.text(50, 10, vars.score, {font: "30px",fill: '#393939'}));
    let scorTxt = scor.addChild(vars.game.add.text(20, 60, "获得90分以上", {font: "20px",fill: "#afafaf"}));
    
    let time = overBg.addChild(vars.game.add.image(840, 495, 'timing', 0));
    time.addChild(vars.game.add.text(60, 10, vars.minite + ":" + vars.seconds, {font: "30px",fill: '#393939'}));
    let timeTxt = time.addChild(vars.game.add.text(20, 60, "5分钟之内通关", {font: "20px",fill: "#afafaf"}));

    let starts1 = starts.create(630, 280, 'starts', 0);
    let starts2 = starts.create(630, 280, 'starts', 0);
    let starts3 = starts.create(630, 280, 'starts', 0);
    let grayStart1 = starts.create(630, 280, 'grayStart');
    let grayStart2 = starts.create(630, 280, 'grayStart');
    let grayStart3 = starts.create(630, 280, 'grayStart');
    let startL = 0;
    if (vars.score >= 90) {
      startL++;
      scor.frame = 1;
      scorTxt.fill = "#f9ff4a"
    }
    
    if (vars.minite < 5) {
      startL++;
      time.frame = 1;
      timeTxt.fill = "#f9ff4a"
    }
    
    if (vars.answer > 3) {
      answer.frame = 1;
      startL++;
      answerTxt.fill = "#f9ff4a"
    }
    
    //判断是成功还是失败
    if (startL > 0) {
      //判断横竖屏位置适配
      vars.game.add.audio('sucess').play();
      let cloth;
      if (vars.game.scale.isLandscape) {
        cloth = floatPic.create(vars.game.width / 2 - 245, vars.game.height / 2 - 90, 'cloth');
      } else {
        cloth = floatPic.create(vars.game.height / 2 - 245, vars.game.width / 2 - 90, 'cloth');
      }
      cloth.scale.setTo(.5, .5);
      let s = vars.game.add.tween(cloth.scale).to({
        x: [1, 1],
        y: [1, 1]
      }, 1000, Phaser.Easing.Linear.None);
      s.start();
      let animal = cloth.addChild(
        floatPic.create(85, -185, "animal1", 0)
      );
      animal.animations.add('scissors1', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 25, true).play();
      cloth.addChild(
        floatPic.create(100, 21, 'overSuccess')
      );
      LightEffect.create(0, -50, 'gradient');
      vars.game.add.tween(LightEffect.children[0]).to({
        alpha: [0.8, 1]
      }, 3000, null, true, 0, Number.MAX_VALUE, true); //对这个组添加一个tween动画，让它不停的上下移动
    } else {
      vars.game.add.audio('failure').play();
      //判断横竖屏位置适配
      if (vars.game.scale.isLandscape) {
        cloth = floatPic.create(vars.game.width / 2 - 245, vars.game.height / 2 - 90, 'cloth2');
      } else {
        cloth = floatPic.create(vars.game.height / 2 - 245, vars.game.width / 2 - 90, 'cloth2');
      }
      cloth.scale.setTo(.5, .5);
      let s = vars.game.add.tween(cloth.scale).to({
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
      vars.game.add.tween(shibai).to({
        angle: [60, 40, 55]
      }, 1000, "Linear", true);
    }

    switch (startL) { 
      case 0:
        var s = vars.game.add.tween(grayStart1).to({x: 400,y: 130}, 500, "Linear", this);
        s.onComplete.add(() => {
          var q = vars.game.add.tween(grayStart2).to({x: 530,y: [20, 50]}, 500, "Linear", this);
          q.onComplete.add(() => {
            vars.game.add.tween(grayStart3).to({x: 700,y: [30, 280]}, 3000, "Linear", this);
          })
        }, this);
        break;
      case 1:
        var s = vars.game.add.tween(starts1).to({x: 400,y: 130
        }, 500, "Linear", this);
        s.onComplete.add(() => {
          var q = vars.game.add.tween(grayStart2).to({x: 530,y: 20}, 500, "Linear", this);
          q.onComplete.add(() => {
            vars.game.add.tween(grayStart3).to({x: 700,y: 30}, 500, "Linear", this);
          })
        }, this);
        starts1.animations.add('scissors1', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true).play();
        break;
      case 2:
        var s = vars.game.add.tween(starts1).to({x: 400,y: 130
        }, 500, "Linear", this);
        s.onComplete.add(() => {
          var q = vars.game.add.tween(starts2).to({x: 530,y: 20}, 500, "Linear", this);
          q.onComplete.add(() => {
            vars.game.add.tween(grayStart3).to({x: 700,y: 30}, 500, "Linear", this);
          })
        }, this);
        starts1.animations.add('scissors1', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true).play();
        starts2.animations.add('scissors1', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true).play();
        break;
      case 3:
        var s = vars.game.add.tween(starts1).to({x: 400,y: 130
        }, 500, "Linear", this);
        s.onComplete.add(() => {
          var q = vars.game.add.tween(starts2).to({x: 530,y: 20}, 500, "Linear", this);
          q.onComplete.add(() => {
            vars.game.add.tween(starts3).to({x: 700,y: 30}, 500, "Linear", this);
          })
        }, this);
        starts1.animations.add('scissors1', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true).play();
        starts2.animations.add('scissors1', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true).play();
        starts3.animations.add('scissors1', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true).play();
        break;
    }
    vars.game.add.tween(floatPic).to({y: 20}, 1000, null, true, 0, Number.MAX_VALUE, true); //对这个组添加一个tween动画，让它不停的上下移动

    //重新挑战
    overBg.addChild(
      vars.game.make.button(
        400, 590, "overBtn",
        () => {
          vars.game.add.audio('click').play();
          vars.key = 1;
          vars.minite = 0;
          vars.seconds = 0;
          vars.dialogueL = 0;
          vars.score = 0;
          vars.answer = 0;
          vars.scale_y = 1;
          vars.beginTime = false;
          vars.game.state.start("Game");
        },
        vars, 1, 0, 1, 0
      )
    );
    var gameData = {
      "second": 0, //时间 单位秒
      "stars": 0, //星数
      "id": "4.3.2.2", //游戏编号
      "GameTotalscore": 100, //游戏总分
      "groud": 0, //游戏得分
      "quId": { //题壳
        "1": { //题壳1
          "Totalscore": 0, //题壳1的总分
          "groud": 0, //题壳1得分
          "xt": { //题壳1中每一个小题
            "1": {
              "Totalscore": 0, //题壳1中第一个小题的总分
              "groud": 0 //题壳1中第一个小题的得分
            },
            "2": {
              "Totalscore": 0,
              "groud": 0
            }
          }
        }
      }
    };
    var gameData = {
      "second": 0, //时间 单位秒
      "stars": 0, //星数
      "id": "4.3.2.2", //游戏编号
      "GameTotalscore": 100, //游戏总分
      "groud": 0, //游戏得分
      "quId": { //题壳
        "1": { //题壳1
          "Totalscore": 0, //题壳1的总分
          "groud": 0, //题壳1得分
          "xt": { //题壳1中每一个小题
            "1": {
              "Totalscore": 0, //题壳1中第一个小题的总分
              "groud": 0 //题壳1中第一个小题的得分
            },
            "2": {
              "Totalscore": 0,
              "groud": 0
            }
          }
        }
      }
    };
  
    function llMap(vars){
      let data = {
        second: vars.minite * 60 + vars.seconds,
        stars: startL,
        id: vars.id,
        GameTotalscore: 100,
        groud: vars.score,
      };
      console.log('test1')
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
    }

    let rawData = JSON.stringify(llMap(vars));
    //不玩了
    overBg.addChild(
      vars.game.make.button(
        750, 590, "notBtn",
        () => {
          vars.game.add.audio('click').play();
          let t;
          if (startL !== 0) {
            t = true;
          } else {
            t = false;
          }
          window.location.href = "../../common/gameOver.html?completed=" + rawData;
          vars.key = 1;
          vars.minite = 0;
          vars.seconds = 0;
          vars.answer = 0;
          vars.score = 0;
          vars.beginTime = false;
        },
        vars, 1, 0, 1, 0
      )
    );
  }
  //失败的粒子效果
  failure() {
    let xue = this.xue = vars.game.add.emitter(vars.game.world.centerX, -32, 600);
    xue.scale.setTo(2);
    xue.makeParticles('xue', [0, 1, 2, 3, 4, 5]);
    xue.maxParticleScale = 0.6;
    xue.minParticleScale = 0.2;
    xue.setYSpeed(20, 100);
    xue.gravity = 0;
    xue.width = vars.game.world.width * 1.5;
    xue.minRotation = 0;
    xue.maxRotation = 40;

    let xue2 = this.xue2 = vars.game.add.emitter(vars.game.world.centerX, -32, 600);
    xue2.scale.setTo(3);
    xue2.makeParticles('xue', [0, 1, 2, 3, 4, 5]);
    xue2.maxParticleScale = 0.6;
    xue2.minParticleScale = 0.2;
    xue2.setYSpeed(20, 100);
    xue2.gravity = 0;
    xue2.width = vars.game.world.width * 1.5;
    xue2.minRotation = 0;
    xue2.maxRotation = 40;

    xue.start(false, 14000, 50);
    xue2.start(false, 14000, 50);
  }
  ;
}
