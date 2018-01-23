import xsjF from "../../../publicFunction";


class preConfig {
  constructor(config, callback) {
    this.config = config;
    this.game = this.config.game;
    this.callback = callback;
    this.preload = this.config.preload;
  }
  init() {
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.setGame();
    this.game.scale.onOrientationChange.add(this.setGame, this);
    var _that = this;
    Phaser.World.prototype.displayObjectUpdateTransform = function() {
      if (!_that.game.scale.correct) {
        this.x = _that.game.camera.y + _that.game.width;
        this.y = -_that.game.camera.x;
        this.rotation = Phaser.Math.degToRad(Phaser.Math.wrapAngle(90));
      } else {
        this.x = -_that.game.camera.x;
        this.y = -_that.game.camera.y;
        this.rotation = 0;
      }

      PIXI.DisplayObject.prototype.updateTransform.call(this);
    };
    this.callback && this.callback();
  }
  create() {}
  update() {}
  render() {}
  setGame() {
    if (this.game.scale.isLandscape) {
      this.game.scale.correct = true;
      this.game.scale.setGameSize(this.config.height, this.config.width);
    } else {
      this.game.scale.correct = false;
      console.log(this.config.game.height, this.config.game.width);
      this.game.scale.setGameSize(this.config.width, this.config.height);
    }
  }
}

export default preConfig;




