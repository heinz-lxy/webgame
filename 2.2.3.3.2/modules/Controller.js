/**
 * 控制游戏运行逻辑
 * config{ total:总分 step:每题扣分 sub:小题总分数组}
 */
import Over from './Over.js'
import Success from './animations/Success.js'
import Heart from './animations/Heart.js'

import t from 'tookit';

export default class Controller{
	constructor(vars,config){
		this.vars = vars;
		this.config = config;


	}
	/**
	 * 统计分数,进入下一关(成功，失败)
	 */
	next(err){
		const {vars, config} = this;
		const {step, text} = config;	

		// this.heart = new Heart(vars, () => {  
		// 	new Success(vars,config.text).init();
		// });

		//如果有小题
		if(config.sub !== undefined){

			let indexName = 'state' + t.toEnglish(vars.key) + 'Index';
			let total = config.sub[vars[indexName]]; //公共变量
			let score; 
			//stat init
			let stat;
			if(vars[indexName]==0){
			    stat = {sub:[]};
			}else{
			    stat = vars.stat[vars.key-1];
			}
			//stat process 添加小题数据
			let sub = stat.sub;
			score = err>-1?(total - err*step):0;
			sub.push({
			    total,
			    score
			})
			stat.sub = sub;
			//添加大题数据
			if((vars[indexName]+1)>=config.sub.length){ 
			    total = this.config.total;
			    score = 0;
			    stat.sub.forEach(item => {
			        score += item.score;
			    })
			    stat.total = total;
			    stat.score = score;

			    vars.stat[vars.key-1] = stat;
			    
			    if(score==total){
			    	vars.answer++;
			    }
			    if(err>-1){ //成功
			    	vars.score+=score;
			    	if(vars.key==vars.total){
			    		this.over();
			    		return;
			    	}
			    	setTimeout(()=>{
			    		this.heart.play();
			    	},2000)
			    	
			    	return;
			    }else{
			    	vars.key++;
			    	this.reload();
			    	return;
			    }
			}
			//stat update
			vars.stat[vars.key-1] = stat;
			console.log(vars)
			this.nextSub(indexName); 

		}else{ //无小题
		    let total = this.config.total;
		    let score = err>-1?(total-err*step):0;
		    let stat = {total, score};

		    vars.stat[vars.key-1] = stat;	
		    if(err>-1){ //成功
	    	    vars.score += score;
	    		vars.answer++;
	    		if(vars.key==vars.total){
	    			this.over();
	    			return;
	    		}
	    		setTimeout(() => {
	    			this.heart.play()
	    		},2000);
	    		
	    		return;
		    }else{
		    	vars.key++;
		    	this.reload();
		    	return;
		    }	    
			console.log(vars)
		}
	}
	/**
	 * 下一小题
	 * 可覆写实现翻页
	 */
	nextSub(indexName){
		let vars = this.vars;

		vars[indexName]++;
		this.reload();
	}
	/**
	 * 刷新
	 */
	reload(){
	    this.vars.game.state.start('Game',true,false,0);
	}
	/**
	 * 游戏结束
	 */
	over(){
		new stateOver(this.vars).init();
	}
}
