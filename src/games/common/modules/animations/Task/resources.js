export default{
	load(game,flag){
		const animationPath = '../common/modules/animations/';
		const testPath = './test/';
		const name = 'Task';
		const path = (flag?testPath:animationPath) + name + '/';

		game.load.image('taskPanel', path+'taskPanel.png');
		game.load.spritesheet('taskBtn', path+'taskBtn.png', 170, 70, 3);
	}
}
	