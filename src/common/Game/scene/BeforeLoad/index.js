
export default class BeforeLoad {
  constructor(cb) {
    this.cb = cb;
  }
  init() {
    const {game} = this;

    game.load.image('load_car', require('./img/load_car.png'));
    game.load.image('load_cloud1', require('./img/load_cloud1.png'));
    game.load.image('load_cloud2', require('./img/load_cloud2.png'));
    game.load.spritesheet('load_exhaust', require('./img/load_exhaust.png'), 209, 200, 4);
    game.load.image('load_progressbar', require('./img/load_progressbar.png'));
    game.load.image('load_progressbar1', require('./img/load_progressbar1.png'));
    
    this.cb && this.cb();
  }
  create() {}
  update() {}
  render() {}
}
