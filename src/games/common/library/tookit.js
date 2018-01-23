
import perf from './perf.js'

export default{
	/* Calculation */
	random(a,b){
		return Math.floor(a + Math.random()*(b-a+1));
	},
	divide(a,b){
		return Math.floor(a/b);
	},
	thousand(value){
		return this.divide(value,1000);
	},
	hundred(value){
		return this.divide(value%1000,100);
	},
	ten(value){
		return this.divide(value%100,10);
	},
	one(value){
		return value%10;
	},

	toEnglish(value){
		switch(value){
			case 1:
				return 'One';
			case 2:
				return 'Two';
			case 3:
				return 'Three';
			case 4:
				return 'Four';
		}
	},

	/* Display */
	image(game, imageJson, container){
		if(!Array.isArray(imageJson)){
			let temp = game.add.image(imageJson.x,imageJson.y,imageJson.name);
			container && container.addChild(temp)
			return temp;
		}
		let arr = [];
		imageJson.forEach(image => {
			let temp = game.add.image(image.x,image.y,image.name);
			arr.push(temp);
			container && container.addChild(temp);
		});
		return arr;
	},
	sprite(game, spriteJson, container){
		if(!Array.isArray(spriteJson)){
			let temp = game.add.sprite(spriteJson.x,spriteJson.y,spriteJson.name);
			container && container.addChild(temp)
			return temp;
		}
		let arr = [];
		spriteJson.forEach(sprite => {
			let temp = game.add.sprite(sprite.x,sprite.y,sprite.name);
			arr.push(temp);
			container && container.addChild(temp);
		});
		return arr;
	},
	text(game, textJson, container){
		if(!Array.isArray(textJson)){
			textJson = [textJson];
		}
		textJson.forEach(text => {
			let temp = game.add.text(text.x,text.y,text.content,{fill:text.color?text.color:'#464643',font:text.size?text.size:'30px'});
		    container && container.addChild(temp)
		});
	},
	evenText(game, textJson, container){ // 居中文本
		let temp = game.add.text(textJson.x,textJson.y,textJson.content,{fill:textJson.color,font:textJson.size,boundsAlignH: "center",boundsAlignV: "middle"});
		temp.setTextBounds(0, 0, textJson.width, textJson.height);
		container && container.addChild(temp)
	},
	wrapper(game){
		// let group = game.make.group();
		return game.add.graphics(0,0); 
	},

	dynamic(create, cb){ //create dynamic element
		let elem = create();
		this.bindClick(elem,cb);
	},
	bindClick(elem, cb){
		elem.inputEnabled = true;
		elem.events.onInputDown.add(cb);
	},
	interval(game, time, cb){
		game.time.events.loop(Phaser.Timer.SECOND*time/1000,cb); 
	},



	/* Animation */
	zoom(elem, h, v){
		if(!v){ 
			v = h; 
		}
		elem.scale.setTo(h,v);
	},
	resize(elem, width, height){
		elem.width = width;
		elem.height = height;
	},
	moveTo(game, elem, pos, time){
		game.add.tween(elem).to( { x:pos.x, y: pos.y }, time, Phaser.Easing.Cubic.Out, true);
	},
	flicker(game, elem, time){
		game.add.tween(elem).to( { alpha: [1,0] }, time, "Linear", true, 0, -1);
		// game.add.tween(elem).to( { alpha: [0,1] }, time, Phaser.Easing.Cubic.Out, true, 0, 1000, false);
	},
	hide(elem){
		elem.visible = false;
	},
	show(elem){
		elem.visible = true;
	},
	drag(elem){
		elem.inputEnabled = true;
		elem.input.enableDrag(true);
	},

	test(mark, value){
		console.log('test'+mark+':')
		if(!value) {return;}
		console.log(value)
	},


	perf

}