export default{
	load(game,flag){
		const animationPath = '../common/modules/animations/';
		const testPath = './test/';
		const name = 'Over';
		const path = (flag?testPath:animationPath) + name + '/';

		game.load.spritesheet('overBtn', path+'reBtn.png', 173.5, 70, 2);
		game.load.spritesheet('notBtn', path+'notPlay.png', 173.5, 70, 2);
		game.load.spritesheet('starts', path+'starts.png', 150, 150, 15);
		game.load.spritesheet('answer', path+'answer.png', 150, 61, 2);
		game.load.spritesheet('scoring', path+'scoring.png', 150, 61, 2);
		game.load.spritesheet('timing', path+'timing.png', 150, 61, 2);
		game.load.spritesheet('animal1', path+'animal1.png', 320, 205, 25);
		game.load.spritesheet('animal2', path+'animal2.png', 290, 165, 9);
		game.load.image('stateOverBg', path+'stateOverBg.png');
		game.load.image('stateOverS', path+'stateOverS.png');
		game.load.image('stateOverA', path+'stateOverA.png');
		game.load.image('stateOverB', path+'stateOverB.png');
		game.load.image('stateOverC', path+'stateOverC.png');
		game.load.image('stateOverD', path+'stateOverD.png');
		game.load.image('stateOverNo', path+'stateOverNo.png');
		game.load.image('stateOverYes', path+'stateOverYes.png');
		//成功
		game.load.spritesheet('overSuccess', path+'success.png', 280, 130, 26);
		game.load.spritesheet('cloth', path+'cloth.png', 630, 210, 15);
		game.load.image('grayStart', path+'grayStart.png');
		game.load.image('particle', path+'particle.png');
		game.load.image('gradient', path+'gradient.png');
		//失败
		game.load.spritesheet('xue', path+'snowflakes.png', 17, 17);
		game.load.image('cloth2', path+'cloth2.png');
		game.load.image('tiaozhan', path+'tiaozhan.png');
		game.load.image('shibai', path+'shibai.png');
	}
}
	