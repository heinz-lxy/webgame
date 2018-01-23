import xsjF from "../../../publicFunction";
import publicConfig from "../../config.json";
class main {
  constructor(config, gameName, callback) {
    this.config = config;
    this.game = this.config.game;
    this.callback = callback;
    this.gameName = gameName;
  }
  init() {}
  preload() {}
  create() {

    // //优化
    this.callback && this.callback();
  }

  update() {}
  render() {}
}

export default main;




