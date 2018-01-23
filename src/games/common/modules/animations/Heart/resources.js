export default{
	load(game, flag){
		const animationPath = '../common/modules/animations/';
		const testPath = './test/';
		const name = 'Heart';
		const path = (flag?testPath:animationPath) + name + '/';

		game.load.spritesheet('heart', path+'heart.png', 1334, 750, 53);
	}
}
	