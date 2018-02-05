//基础测试
const Cache = require('./test/Cache.js');

const cache = new Cache(0,0,[1,2,3],0);


// 点击按键
cache.current = '1';

//写入缓存区
console.log(cache.answers) //['1','','']

//如果输入未完成则无动作
//如果输入完成移动到下一输入框

//question:6
console.log(cache.index) //1

//更新输入框显示
//question:5





//继续输入
cache.current = '2';

//写入缓冲区
console.log(cache.answers) //['1','2','']

//如果输入完成移动到下一输入框
console.log(cache.index) //2
//question:6

//更新输入框显示
//question:5





//点击清除
cache.index = 0;
cache.current = 'backspace';

//如果当前无输入框选中，则无动作
//如果当前输入框选中，则将当前置为空
console.log(cache.answers) //['', '2', '']
//question:6

//更新输入框显示
//question:5





//点击确定
cache.index = 0;
cache.current = '1';
cache.index = 2;
cache.current = '4';
cache.current = 'enter';

//如果当前输入未完成，则无动作
//如果输入完成，统计错误
console.log('err:')
console.log(cache.err)

//游戏音效

//输入框正误标记
//question:4

//5s后
//如果错误，则清空重新答题
//question:5

//输入框移动到初始
//question:6

//错误计数归为0
setTimeout(()=>{
	console.log('err:')
	console.log(cache.err)
},6000)


//将键盘恢复到不可点击状态
//keyboard:0




