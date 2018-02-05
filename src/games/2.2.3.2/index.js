import Game from '../../common/Game'; //phaser封装

import resources from './resources.js';
import states from "./game/index.js"; 
import vars from './globalData.js'; 

const game = new Game(resources, states);
vars.game = game.game;



