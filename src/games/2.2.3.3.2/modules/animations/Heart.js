// export default class Heart {
//     constructor(vars, cb) {
//         this.vars = vars;
//         this.cb = cb;
     
//         this.init();
//     }

//     init() {
//         const {vars} = this;
//         const {game} = vars;

//         let mask = game.add.graphics(0, 0);
//         mask.beginFill(0x000000, 0);
//         mask.drawRect(0, 0, vars.WIDTH, vars.HEIGHT);
//         mask.endFill();
        
//         this.heart = game.add.sprite(0, 0, "heart");
//         this.animation = this.heart.animations.add('run');
//     }
//     play() {
//         this.animation.play('run',53,false,true)
//     }
// }   
// 
/**
 * @class Heart
 * 
 * @param {Object} vars public.js中的公共对象
 * @param {Object} container 爱心的附属元素 e.g. this.bg
 * @param {Function} cb 爱心动画完成后执行的回调函数
 * 
 * @example
 * 1、场景中实例化
 * const heart = new Heart(vars, this.bg, () => {  });
 * 2、播放动画
 * heart.play();
 */
export default class Heart {
    constructor(vars, container,cb) {
        this.vars = vars;
        this.cb = cb;
        this.container = container;
        this._create();
    }

    _create() {
        const { vars } = this;
        this.o = this.container.addChild(vars.game.add.graphics(0, 0));
        this.o.beginFill(0x000000, 0);
        this.o.drawRect(0, 0, vars.WIDTH, vars.HEIGHT);
        this.o.endFill();
        this.o.inputEnabled = false;
        this.heart = this.o.addChild(vars.game.add.sprite(0, 0, "heart"));
        this.animation = this.heart.animations.add("run");
        this.animation.onComplete.add(this.cb);
    }

    play() {
        this.o.inputEnabled = true;
        this.animation.play("run", 53, false, true);
    }
}