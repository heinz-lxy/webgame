//加载字体文件
require("./fonts/b.otf");

import xsjF from "../publicFunction";
import scene from "./scene";
import publicConfig from "./config.json";

export default class commonGame {
  constructor(game, gameName, preload) {
    this.config = publicConfig;
    this.config.game = new Phaser.Game(this.config.width, this.config.height, Phaser.CANVAS, "container");
    this.config.startgame = game;
    this.config.preload = preload;
    this.gameName = gameName;
    this.init();
  }

  init() {
    let game = this.config.game;
    game.state.add("preConfig", new scene.preConfig(this.config, function() {
      game.state.start("load");
    }));
    game.state.add("load", new scene.load(this.config, function() {
      game.state.start("main");
    }));
    game.state.add("main", new scene.main(this.config, this.gameName, function() {
      game.state.start("game");
    }));
    game.state.add("game", new this.config.startgame(this.config));
    game.state.start("preConfig");
  }
}




