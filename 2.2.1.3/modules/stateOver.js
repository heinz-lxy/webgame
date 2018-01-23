import gm from './gameManager.js';

class stateOver {
  constructor(vars) {
    this.vars = vars;
    this.overBg0 = this.vars.game.add.image(0, 0, 'pauseBg');
    this.overBg0.alpha = 0;
    this.overBg = this.vars.game.add.image(0, 0, 'stateOverBg');
  }
  ;

  gameCreate() {
    var LightEffect = this.overBg.addChild(this.vars.game.add.group());
    // var lights = this.overBg.addChild(this.vars.game.add.group());
    var starts = this.overBg.addChild(this.vars.game.add.group());
    var floatPic = this.overBg.addChild(this.vars.game.add.group());
    //答对几题
    var answer = this.overBg.addChild(
      this.vars.game.add.image(840, 495, 'answer', 0)
    );
    answer.visible = false;
    var answerTxt = answer.addChild(
      this.vars.game.add.text(30, 60, "全部答对", {
        font: "20px",
        fill: "#afafaf"
      })
    );
    this.answerGroup = answer.addChild(
      this.vars.game.add.group()
    );
    this.answerGroup.create(80, 10, 'stateOverNo');
    this.answerGroup.create(60, 10, 'stateOverYes');
    this.answerGroup.children[0].visible = false;
    this.answerGroup.children[1].visible = false;
    
    var scor = this.overBg.addChild(
      this.vars.game.add.image(580, 495, 'scoring', 0)
    );
    scor.visible = false;
    var scorArr = ["stateOverS", "stateOverA", "stateOverB", "stateOverC", "stateOverD"];
    this.scorGroup = scor.addChild(
      this.vars.game.add.group()
    );
    for(var i = 0; i < scorArr.length; i++){
      this.scorGroup.create(30, -60, scorArr[i]);
      this.scorGroup.children[i].visible = false;
    }
    var scorTxt = scor.addChild(
      this.vars.game.add.text(0, 60, "获得C级以上评分", {
        font: "20px",
        fill: "#afafaf"
      })
    );
    
    var time = this.overBg.addChild(
      this.vars.game.add.image(320, 495, 'timing', 0)
    );
    time.visible = false;
    var timeTxt = time.addChild(
      this.vars.game.add.text(0, 60, "15分钟之内通关", {
        font: "20px",
        fill: "#afafaf"
      })
    );
    var answerTimeOut = setTimeout(()=>{
      answer.visible = true;
      clearTimeout(answerTimeOut);
    }, 1000);
    var scorTimeOut = setTimeout(()=>{
      scor.visible = true;
      clearTimeout(scorTimeOut);
    }, 1000);
    var timeTimeOut = setTimeout(()=>{
      time.visible = true;
      clearTimeout(timeTimeOut);
    }, 1000);
    //创建星星
    var grayStart1 = starts.create(395, 106, 'grayStart');
    var grayStart2 = starts.create(600, 2, 'grayStart');
    var grayStart3 = starts.create(808, 112, 'grayStart');
    var starts1 = starts.create(630, 280, 'starts');
    var starts2 = starts.create(630, 280, 'starts');
    var starts3 = starts.create(630, 280, 'starts');
    for(var i = 0; i < starts.length; i++){
      starts.children[i].visible = false;
    }
    var starsTimeOut = setTimeout(()=>{
      LightEffect.create(0, -100, 'gradient');
      for(var i = 0; i < starts.length; i++){
        starts.children[i].visible = true;
      } 
      clearTimeout(starsTimeOut);
    }, 1000);
    var startL = 0;
    var score = this.vars.score;
    if (this.vars.score >= 60) {
      startL++;
      this.vars.game.time.events.add(Phaser.Timer.SECOND * 1.9, () => {
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
    if (this.vars.minite < 15) {
      startL++;
      this.vars.game.time.events.add(Phaser.Timer.SECOND * 1.5, ()=>{
        time.frame = 1;
        timeTxt.fill = "#f9ff4a";
        time.addChild(
          this.vars.game.add.text(60, 10, this.vars.minite + ":" + this.vars.seconds, {
            font: "30px",
            fill: '#393939'
          })
        );
      })
    };
    if (this.vars.score == 100) {
      startL++;
      this.vars.game.time.events.add(Phaser.Timer.SECOND * 2.2, ()=>{
        answer.frame = 1;
        answerTxt.fill = "#f9ff4a";
        this.answerGroup.children[1].visible = true;
      })
    }else{
      this.vars.game.time.events.add(Phaser.Timer.SECOND * 2.2, ()=>{
        this.answerGroup.children[0].visible = true;
      });
    }
    //判断是成功还是失败
    if (startL > 0) {
      //判断横竖屏位置适配
      this.vars.game.add.audio('sucess').play();
      var cloth = floatPic.create(354, 285, 'cloth', 0);
      cloth.animations.add('scissors1', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 25, false).play();
      //成功字体的创建和动效
      var overSuccessText = cloth.addChild(
        floatPic.create(170, 200, 'overSuccess', 0)
      );
      overSuccessText.animations.add('scissors1', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], 25, true).play();
      var overSuccessTextTween = this.vars.game.add.tween(overSuccessText).to({y: 21}, 500, "Linear", true); 
      this.vars.game.add.tween(overSuccessText).to({alpha: [0, 1]}, 500, "Linear", true); 
      overSuccessTextTween.onComplete.add(()=>{
        this.vars.game.add.tween(this.overBg0).to({alpha: 1}, 1000, "Linear", true);
        var animal = cloth.addChild(
          floatPic.create(155, -175, "animal1", 0)
        );

        //动物出现后延迟一秒出现光效
        var gradientTimeOut = setTimeout(()=>{
          var gradient1 = LightEffect.create(667, 334, 'gradient');
          gradient1.alpha = 0.5;
          gradient1.anchor.set(0.5, 1);
          var gradient2 = LightEffect.create(667, 334, 'gradient');
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
      this.vars.game.add.audio('failure').play();
      //判断横竖屏位置适配
      if (this.vars.game.scale.isLandscape) {
        var cloth = floatPic.create(this.vars.game.width / 2 - 245, this.vars.game.height / 2 - 90, 'cloth2');
      } else {
        var cloth = floatPic.create(this.vars.game.height / 2 - 245, this.vars.game.width / 2 - 90, 'cloth2');
      }
      var s = this.vars.game.add.tween(cloth.scale).to({
        x: [1, 1],
        y: [1, 1]
      }, 1000, Phaser.Easing.Linear.None);
      s.start();
      var animal2 = cloth.addChild(
        floatPic.create(100, -145, 'animal2', 0)
      );
      animal2.animations.add('scissors1', [0, 1, 2, 3, 4, 5, 6, 7, 8], 25, true).play();
      this.failure();
      cloth.addChild(
        floatPic.create(100, 21, 'tiaozhan')
      );
      var shibai = cloth.addChild(
        floatPic.create(225, 10, 'shibai')
      );
      shibai.anchor.setTo(-.7, 0.5);
      this.vars.game.add.tween(shibai).to({
        angle: [60, 40, 55]
      }, 1000, "Linear", true);
    }
    //亮的星星飘上去
    var starssss = setTimeout(()=>{
      switch (startL) {
        case 1:
          var s = this.vars.game.add.tween(starts1).to({
            x: 395,
            y: 106
          }, 500, "Linear", this);
          break;
        case 2:
          var s = this.vars.game.add.tween(starts1).to({
            x: 395,
            y: 106
          }, 500, "Linear", this);
          s.onComplete.add(() => {
            var q = this.vars.game.add.tween(starts2).to({
              x: 600,
              y: 2
            }, 500, "Linear", this);
          }, this);
          break;
        case 3:
          var s = this.vars.game.add.tween(starts1).to({
            x: 395,
            y: 160
          }, 500, "Linear", this);
          s.onComplete.add(() => {
            var q = this.vars.game.add.tween(starts2).to({
              x: 600,
              y: 2
            }, 500, "Linear", this);
            q.onComplete.add(() => {
              this.vars.game.add.tween(starts3).to({
                x: 808,
                y: 112
              }, 500, "Linear", this);
            })
          }, this);
          break;
      }
      clearTimeout(starssss);
    }, 1000);

    //重新挑战
    var overBtnTimeOut = setTimeout(() => {
      this.overBg.addChild(
        this.vars.game.make.button(
          400, 590, "overBtn",
          () => {
            this.vars.game.add.audio('click').play();
            this.vars.key = 1;
            this.vars.minite = 0;
            this.vars.seconds = 0;
            this.vars.dialogueL = 0;
            this.vars.score = 0;
            this.vars.answer = 0;
            this.vars.scale_y = 1;
            this.vars.beginTime = false;
            this.vars.game.state.start("Game");

            this.vars.stateOneIndex = 0;
            this.vars.stateTwoIndex = 0;
            this.vars.stateThreeIndex = 0;
            this.vars.stateFourIndex = 0;
          },
          this.vars, 1, 0, 1, 0
        )
      );
      clearTimeout(overBtnTimeOut);
    }, 3000);
    
    // 需要传给App的JSON数据
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

    let rawData = JSON.stringify(llMap(this.vars));
    console.log(rawData)

    //不玩了
    var notTimeOut = setTimeout(() => {
      this.overBg.addChild(
        this.vars.game.make.button(
          750, 590, "notBtn",
          () => {
            this.vars.game.add.audio('click').play();
            var t;
            if (startL !== 0) {
              t = true;
            } else {
              t = false;
            }
            var a = JSON.stringify(gameData);
            window.location.href = "../../common/gameOver.html?completed=" + rawData;
            this.vars.key = 1;
            this.vars.minite = 0;
            this.vars.seconds = 0;
            this.vars.answer = 0;
            this.vars.dialogueL = 0;
            this.vars.score = 0;
            this.vars.scale_y = 1;
            this.vars.beginTime = false;
          },
          this.vars, 1, 0, 1, 0
        )
      );
      clearTimeout(notTimeOut);
    },3000);
  };

  //失败的粒子效果
  failure() {
    this.xue = this.vars.game.add.emitter(this.vars.game.world.centerX, -32, 600);
    this.xue.scale.setTo(2);
    this.xue.makeParticles('xue', [0, 1, 2, 3, 4, 5]);
    this.xue.maxParticleScale = 0.6;
    this.xue.minParticleScale = 0.2;
    this.xue.setYSpeed(20, 100);
    this.xue.gravity = 0;
    this.xue.width = this.vars.game.world.width * 1.5;
    this.xue.minRotation = 0;
    this.xue.maxRotation = 40;

    this.xue2 = this.vars.game.add.emitter(this.vars.game.world.centerX, -32, 600);
    this.xue2.scale.setTo(3);
    this.xue2.makeParticles('xue', [0, 1, 2, 3, 4, 5]);
    this.xue2.maxParticleScale = 0.6;
    this.xue2.minParticleScale = 0.2;
    this.xue2.setYSpeed(20, 100);
    this.xue2.gravity = 0;
    this.xue2.width = this.vars.game.world.width * 1.5;
    this.xue2.minRotation = 0;
    this.xue2.maxRotation = 40;

    this.xue.start(false, 14000, 50);
    this.xue2.start(false, 14000, 50);
  };
};
export default stateOver;
