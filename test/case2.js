//config测试-chances
const Cache = require('./test/Cache.js');

const cache = new Cache(0,0,[1,2,3],0,{chances:2});

cache.current = '1';
cache.current = '2';
cache.current = '4';
cache.current = 'enter';

setTimeout(()=>{
	cache.current = '1';
	cache.current = '2';
	cache.current = '3';
	cache.current = 'enter';
},6000);

