const Cache = require('./test/Cache.js');

const cache = new Cache(0,0,[12,2,3],0);


// 点击按键
cache.current = '1';

//写入缓存区
console.log(cache.answers) //['1','','']

//如果输入未完成则无动作
//如果输入完成移动到下一输入框
//order-2

//更新输入框显示
//order-11





//继续输入
cache.current = '2';

//写入缓冲区
console.log(cache.answers) //['1','2','']

//如果输入完成移动到下一输入框
//order-2

//更新输入框显示
//order-11





//点击清除
// cache.current = 'backspace';

//如果当前无输入框选中，则无动作
//如果当前输入框选中，则将当前置为空
// console.log(cache.answers) //['1', '', '']

//更新输入框显示
//order-11





//点击确定
cache.current = 'enter';

//如果当前输入未完成，则无动作
//如果输入完成，统计错误
console.log('err:')
console.log(cache.err)

//输入框正误标记
//order-10



