import scene from './scene';

const {Boot, BeforeLoad, Load} = scene;
const config = {width:1334, height:750};

export default class Game {
  constructor(resources, states) {
    this.game = new Phaser.Game(config.width, config.height, Phaser.CANVAS, 'container');
    this.resources = resources;
    this.states = states;
    this.init();
  }

  init() {
    const {game, resources, states} = this;

    game.state.add('boot', new Boot(config, () => {
      game.state.start('beforeload');
    }));
    game.state.add('beforeload', new BeforeLoad(() => {
      game.state.start('load');
    }));
    game.state.add('load', new Load(resources, states));
    game.state.start('boot');
  }
}




