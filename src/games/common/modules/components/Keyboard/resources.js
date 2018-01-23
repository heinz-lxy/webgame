export default{
	load(game){
		const path = '../common/modules/components/Keyboard/';

		game.load.spritesheet('confirm', path+'confirm.png', 183.66, 85, 3);
		game.load.spritesheet('undo', path+'undo.png', 183.66, 85);
		game.load.spritesheet('onMiss', path+'onMiss.png', 128.5, 86);
		game.load.image('keyBg', path+'keyBg.png');
		game.load.spritesheet('keyTurn', path+'keyTurn.png', 70, 158);
		game.load.spritesheet('zero', path+'0.png', 105, 81, 2);
		game.load.spritesheet('1', path+'1.png', 105, 81, 2);
		game.load.spritesheet('2', path+'2.png', 105, 81, 2);
		game.load.spritesheet('3', path+'3.png', 105, 81, 2);
		game.load.spritesheet('4', path+'4.png', 105, 81, 2);
		game.load.spritesheet('5', path+'5.png', 105, 81, 2);
		game.load.spritesheet('6', path+'6.png', 105, 81, 2);
		game.load.spritesheet('7', path+'7.png', 105, 81, 2);
		game.load.spritesheet('8', path+'8.png', 105, 81, 2);
		game.load.spritesheet('9', path+'9.png', 105, 81, 2);
		game.load.spritesheet('sign', path+'sign.png', 105, 81, 2);
		game.load.spritesheet('ride', path+'ride.png', 105, 81, 2);
		game.load.spritesheet('except', path+'except.png', 105, 81, 2);
		game.load.spritesheet('add', path+'add.png', 105, 81, 2);
		game.load.spritesheet('sub', path+'sub.png', 105, 81, 2);
	}
}
	