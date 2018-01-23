/**
 * 创建过关界面
 * @params {vars  text:文本框显示文本}
 * (按钮点击事件需要通过覆盖onClick方法)
 */
import Controller from '../Controller.js';
import f from 'tookit'
export default class Success{
	constructor(vars, text){
		this.vars = vars;
		this.game = vars.game;
		if(!text){
			text = '加油哦';
		}
		this.text = text;
	}
	/**
	 * 初始化
	 */
	init(){
		const {vars, game, text} = this;

		if(vars.debug){
			this.onClick();
			return;
		}

		let mask = game.add.image(0,0,'mask');
		game.add.audio('gxgc').play();
		let box = this.box = mask.addChild(game.add.image(667-812,-750,'next_box'));
		box.addChild(game.add.image(622,193,'next_text'));
		
		let button = box.addChild(game.add.image(644,393,'next_button'));
		button.inputEnabled = true;
		button.events.onInputDown.add(() => {
			this.onClick();
		});

		let textbox = box.addChild(game.add.image(453,300,'next_textbox'));
		let textElem = textbox.addChild(game.add.text(0, 0, '·'+text+'·', { fill: "#ffffff",font: "30px",boundsAlignH: "center", boundsAlignV: "middle"}));
		textElem.setTextBounds(0, 0, 589, 65); //文本居中
		
		let hand = this.hand = box.addChild(game.add.image(823,414,'hand'));

		game.time.events.loop(Phaser.Timer.SECOND * 0.4,() => {
		    hand.frame = (hand.frame+1)%2;
		});

		this.down();
	}
	/**
	 * 放下
	 */
	down(){
		const {game, box} = this;
		game.add.tween(box).to({y: 375-313}, 1000, "Linear", true);
	}
	/**
	 * 收起
	 */
	up(){
		const {game, box} = this;
		game.add.tween(box).to({y: -750}, 1000, "Linear", true);
	}
	/**
	 * 继续挑战按钮事件处理 需通过继承复写
	 */
	onClick(){	
		try{
			this.hand.destroy();
		}catch(e){}
		this.vars.key++;
		new Controller(this.vars).reload();	
	}
}