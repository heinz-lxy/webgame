//任务面板
export default class Task{
    constructor(vars, text, frames,cb){
        this.vars = vars;
        this.ks = true;
        this.text = text;
        this.frames = frames;
        this.create();
        this.cb = cb;
    }

    create(){
        if(! this.frames ) {
            this.taskBtn = this.vars.game.add.image(158, 0, 'taskBtn', 2);   
            return;    
        }
        this.taskBtn = this.vars.game.add.image(158, 0, 'taskBtn', 0);
     
        this.taskBtn.inputEnabled = true;
        this.taskBtn.events.onInputDown.add(()=>{
            if(this.ks = true){
                this.taskPanelDown();
                this.taskBtn.frame = 1;
                this.bg.visible = true;
                this.ks = false;
            }
        });
    }
    taskPanelDown(){
        this.taskBtn.frame = 1;
        this.bg = this.vars.game.add.graphics(0, 0);
        this.bg.beginFill(0x000000, 0.7);
        this.bg.drawRect(0, 0, 1334, 750);
        this.bg.inputEnabled = true;
        this.bg.events.onInputDown.add(()=>{
            this.taskBtn.frame = 0;
            this.bg.visible = false;
            this.ks = true;

            this.cb && this.cb();
        });
        var taskPanel = this.bg.addChild(
            this.vars.game.add.image(220, 140, 'taskPanel')
        );
        taskPanel.addChild(
            this.vars.game.add.text(100, 50, this.text, {
                "font": "35px myFont",
                "fill": "#393939",
                "boundsAlignH": "center",
                "boundsAlignV": "middle"
            })
        ).setTextBounds(0, 0, 600, 300);
        taskPanel.addChild(
            this.vars.game.add.text(320, 337, '点击屏幕任意处收起', {"font": "22px myFont", 'fill': "#393939"})
        ).alpha = 0.5;
    }
}





// var Pre = new Preamble((function(){                                          开场白里面回调函数
//     new countDown(vars,(function(){                                          倒计时调用
//       var taskPro = new task(vars, tes, true);                               任务面板调用
//        taskPro.taskPanelDown();
//     }).bind(this));
//   }).bind(this));
//   Pre.create();