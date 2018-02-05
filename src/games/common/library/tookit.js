
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
	    return this.add(game, data => {
	        return game.add.image(data.x,data.y,data.name);
	    },imageJson, container) 
	},
	sprite(game, spriteJson, container){
	    return this.add(game, data => {
	        return game.add.sprite(data.x, data.y, data.name);
	    },spriteJson, container) 
	},
	text(game, textJson, container){
	    return this.add(game, data => {
	        let temp;
	        if(data.width){
	            temp = game.add.text(data.x,data.y,data.content,{fill:data.color,font:data.font+''+data.size?data.size:'30px',boundsAlignH: "center",boundsAlignV: "middle"});
	            temp.setTextBounds(0, 0, data.width, data.height);
	        }else{
	            temp = game.add.text(data.x,data.y,data.content,{fill:data.color?data.color:'#464643',font:data.font+''+data.size?data.size:'30px'});
	        }
	        return temp;
	    },textJson, container) 
	},
	add(game, make, jsonData, container){
	    if(!Array.isArray(jsonData)){
	        let temp = make(jsonData);
	        container && container.addChild(temp)
	        return temp;
	    }
	    let arr = [];
	    jsonData.forEach(data => {
	        let temp = make(data);
	        arr.push(temp);
	        container && container.addChild(temp);
	    });
	    return arr;
	},
	button(game, button, container){
		let temp = game.add.button(button.x,button.y,button.name,button.cb,undefined,1,0,1,0);
		container && container.addChild(temp);
		return temp;
	},
	evenText(game, textJson, container){ // 居中文本
		let temp = game.add.text(textJson.x,textJson.y,textJson.content,{fill:textJson.color,font:textJson.size,boundsAlignH: "center",boundsAlignV: "middle"});
		temp.setTextBounds(0, 0, textJson.width, textJson.height);
		container && container.addChild(temp)
	},
	wrapper(game){
		return game.add.graphics(0,0); 
	},

	dynamic(create, cb, container){ //create dynamic element
		let elem = create();
		container && container.addChild(elem);
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
	animation(create, cb){
	    cb(create());
	},
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
	moveTo(game, elem, pos, time, cb){
		let temp = game.add.tween(elem).to( pos, time, Phaser.Easing.Cubic.Out, true);
		cb && temp.onComplete.addOnce(cb);
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