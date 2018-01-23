export default class Heart {
    constructor(vars, cb) {
        this.vars = vars;
        this.cb = cb;
     
        this.init();
    }

    init() {
        const {vars} = this;
        const {game} = vars;

        let mask = game.add.graphics(0, 0);
        mask.beginFill(0x000000, 0);
        mask.drawRect(0, 0, vars.WIDTH, vars.HEIGHT);
        mask.endFill();
        
        this.heart = game.add.sprite(0, 0, "heart");
    }
    play() {
        const {heart, cb} = this;
        
        let i = 0;
        function step() {
          heart.frame = i;
          i++;
          if (i < 50) {
            window.requestAnimationFrame(step);
          }else{
            heart.destroy();
            cb();
          }
        }
        window.requestAnimationFrame(step);
    }
}   