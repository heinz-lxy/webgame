import Component from 'Component';
import Resource from 'Resource';
import controller from './controller.js'

var game = new Phaser.Game(1334, 750, Phaser.CANVAS, "container", {preload:preload, create:create});
function preload(){
	var olimage = game.load.image;
    game.load.image = function(...args) { //重写load.image方法
		args[1] = args[1].replace('..','../src/games')
		olimage.apply(this, args);
    }

    var olaudio = game.load.audio;
    game.load.audio = function(...args) {
      args[1] = args[1].replace('..','../src/games')
      olaudio.apply(this, args);
    }

    var olspritesheet = game.load.spritesheet; 
    game.load.spritesheet = function(...args) {
		args[1] = args[1].replace('..','../src/games')
		olspritesheet.apply(this, args);
    }

	Resource.load(game,false); 
}

function create(){
	controller(Component, game);
}

