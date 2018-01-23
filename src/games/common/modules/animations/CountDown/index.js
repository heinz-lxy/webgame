export default class CountDown{
    constructor(vars,cb){
        this.vars = vars;
        this.cb = cb;
        this.create();
    }
    create() {
        this.bg = this.vars.game.add.graphics(0, 0);
        this.bg.beginFill(0x000000, 0.7);
        this.bg.drawRect(0, 0, 1334, 750);
        this.bg.inputEnabled = true;
        var readyGroup = this.bg.addChild(
            this.vars.game.add.group()
        );
        readyGroup.create(324, 234, 'ready');
        readyGroup.create(543, 234, 'readyThree');
        readyGroup.create(543, 234, 'readyTwo');
        readyGroup.create(593, 234, 'readyOne');
        readyGroup.create(493, 234, 'readyGo');
        readyGroup.create(664, 361, 'readyBright');
        //设置光圈旋转中心点,添加计时实时旋转
        readyGroup.children[5].anchor.set(0.5, 0.5);
        var brightTime = setInterval(()=>{
            readyGroup.children[5].angle += 0.5;
        }, 1);
        this.vars.game.add.audio('countDown').play();
        readyGroup.children[0].scale.setTo(1.1, 1.1);
        this.readyTweens(readyGroup.children[0]);
        for(var i = 1; i < readyGroup.length; i++){
            readyGroup.children[i].visible = false;
            readyGroup.children[i].scale.setTo(1.05, 1.05);
        }
        var readyThreeTime =  setTimeout(() => {
            readyGroup.children[0].visible = false;
            readyGroup.children[1].visible = true;
            readyGroup.children[5].visible = true;
            this.readyTweens(readyGroup.children[1]);
            clearTimeout(readyThreeTime);
        }, 1000);
        var readyTwoTime =  setTimeout(() => {
            readyGroup.children[1].visible = false;
            readyGroup.children[2].visible = true;
            this.readyTweens(readyGroup.children[2]);
            clearTimeout(readyTwoTime);
        }, 2000);
        var readyOneTime =  setTimeout(() => {
            readyGroup.children[2].visible = false;
            readyGroup.children[3].visible = true;
            this.readyTweens(readyGroup.children[3]);
            clearTimeout(readyOneTime);
        }, 3000);
        var readyGoTime =  setTimeout(() => {
            readyGroup.children[3].visible = false;
            readyGroup.children[5].visible = false;
            readyGroup.children[4].visible = true;
            this.readyTweens(readyGroup.children[4]);
            clearTimeout(readyGoTime);
        }, 4000);
        var cleraBg =  setTimeout(() => {
            this.bg.destroy();
            clearInterval(brightTime);
            clearTimeout(cleraBg);
            this.cb && this.cb();
        }, 5000);
    }
    //每一秒执行的动画
    readyTweens(name){
        this.vars.game.add.tween(name.scale).to({x: [1.05, 1], y: [1.05, 1]}, 500, Phaser.Easing.Linear.None, true);
        var tweensTimeOut = setTimeout(()=>{
            this.vars.game.add.tween(name).to({alpha: [1, 0]}, 500, Phaser.Easing.Linear.None, true);
        },500);
    }
}
