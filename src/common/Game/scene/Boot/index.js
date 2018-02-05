export default class Boot { 
  constructor(config, cb) {
    this.config = config;
    this.cb = cb;
  }
  init() {
    const {game} = this;
    
    game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.setGame();
    game.scale.onOrientationChange.add(this.setGame,this);
    Phaser.World.prototype.displayObjectUpdateTransform = function(){
      if (!game.scale.isLandscape) {
        this.rotation = Phaser.Math.degToRad(Phaser.Math.wrapAngle(90));
        this.x = game.width;
      } else {
        this.rotation = 0;
        this.x = 0;
      }
      PIXI.DisplayObject.prototype.updateTransform.call(this);
    };
   
    this.cb && this.cb();
  }
  create() {}
  update() {}
  render() {}
  setGame() {
    const {game} = this;

    if (game.scale.isLandscape) {
      game.scale.setGameSize(this.config.width, this.config.height);
    } else {
      game.scale.setGameSize(this.config.height, this.config.width);
    }
  }
}


