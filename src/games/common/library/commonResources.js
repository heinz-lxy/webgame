import inputbox from '../modules/components/InputBox/resources.js';
import keyboard from '../modules/components/Keyboard/resources.js';

import countdown from '../modules/animations/CountDown/resources.js';
import guide from '../modules/animations/Guide/resources.js';
import heart from '../modules/animations/Heart/resources.js';
import over from '../modules/animations/Over/resources.js';
import success from '../modules/animations/Success/resources.js';
import task from '../modules/animations/Task/resources.js';

export default{
	load(vars){
		const path = '../common/resources/';
	
		vars.game.load.image('background', path+'bg_city.jpg');
		vars.game.load.image('bg', path+'bg_scene_city.png');
		vars.game.load.image('tips', path+'prompt.png', 200, 200);
		vars.game.load.image('backbox', path+'dialogBox.png');
		vars.game.load.image('older', path+'olderMan.png');
		vars.game.load.image('Button_01', path+'Button_01.png');
		vars.game.load.image('arc', path+'arc.png');
		vars.game.load.spritesheet('return', path+'return.png', 244, 107, 2);
		vars.game.load.image('managerBg', path+'gameManagerBg.png');
		vars.game.load.spritesheet('pause', path+'pause.png', 105, 80, 2);
		vars.game.load.spritesheet('exit', path+'exit.png', 105, 80, 2);
		vars.game.load.image('timeBox', path+'timeBox.png');
		vars.game.load.spritesheet('pauseack', path+'back.png', 90, 90);
		vars.game.load.spritesheet('noBack', path+'noBack.png', 90, 90);
		vars.game.load.spritesheet('gradeBox', path+'gradeBox.png');
		vars.game.load.spritesheet('gradeBox1', path+'gradeBox1.png');
		vars.game.load.spritesheet('gradeBox2', path+'gradeBox2.png');
		vars.game.load.audio('click', path+'click.mp3');
		vars.game.load.audio('true', path+'true.wav');
		vars.game.load.audio('false', path+'false.mp3');
		vars.game.load.audio('failure', path+'failure.mp3');
		vars.game.load.audio('BGM',path+'BGM.mp3');
		vars.game.load.audio('sucess', path+'sucess.mp3');
		vars.game.load.audio('flip2', path+'flip.wav');

		inputbox.load(vars.game);
		keyboard.load(vars.game);
		countdown.load(vars.game);
		guide.load(vars.game);
		heart.load(vars.game);
		over.load(vars.game);
		success.load(vars.game);
		task.load(vars.game);
	}
}
	