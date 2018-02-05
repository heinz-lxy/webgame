//config测试-realtime
const Cache = require('./test/Cache.js');

const cache = new Cache(0,0,[1,2,3],0,{chances:2, realtime:true});

//单步-正确
function test1(){
	cache.current = '1';
	//判断正误
	console.log('err:'+cache.err) //0

	//更新输入框
	//question:5

	//画框
	//question:4

	//如果正确下一题
	console.log('index:'+cache.index)//1
	//question:6
}

//单步-错误
function test2(){
	cache.current = '2';
	//判断正误
	console.log('err:'+cache.err) //1

	//播放音效
	//game:0

	//更新输入框
	//question:5

	//画框
	//question:4

	//5s后清空
	setTimeout(() => {
		console.log(cache.answers)
	},6000)
}

//多步正确
function test3(){
	cache.current = '1';
	cache.current = '2';
	cache.current = '3';
	cache.current = 'enter';
	//controller:1
}

//多步重玩正确
function test4(){
	cache.current = '2';
	console.log(cache.answers)
	setTimeout(() => {
		cache.current = '1';
		
		cache.current = '2';
		cache.current = '3';
		cache.current = 'enter';
		//controller:1

	},6000)
	
}
//多步重玩失败
function test5(){
	cache.current = '2';
	setTimeout(() => {
		cache.current = '3';
		cache.current = '2';
		cache.current = '3';
		cache.current = 'enter';
		//controller:1
	},6000)
}

test5()




