export default{
	load(game){
		const path = '../common/modules/animations/CountDown/';

		game.load.image('ready', path+'ready.png');
		game.load.image('readyGo', path+'readyGo.png');
		game.load.image('readyOne', path+'readyOne.png');
		game.load.image('readyTwo', path+'readyTwo.png');
		game.load.image('readyThree', path+'readyThree.png');
		game.load.image('readyBright', path+'readyBright.png');
		game.load.audio('countDown', path+'countDown.mp3');
	}
}
	