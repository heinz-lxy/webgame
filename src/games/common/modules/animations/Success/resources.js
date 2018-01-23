export default{
	load(game, flag){
		const animationPath = '../common/modules/animations/';
		const testPath = './test/';
		const name = 'Success';
		const path = (flag?testPath:animationPath) + name + '/';

		game.load.image('mask', path+'mask.png');
		game.load.image('next_box', path+'next_box.png');
		game.load.image('next_button', path+'next_button.png');
		game.load.image('next_text', path+'next_text.png');
		game.load.image('next_textbox', path+'next_textbox.png');
		game.load.spritesheet('hand', path+'hand.png',96,95);
		game.load.spritesheet('hand', path+'hand.png',96,95);
		game.load.audio('gxgc', path+'gxgc.mp3');
	}
}
	