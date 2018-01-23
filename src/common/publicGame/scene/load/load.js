
class load {
  constructor(config, callback) {
    this.config = config;
    this.game = this.config.game;
    this.callback = callback;
  }
  init() {}
  preload() {
    var vars = this;
    console.log("load");
    vars.game.load.image('load_car', require('./img/load_car.png'));
    vars.game.load.image('load_cloud1', require('./img/load_cloud1.png'));
    vars.game.load.image('load_cloud2', require('./img/load_cloud2.png'));
    vars.game.load.spritesheet('load_exhaust', require('./img/load_exhaust.png'), 209, 200, 4);
    vars.game.load.image('load_progressbar', require('./img/load_progressbar.png'));
    vars.game.load.image('load_progressbar1', require('./img/load_progressbar1.png'));
  }
  create() {
    this.callback && this.callback();
  }

}

export default load;